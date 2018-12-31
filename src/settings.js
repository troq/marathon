import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from './store';
import './eradicate.css';
import './settings.css';

class Settings extends Component {
  render() {
    return (
      <form>
        <label>Website:</label>

        <select id="site-select">
            <option value="facebook">Facebook</option>
            <option value="Reddit">Reddit</option>
        </select>
        {JSON.stringify(this.props)}
        <button onClick={function() { alert('click'); }}>Save</button>
      </form>
    );
  }
}

Settings = connect((state) => state)(Settings);

createStore().then(store =>
  ReactDOM.render(
    <Provider store={store}>
      <Settings />
    </Provider>,
    document.getElementById('root')
  )
)
