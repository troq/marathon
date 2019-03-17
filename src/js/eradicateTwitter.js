import injectUI, { isAlreadyInjected } from './lib/inject-ui';

var eradicateRetry = setInterval(function() {
  if (isAlreadyInjected()) return;
  try {
    const container = document.querySelector('main');
    container.innerHTML = '';
    injectUI(container);
  } catch {
  }
}, 50);
