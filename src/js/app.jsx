import React from 'react';
import ReactDOM from 'react-dom';
import DB from './db.js';
import FinancesPanel from './financespanel.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const db = new DB();

class App extends React.Component {
  render() {
    return(
      <MuiThemeProvider>
        <FinancesPanel
          getIncomes={db.getAllIncomes}
          storeIncomeDB={db.insertIncome}
          updateIncomeDB={db.updateIncome}
          deleteIncomeDB={db.deleteIncome}
          getOutcomes={db.getAllOutcomes}
          storeOutcomeDB={db.insertOutcome}
          updateOutcomeDB={db.updateOutcome}
          deleteOutcomeDB={db.deleteOutcome}

        />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
