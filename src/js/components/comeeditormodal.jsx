import React from 'react';
import {Dialog, RaisedButton } from 'material-ui';
import { TextField, DatePicker } from 'material-ui';

export default class ComeEditorModal extends React.Component {
  constructor(props) {
    super( props );
    const date = new Date();
    /*
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    const yyyy = date.getFullYear();
    if( dd < 10 ){
        dd = '0' + dd;
    }
    if( mm < 10 ){
        mm = '0' + mm;
    }
    const today = dd + '-' + mm + '-' + yyyy;
    */
    this.state = {
      come: this.props.come != null ?
        this.props.come : {
        concept: "" ,
        ammount: 0,
        date: date
      }
    };
  }

  handleChangeConcept = (event) => {
    const come = this.state.come;
    come.concept = event.target.value;
    this.setState( { come: come } );
  }

  handleChangeAmmount = (event) => {
    const come = this.state.come;
    const regex = /^[. \d]*$/;
    if( regex.test( event.target.value ) ) {
       come.ammount = event.target.value;
    }
    this.setState( { come: come } )
  }

  handleChangeDate = (event, date) => {
    const come = this.state.come;
    come.date = date;
    this.setState( { come: come } );
  }

  parseAmmount = () => {
    const come = this.state.come;
    come.ammount = parseFloat( come.ammount );
    this.setState( { come: come } );
  }

  handleSave = () => {
    this.parseAmmount();
    if( this.props.index !== -1 ){
      this.props.update(this.state.come, this.props.index);
    } else {
      this.props.store(this.state.come);
    }
    this.props.close();
  }

  handleDeletion = () => {
    if( this.props.index !== -1 ) {
      this.props.delete(this.props.index);
    }
    this.props.close();
  }

  render() {
    const actions = [
      <RaisedButton
        label="Guardar"
        primary
        onClick={this.handleSave}
      />,
      <RaisedButton
        label="Eliminar"
        secondary
        onClick={this.handleDeletion}
      />
    ];

    return (
      <Dialog
        actions={actions}
        onRequestClose={this.props.close}
        open={this.props.open}
      >
        <TextField
          id="concept-field"
          floatingLabelText="Concepto"
          value={this.state.come.concept}
          onChange={this.handleChangeConcept}
        />
        <TextField
          id="ammount-field"
          floatingLabelText="Cantidad (€)"
          value={this.state.come.ammount}
          onChange={this.handleChangeAmmount}
        />
        <DatePicker
          floatingLabelText="Fecha"
          onChange={this.handleChangeDate}
          autoOk={false}
          defaultDate={this.state.come.date}
          disableYearSelection={false}
        />
      </Dialog>
    );
  }
}
