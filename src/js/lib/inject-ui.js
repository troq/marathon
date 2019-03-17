import Quotes from './quotes';

export function isAlreadyInjected() {
	return document.querySelector('#nfe-container') != null;
}

export default function injectUI(streamContainer) {
  const quote = Quotes[Math.floor(Math.random() * Quotes.length)]
	var nfeContainer = document.createElement('div');
	nfeContainer.id = 'nfe-container';
  nfeContainer.innerHTML = `
    <div id="nfe-quote" class="nfe-quote">
      <p class="nfe-quote-text">
        <span>“</span>
        <span>${quote.text}</span>
        <span>”</span>
      </p>
      <p class="nfe-quote-source">
        <span>~</span>
        <span>${quote.source}</span>
      </p>
    </div>
  `;
	streamContainer.appendChild(nfeContainer);
}
