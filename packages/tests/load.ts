import {materialDialog} from 'material-3-prompt-dialog';
import toast from 'toastit';

materialDialog({
	content: () => 'Hello Material Team',
});

await new Promise((r) => setTimeout(r, 1000));
toast('top snackbar!!', 100000);
