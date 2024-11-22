import '@material/mwc-snackbar';
import {type Snackbar} from '@material/mwc-snackbar';
import {LitElement, css, html} from 'lit';

class ToastIt extends LitElement {
	#timeout: number;

	constructor(
		readonly message: any,
		readonly timeoutMs = 3000,
		readonly leading = false,
	) {
		super();
	}

	get dialog() {
		return this.renderRoot.querySelector('dialog')!;
	}
	get snackbar() {
		return this.renderRoot.querySelector('mwc-snackbar-toastit') as Snackbar;
	}

	render() {
		return html`<!---->
			<!-- <dialog> -->
			<mwc-snackbar-toastit
				popover
				timeoutMs="-1"
				?leading=${this.leading}
				@toggle=${(event: any) => {
					if (event.newState === 'closed') {
						clearTimeout(this.#timeout);
						this.remove();
					}
				}}
			></mwc-snackbar-toastit>
			<!-- </dialog> --> `;
	}
	static styles = css`
		[popover] {
			background-color: transparent;
			border: none;
			margin: 0;
		}
	`;

	protected firstUpdated() {
		// this.setAttribute('popover', '');
		// @ts-ignore
		// this.togglePopover();
		if (typeof this.message === 'string') {
			this.snackbar.labelText = this.message;
		} else {
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

let previousToaster: ToastIt = null;

export default function (message: any, timeoutMs = 3000) {
	return new Promise(async (_resolve: (value: void) => void, _reject) => {
		if (previousToaster) {
			previousToaster.close();
		}

		const toaster = new ToastIt(message, timeoutMs);
		previousToaster = toaster;

		document.body.prepend(toaster);
	});
}
