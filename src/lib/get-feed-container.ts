let feedContainer;
function parents(node) {
  var nodes = [node]
  for (; node; node = node.parentNode) {
    nodes.unshift(node)
  }
  return nodes
}

function commonAncestor(node1, node2) {
  var parents1 = parents(node1)
  var parents2 = parents(node2)

  if (parents1[0] != parents2[0]) throw "No common ancestor!"

  for (var i = 0; i < parents1.length; i++) {
    if (parents1[i] != parents2[i]) return parents1[i - 1]
  }
}

export default function getFeedContainer() {
  var items = document.querySelectorAll('.scrollerItem');
  if (!items) return;
  var currentFeedContainer = commonAncestor(items[0], items[1]);
  feedContainer = currentFeedContainer || feedContainer;
  return feedContainer;
}

