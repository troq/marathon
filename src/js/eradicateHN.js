import injectUI from './lib/inject-ui';

const container = document.querySelector('#hnmain .itemlist');
container.innerHTML = '';
injectUI(container);
