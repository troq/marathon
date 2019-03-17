import * as redux from 'redux';

import { getBuiltinQuotes } from './selectors';

const ActionTypes = {
	TOGGLE_SHOW_QUOTES: 'TOGGLE_SHOW_QUOTES',
	TOGGLE_BUILTIN_QUOTES: 'TOGGLE_BUILTIN_QUOTES',
	SELECT_NEW_QUOTE: 'SELECT_NEW_QUOTE',
	HIDE_QUOTE: 'HIDE_QUOTE',
	DELETE_QUOTE: 'DELETE_QUOTE',
	ADD_QUOTE: 'ADD_QUOTE',
	ADD_QUOTES_BULK: 'ADD_QUOTES_BULK',
	RESET_HIDDEN_QUOTES: 'RESET_HIDDEN_QUOTES',
}

export default ActionTypes;

function generateID() {
	let key = '';
	while (key.length < 16) {
		key += Math.random()
			.toString(16)
			.substr(2);
	}
	return key.substr(0, 16);
}

export function hideInfoPanel() {
	return {
		type: 'INFO_PANEL_SHOW',
		show: 'HIDE',
	};
}

export function showInfoPanel() {
	return {
		type: 'INFO_PANEL_SHOW',
		show: 'SHOW',
	};
}

export function toggleShowQuotes() {
	return {
		type: ActionTypes.TOGGLE_SHOW_QUOTES,
	};
}

export function toggleBuiltinQuotes() {
	return dispatch => {
		dispatch({
			type: ActionTypes.TOGGLE_BUILTIN_QUOTES,
		});

		dispatch(selectNewQuote());
	};
}

export function addQuote(text, source) {
	const id = generateID();
	return dispatch => {
		dispatch({
			type: ActionTypes.ADD_QUOTE,
			id,
			text,
			source,
		});
		dispatch(cancelEditing());
	};
}

export function resetHiddenQuotes() {
	return {
		type: ActionTypes.RESET_HIDDEN_QUOTES,
	};
}

export function removeCurrentQuote() {
	return (dispatch, getState) => {
		const state = getState();
		if (state.isCurrentQuoteCustom) {
			dispatch({
				type: ActionTypes.DELETE_QUOTE,
				id: state.currentQuoteID,
			});
		} else {
			dispatch({
				type: ActionTypes.HIDE_QUOTE,
				id: state.currentQuoteID,
			});
		}

		dispatch(selectNewQuote());
	};
}

export function selectNewQuote() {
	return (dispatch, getState) => {
		const state = getState();
		const builtinQuotes = getBuiltinQuotes(state);
		const customQuotes = state.customQuotes;
		const allQuotes = builtinQuotes.concat(customQuotes);
		if (allQuotes.length < 1) {
			return dispatch({
				type: ActionTypes.SELECT_NEW_QUOTE,
				isCustom: false,
				id: null,
			});
		}

		const quoteIndex = Math.floor(Math.random() * allQuotes.length);
		dispatch({
			type: ActionTypes.SELECT_NEW_QUOTE,
			isCustom: quoteIndex >= builtinQuotes.length,
			id: allQuotes[quoteIndex].id,
		});
	};
}

export function setQuoteText(text) {
	return {
		type: 'QUOTE_EDIT',
		action: { type: 'SET_TEXT', text },
	};
}

export function setQuoteSource(source) {
	return {
		type: 'QUOTE_EDIT',
		action: { type: 'SET_SOURCE', source },
	};
}

export function startEditing() {
	return {
		type: 'QUOTE_EDIT',
		action: { type: 'START' },
	};
}

export function cancelEditing() {
	return {
		type: 'QUOTE_EDIT',
		action: { type: 'CANCEL' },
	};
}

export const menuHide = () => ({
	type: 'QUOTE_MENU_SHOW',
	show: 'HIDE',
});

export const menuToggle = () => ({
	type: 'QUOTE_MENU_SHOW',
	show: 'TOGGLE',
});

export function toggleBulkEdit() {
	return {
		type: 'QUOTE_EDIT',
		action: { type: 'TOGGLE_BULK' },
	};
}

export function addQuotesBulk(text) {
	return dispatch => {
		const lines = text.split('\n');
		const quotes = [];
		for (var lineCount = 0; lineCount < lines.length; lineCount++) {
			const line = lines[lineCount];
			const quote = line.split('~');
			const trimmedQuote = [];

			if (quote.length === 0 || quote[0].trim() === '') {
				// ignore newlines and empty spaces
			} else if (quote.length !== 2) {
				return dispatch({
					type: 'PARSE_ERROR',
					message: `Invalid format on line ${(
						lineCount + 1
					).toString()}: \"${quote}\"`,
				});
			} else {
				quote.forEach(field => trimmedQuote.push(field.trim()));
				quotes.push(trimmedQuote);
			}
		}
		quotes.forEach(trimmedQuote => {
			dispatch({
				type: ActionTypes.ADD_QUOTE,
				id: generateID(),
				text: trimmedQuote[0],
				source: trimmedQuote[1],
			});
		});
		dispatch(cancelEditing());
	};
}
