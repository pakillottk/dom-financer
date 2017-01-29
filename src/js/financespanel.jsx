import React from 'react';
import {DatePicker} from 'material-ui';
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RaisedButton} from 'material-ui';
import ComeEditorModal from './components/comeeditormodal.jsx';

export default class FinancesPanel extends React.Component {
  constructor(props) {
    super(props);
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      selectionIndex: -1,
      selectedCome: null,
      incomes: [],
      outcomes: [],
      storeMethod: this.storeIncome,
      updateMethod: this.updateIncome,
      deleteMethod: this.deleteIncome,
      openEditor: false
    };
  }

  componentWillMount() {
    this.props.getIncomesInRange( this.state.minDate, this.state.maxDate, this.getIncomesFromDB );
    this.props.getOutcomes(this.getOutcomesFromDB);
  }

  getIncomesFromDB = (docs) => {
    this.setState( { incomes: docs } );
  }

  getOutcomesFromDB = (docs) => {
    this.setState( { outcomes: docs } );
  }

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    })
  }

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    })
  }

  setIncomesMethods = () => {
    this.setState({
      storeMethod: this.storeIncome,
      updateMethod: this.updateIncome,
      deleteMethod: this.deleteIncome
    });
  }

  setOutcomesMethods = () => {
    this.setState({
      storeMethod: this.storeOutcome,
      updateMethod: this.updateOutcome,
      deleteMethod: this.deleteOutcome
    });
  }

  storeIncome = (income) => {
    const incomes = this.state.incomes;
    const id = this.props.storeIncomeDB(income);
    if(id === null){
      return null;
    }
    income._id = id;
    incomes.push(income);
    this.setState({incomes: incomes});
  }

  updateIncome = (income, index) => {
    const updated = this.props.updateIncomeDB(income);
    if( updated === null ) {
      return null;
    }
    const incomes = this.state.incomes;
    incomes[index] = income;
    this.setState({incomes: incomes});
  }

  deleteIncome = (index) => {
    const incomes = this.state.incomes;
    const deleted = this.props.deleteIncomeDB(incomes[index]);
    if( deleted === null ) {
      return null;
    }
    incomes.splice(index, 1);
    this.setState({incomes: incomes});
  }

  storeOutcome = (outcome) => {
    const outcomes = this.state.outcomes;
    const id = this.props.storeOutcomeDB(outcome);
    if(id === null){
      return null;
    }
    outcome._id = id;
    outcomes.push(outcome);
    this.setState({outcomes: outcomes});
  }

  updateOutcome = (outcome, index) => {
    const updated = this.props.updateOutcomeDB(outcome);
    if( updated === null ) {
      return null;
    }
    const outcomes = this.state.outcomes;
    outcomes[index] = outcome;
    this.setState({outcomes: outcomes});
  }

  deleteOutcome = (index) => {
    const outcomes = this.state.outcomes;
    const deleted = this.props.deleteOutcomeDB(outcomes[index]);
    if( deleted === null ) {
      return null;
    }
    outcomes.splice(index, 1);
    this.setState({outcomes: outcomes});
  }

  selectIncome = (index) => {
    this.setIncomesMethods();
    this.setState( { selectedIndex: index, selectedCome: this.state.incomes[index] } );
    this.openEditor();
  }

  selectOutcome = (index) => {
    this.setOutcomesMethods();
    this.setState( { selectedIndex: index, selectedCome: this.state.outcomes[index] } );
    this.openEditor();
  }

  createIncome = () => {
    this.setIncomesMethods();
    this.setState({
      selectedCome: null,
      selectedIndex: -1
    });
    this.openEditor();
  }

  createOutcome = () => {
    this.setOutcomesMethods();
    this.setState({
      selectedCome: null,
      selectedIndex: -1
    });
    this.openEditor();
  }

  openEditor = () => {
    this.setState( { openEditor: true } );
  }

  closeEditor = () => {
    this.setState( { openEditor: false } );
  }

  render() {
    let totalIncome = 0.0;
    let totalOutcome = 0.0;

    const incomesRows = [];
    this.state.incomes.forEach((income, index) => {
      totalIncome += income.ammount;
      incomesRows.push(
        ( <TableRow key={index} id={index}>
            <TableRowColumn> {income.concept} </TableRowColumn>
            <TableRowColumn> {income.ammount + "€"} </TableRowColumn>
            <TableRowColumn> { income.date.toISOString().slice(0,10).replace(/-/g,"-") } </TableRowColumn>
          </TableRow>)
      );
    })


    const outcomesRows = [];
    this.state.outcomes.forEach((outcome, index) => {
      totalOutcome += outcome.ammount;
      outcomesRows.push(
        ( <TableRow key={index} id={index}>
            <TableRowColumn> {outcome.concept} </TableRowColumn>
            <TableRowColumn> {outcome.ammount + "€"} </TableRowColumn>
            <TableRowColumn> { outcome.date.toISOString().slice(0,10).replace(/-/g,"-") } </TableRowColumn>
          </TableRow>)
      );
    })

    return (
      <div>
        <DatePicker
          floatingLabelText="Fecha inicial"
          onChange={this.handleChangeMinDate}
          autoOk={false}
          defaultDate={this.state.minDate}
          disableYearSelection={false}
        />
        <DatePicker
          floatingLabelText="Fecha final"
          onChange={this.handleChangeMaxDate}
          autoOk={false}
          defaultDate={this.state.minDate}
          disableYearSelection={false}
        />

        {this.state.openEditor && <ComeEditorModal
          open={this.state.openEditor}
          close={this.closeEditor}
          index={this.state.selectedIndex}
          come={this.state.selectedCome}
          store={this.state.storeMethod}
          update={this.state.updateMethod}
          delete={this.state.deleteMethod}
        />}

        {/* INCOMES TABLE */}
        <Table onCellClick={ (row) => { this.selectIncome( row ) } } >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Haga click en un ingreso para editar o eliminar" style={{textAlign: 'center'}}>
                INGRESOS
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Ingreso</TableHeaderColumn>
              <TableHeaderColumn>Cantidad</TableHeaderColumn>
              <TableHeaderColumn>Fecha</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false}>
            {incomesRows}
          </TableBody>
          <TableFooter adjustForCheckbox={false}>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                <RaisedButton label='Nuevo Ingreso' primary onClick={ () => { this.createIncome(); } } />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

        {/* OUTCOMES TABLE */}
        <Table onCellClick={ (row) => { this.selectOutcome(row) } }>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Haga click en un gasto para editar o eliminar" style={{textAlign: 'center'}}>
                GASTOS
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Gasto</TableHeaderColumn>
              <TableHeaderColumn>Cantidad</TableHeaderColumn>
              <TableHeaderColumn>Fecha</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false}>
            {outcomesRows}
          </TableBody>
          <TableFooter adjustForCheckbox={false}>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                <RaisedButton label='Nuevo Gasto' primary onClick={ () => { this.createOutcome(); } }/>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

        {/* SUMMARY TABLE */}
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
              RESUMEN DEL PERIODO
            </TableHeaderColumn>
            <TableRow>
              <TableHeaderColumn>Total Ingresos</TableHeaderColumn>
              <TableHeaderColumn>Total Gastos</TableHeaderColumn>
              <TableHeaderColumn>Balance</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn> {totalIncome+'€'} </TableRowColumn>
              <TableRowColumn> {totalOutcome+'€'} </TableRowColumn>
              <TableRowColumn> {(totalIncome - totalOutcome) + '€' } </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}
