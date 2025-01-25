import {type Snackbar} from '@material/mwc-snackbar';
import {SnackbarBase} from '@material/mwc-snackbar/mwc-snackbar-base.js';
import {styles} from '@material/mwc-snackbar/mwc-snackbar.css.js';
import {strings} from '@material/snackbar/constants.js';

interface Options {
	timeoutMs: number;
	leading: boolean;
	styles?: string;
	debug: boolean;
}

let previousToast:
	| {
			snackbar: Snackbar;
			resolvers: PromiseWithResolvers<void>;
	  }
	| undefined = undefined;

function toast(message: any, options?: Partial<Options>) {
	if (previousToast) {
		previousToast.snackbar.close();
	}

	const resolvers = Promise.withResolvers<void>();
	const {promise: closePromise, resolve, reject} = resolvers;

	// defaults option values
	options = Object.assign(
		{},
		{timeoutMs: 3000, leading: false, debug: false} as Options,
		options,
	);

	const id = Math.floor(Math.random() * 99999999);
	const name = `mwc-snackbar-${id}`;
	window.customElements.define(
		name,
		class extends SnackbarBase {
			static styles = styles;
		},
	);
	const snackbar = document.createElement(name) as Snackbar;
	function killSnackbar() {
		snackbar.remove();
	}
	document.body.appendChild(snackbar);
	snackbar.labelText = message;
	snackbar.show();
	snackbar.addEventListener(strings.CLOSED_EVENT, () => {
		reject();
		clearTimeout(closetimeout);
		killSnackbar();
	});

	const closetimeout = setTimeout(
		() => {
			resolve();
			snackbar.close();
		},
		options.timeoutMs === -1 ? 2147483647 : options.timeoutMs,
	);

	previousToast = {snackbar, resolvers};

	return {closePromise, snackbar};
}

export {toast};
export default toast;
