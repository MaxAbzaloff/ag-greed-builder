import React, { Component } from "react";
import "./styles.css";

import { CommonFilterForm } from "./CommonFilterForm";

class DateFilter extends Component<any, any> {
  private input: any;
  constructor(props: any) {
    super(props);

    this.input = React.createRef();

    this.state = {
      from: "",
      to: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  isFilterActive() {
    return this.state.from !== "" || this.state.to !== "";
  }

  doesFilterPass(params: any) {
    return true;
  }

  getModel() {
    return { from: this.state.from, to: this.state.to };
  }

  setModel(model: any) {
    const from = model ? model.from : "";
    const to = model ? model.to : "";
    this.setState({ from, to });
  }

  afterGuiAttached(params: any) {
    this.input.current.focus();
  }

  onSubmit(event: any) {
    event.preventDefault();
    const from = event.target.elements.from.value;
    const to = event.target.elements.to.value;

    this.setState({ from, to }, () => {
      this.props.filterChangedCallback();
    });
  }

  render() {
    return (
      <CommonFilterForm onSubmit={this.onSubmit}>
        <div className={"filter-date-rage-wrapper"}>
          <input
            type="date"
            name="from"
            ref={this.input}
            defaultValue={this.state.from}
            className={"filter-input"}
          />
          <input
            type="date"
            name="to"
            ref={this.input}
            defaultValue={this.state.to}
            className={"filter-input"}
          />
        </div>
      </CommonFilterForm>
    );
  }
}

export { DateFilter };
