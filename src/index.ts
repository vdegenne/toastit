import '@material/mwc-snackbar';
import {type Snackbar} from '@material/mwc-snackbar';
import {LitElement, css, html} from 'lit';

interface Options {
	timeoutMs: number;
	leading: boolean;
	styles?: string;
	debug: boolean;
}

class ToastIt extends LitElement {
	#timeout: number;

	constructor(
		readonly message: any,
		readonly options?: Options,
	) {
		super();
		this.options = Object.assign(
			{},
			{timeoutMs: 3000, leading: false, debug: false} as Options,
			this.options,
		);
	}

	get dialog() {
		return this.renderRoot.querySelector('dialog')!;
	}
	get snackbar() {
		return this.renderRoot.querySelector('mwc-snackbar-toastit') as Snackbar;
	}

	render() {
		if (this.options.debug) {
			console.log(this.options);
		}
		return html`<!---->
			<!-- <dialog> -->
			<mwc-snackbar-toastit
				popover
				timeoutMs="-1"
				style=${this.options.styles ?? ''}
				?leading=${this.options.leading}
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
		}, this.options.timeoutMs);
	}

	close() {
		this.snackbar.close();
	}
}
window.customElements.define('toast-it', ToastIt);

let previousToaster: ToastIt = null;

export default function (message: any, options?: Partial<Options>) {
	return new Promise(async (_resolve: (value: void) => void, _reject) => {
		if (previousToaster) {
			previousToaster.close();
		}

		const toaster = new ToastIt(message, options as Options);
		previousToaster = toaster;

		document.body.prepend(toaster);
	});
}
