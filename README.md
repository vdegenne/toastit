# toastit

Utility function to toast a message at the bottom of the page with timing feature.

![image](https://github.com/user-attachments/assets/a23fbbe7-2e3e-4d11-aa95-f4889d473eff)

Note: It's using `@material/mwc-snackbar` in the background.

## Installation

    npm i -D toastit

## Usage

```js
import {toast} from 'toastit';

toast('Hi');

toast('How is it going?', {leading: true, timeoutMs: 1000 * 5}); // 5s before it auto closes
```
