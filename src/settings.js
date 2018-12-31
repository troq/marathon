import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from './store';
import { setDaySettings, resetDaySettings } from './store/actions';
import './eradicate.css';
import './settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSite: 'facebook',
      selectedDay: 0,
    };
  }

  selectSite = (e) => {
    this.setState({ selectedSite: e.currentTarget.value });
  }

  selectDay = (e) => {
    this.setState({ selectedDay: e.currentTarget.value });
  }

  changeSettings = setting => e => {
    const settings = (this.props.siteSettings[this.state.selectedSite] || {})[this.state.selectedDay];
    this.props.setDaySettings(
      this.state.selectedSite,
      this.state.selectedDay,
      { flexStart: 0, flexMinutes: 0, cheatMinutes: 0, ...settings, [setting]: parseInt(e.currentTarget.value, 10) },
    );
  }

  render() {
    const siteSettingsForDay = (this.props.siteSettings[this.state.selectedSite] || {})[this.state.selectedDay] || {};
    return (
      <form>
        <label>Website:</label>

        <select value={this.state.selectedSite} onChange={this.selectSite}>
            <option value="facebook">Facebook</option>
            <option value="reddit">Reddit</option>
        </select>
        <select value={this.state.selectedDay} onChange={this.selectDay}>
          <option value="0">Sunday</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
        </select>
        <select value={siteSettingsForDay.flexStart || 0} onChange={this.changeSettings('flexStart')}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
        </select>
        <label>Flex Minutes:</label>
        <input type="text" value={siteSettingsForDay.flexMinutes || 0} onChange={this.changeSettings('flexMinutes')} />
        <label>Cheat Minutes:</label>
        <input type="text" value={siteSettingsForDay.cheatMinutes || 0} onChange={this.changeSettings('cheatMinutes')} />
        {JSON.stringify(this.state)}
        {JSON.stringify(this.props)}
        <button onClick={(e) => { e.preventDefault(); console.log(this.props); }}>Save</button>
      </form>
    );
  }
}

Settings = connect(state => state, { setDaySettings, resetDaySettings })(Settings);

createStore().then(store =>
  ReactDOM.render(
    <Provider store={store}>
      <Settings />
    </Provider>,
    document.getElementById('root')
  )
)
