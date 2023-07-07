import '@material/mwc-snackbar';
import { LitElement, css, html } from 'lit';
class ToastIt extends LitElement {
    message;
    timeoutMs;
    #timeout;
    constructor(message, timeoutMs = 3000) {
        super();
        this.message = message;
        this.timeoutMs = timeoutMs;
    }
    get dialog() {
        return this.renderRoot.querySelector('dialog');
    }
    get snackbar() {
        return this.renderRoot.querySelector('mwc-snackbar');
    }
    render() {
        return html `<!---->
			<!-- <dialog> -->
			<mwc-snackbar
				popover
				timeoutMs="-1"
				@toggle=${(e) => {
            if (e.newState === 'closed') {
                clearTimeout(this.#timeout);
                this.remove();
            }
        }}
			></mwc-snackbar>
			<!-- </dialog> --> `;
    }
    static styles = css `
		[popover] {
			background-color: transparent;
			border: none;
			margin: 0;
		}
	`;
    firstUpdated() {
        // this.setAttribute('popover', '');
        // @ts-ignore
        // this.togglePopover();
        if (typeof this.message === 'string') {
            this.snackbar.labelText = this.message;
        }
        else {
            this.snackbar.labelText = JSON.stringify(this.message);
        }
        // this.dialog.showModal();
        // this.snackbar.show();
        // @ts-ignore
        this.snackbar.togglePopover();
        this.snackbar.show();
        this.#timeout = setTimeout(() => {
            this.snackbar.close();
        }, this.timeoutMs);
    }
    close() {
        this.snackbar.close();
    }
}
window.customElements.define('toast-it', ToastIt);
let previousToaster = null;
export default function (message, timeoutMs = 3000) {
    return new Promise(async (resolve, reject) => {
        if (previousToaster) {
            previousToaster.close();
        }
        const toaster = new ToastIt(message, timeoutMs);
        previousToaster = toaster;
        document.body.prepend(toaster);
    });
}
