import './popup.css';

document.getElementById('settings').addEventListener('click', e => {
  e.preventDefault();
  debugger;
  chrome.tabs.create({ url: chrome.runtime.getURL("settings.html") });
});
