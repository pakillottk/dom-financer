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
      selectedIncome: null,
      selectedOutcome: null,
      incomes: [{
        concept: "Ingreso A",
        ammount: 500.0,
        date: "23-01-2017"
      }],
      outcomes: [{
        concept: "Gasto A",
        ammount: 1000.0,
        date: "30-01-2017"
      }]
    };
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

  storeIncome = (income) => {
    const incomes = this.state.incomes;
    incomes.push(income);
    this.setState({incomes: incomes});
  }

  updateIncome = (income, index) => {
    const incomes = this.state.incomes;
    incomes[index] = income;
    this.setState({incomes: incomes});
  }

  deleteIncome = (index) => {
    const incomes = this.state.incomes;
    incomes.splice(index, 1);
    this.setState({incomes: incomes});
  }

  storeOutcome = (outcome) => {
    const outcomes = this.state.outcomes;
    outcomes.push(outcome);
    this.setState({outcomes: outcomes});
  }

  updateOutcome = (outcome, index) => {
    const outcomes = this.state.outcomes;
    outcomes[index] = outcome;
    this.setState({outcomes: outcomes});
  }

  deleteOutcome = (index) => {
    const outcomes = this.state.outcomes;
    outcomes.splice(index, 1);
    this.setState({outcomes: outcomes});
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
            <TableRowColumn> {income.date} </TableRowColumn>
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
              <TableRowColumn> {outcome.date} </TableRowColumn>
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

        <ComeEditorModal come={null} />

        {/* INCOMES TABLE */}
        <Table onCellClick={ (row) => { this.setState({selectionIndex: row, selectedIncome: this.state.incomes[row]}) } }>
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
                <RaisedButton label='Nuevo Ingreso' primary/>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

        {/* OUTCOMES TABLE */}
        <Table onCellClick={ (row) => { this.setState({selectionIndex: row, selectedOutcome: this.state.outcomes[row]}) } }>
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
                <RaisedButton label='Nuevo Gasto' primary/>
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
