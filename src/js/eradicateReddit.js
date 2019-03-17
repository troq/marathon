// Load any browser specific code. This is selected by webpack
import * as browser from './webextension';

import removeRedditFeed from './lib/remove-reddit-feed';
import injectUI, { isAlreadyInjected } from './lib/inject-ui';
// import isEnabled from './lib/is-enabled';
import getFeedContainer from './lib/get-feed-container';

removeRedditFeed();
document.getElementById('2x-container').style.opacity = 1;
var uiContainer = document.createElement('div');
injectUI(uiContainer);
getFeedContainer().parentNode.prepend(uiContainer);

// This delay ensures that the elements have been created by Facebook's
// scripts before we attempt to replace them
var eradicateRetry = setInterval(function() {
	removeRedditFeed();
}, 50);
