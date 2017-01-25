import React from 'react';
import ReactDOM from 'react-dom';

import FinancesPanel from './financespanel.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render() {
    return(
      <MuiThemeProvider>
        <FinancesPanel />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
