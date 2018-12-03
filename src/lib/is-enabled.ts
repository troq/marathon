const paths = ['', '/'];

export default function isEnabled() {
  return paths.indexOf(window.location.pathname) > -1 ||
         window.location.hostname === 'www.reddit.com';
}
