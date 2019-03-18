Marathon is a Chrome extension for long-term productivity. Install the [latest version](https://chrome.google.com/webstore/detail/marathon/nkhecjgkfpkkcejhbmfjghcokmhbmoed?hl=en-US) from the Chrome webstore.

## Developing the extension
1. Check if your Node.js version is >= 6.
2. Clone the repository.
3. Install [yarn](https://yarnpkg.com/lang/en/docs/install/).
4. Run `yarn`.
5. Run `npm run start`
6. Load the extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
8. Have fun.

## Building
When the extension is ready for production run the command

```
$ NODE_ENV=production npm run build
```
Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store.

## Secrets
Webpack imports the file `./secrets.<THE-NODE_ENV>.js` on the modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: "123" };
```

_./src/intercept.js_

```js
import secrets from "secrets";
ApiCall({ key: secrets.key });
```
:point_right: The files with name `secrets.*.js` already are ignored in the repository.
