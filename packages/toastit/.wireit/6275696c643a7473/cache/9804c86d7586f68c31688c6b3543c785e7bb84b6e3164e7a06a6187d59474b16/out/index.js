import { Snackbar } from '@material/mwc-snackbar';
let previousSnackbar = null;
export default function (message) {
    return new Promise(async (resolve) => {
        if (previousSnackbar) {
            previousSnackbar.close();
        }
        const snackbar = new Snackbar();
        previousSnackbar = snackbar;
        document.body.appendChild(snackbar);
        await snackbar.updateComplete;
        snackbar.labelText = JSON.stringify(message);
        const closedCallback = () => {
            document.body.removeChild(snackbar);
            snackbar.removeEventListener('closed', closedCallback);
            resolve(null);
        };
        snackbar.addEventListener('closed', closedCallback);
        snackbar.show();
    });
}
