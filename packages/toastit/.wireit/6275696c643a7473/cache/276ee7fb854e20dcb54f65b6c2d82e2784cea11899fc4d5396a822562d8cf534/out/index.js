import { Snackbar } from '@material/mwc-snackbar';
export function toast(message) {
    return new Promise(async (resolve) => {
        const snackbar = new Snackbar();
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
