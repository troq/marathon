import * as browser from '../webextension';

import {
	createStore as createReduxStore,
	applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';
import { selectNewQuote } from './actions';

function saveSettings(state) {
	const data = {
		showQuotes: state.showQuotes,
		builtinQuotesEnabled: state.builtinQuotesEnabled,
		featureIncrement: state.featureIncrement,
		hiddenBuiltinQuotes: state.hiddenBuiltinQuotes,
		customQuotes: state.customQuotes,
	};

	browser.saveSettings(data);
}

export function createStore() {
	return new Promise(resolve => {
		browser.loadSettings(initialState => {
			const store = createReduxStore(
				rootReducer,
				initialState,
				applyMiddleware(thunk)
			);

			store.dispatch(selectNewQuote());

			store.subscribe(() => {
				saveSettings(store.getState());
			});

			resolve(store);
		});
	});
}
