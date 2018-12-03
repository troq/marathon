import getFeedContainer from './get-feed-container';

const removeNode = node => node.parentNode.removeChild(node);

const removeChildren = node => {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};

export default function() {
  const feedContainer = getFeedContainer();
  if (feedContainer && feedContainer.style) {
    feedContainer.style.opacity = 0;
    removeChildren(feedContainer);
  }
}
