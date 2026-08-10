(() => {
  const svg = {
    northeast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" focusable="false"><path d="M6 18 18 6M9 6h9v9"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" focusable="false"><path d="M12 19V5M7 10l5-5 5 5"/></svg>'
  };

  const icon = (direction) => {
    const span = document.createElement('span');
    span.className = `ui-arrow ui-arrow--${direction}`;
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = svg[direction];
    return span;
  };

  const replaceGlyphs = (root = document.body) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      if (/[↗↑]/.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      [...node.nodeValue].forEach((character) => {
        if (character === '↗') fragment.append(icon('northeast'));
        else if (character === '↑') fragment.append(icon('up'));
        else fragment.append(character);
      });
      node.parentNode.replaceChild(fragment, node);
    });
  };

  const style = document.createElement('style');
  style.textContent = '.ui-arrow{display:inline-flex;width:1em;height:1em;vertical-align:-.11em;align-items:center;justify-content:center;line-height:1}.ui-arrow svg{display:block;width:100%;height:100%}';
  document.head.append(style);
  replaceGlyphs();
})();
