import config from '../config';

import { BuiltinQuotes } from '../quote';

export function areNewFeaturesAvailable(state) {
	return config.newFeatureIncrement > state.featureIncrement;
}

export function getBuiltinQuotes(state) {
	if (!state.builtinQuotesEnabled) return [];
	return BuiltinQuotes.filter(
		quote => state.hiddenBuiltinQuotes.indexOf(quote.id) === -1
	);
}

export function currentQuote(state) {
	const emptyQuote = { id: null, text: 'No quotes found!', source: '' };

	if (state.currentQuoteID == null) return emptyQuote;

	if (state.isCurrentQuoteCustom) {
		return (
			state.customQuotes.find(quote => quote.id === state.currentQuoteID) ||
			emptyQuote
		);
	} else {
		return (
			BuiltinQuotes.find(quote => quote.id === state.currentQuoteID) ||
			emptyQuote
		);
	}
}
