import React from 'react';
import {Dialog, RaisedButton } from 'material-ui';
import {DatePicker, TextField} from 'material-ui';

export default class ComeEditorModal extends React.Component {
  constructor(props) {
    super( props );
    this.state = {
      come: this.props.come != null ? this.props.come : {
        concept: "" , ammount: 0, date: new Date().getFullYear()
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

  render() {
    const actions = [
      <RaisedButton
        label="Guardar"
        primary
      />,
      <RaisedButton
        label="Eliminar"
        secondary
      />
    ];

    return (
      <Dialog
        actions={actions}
        modal
        open={false}
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
          onChange={this.handleChangeDate}
          floatingLabelText="Fecha"
        />
      </Dialog>
    );
  }
}
