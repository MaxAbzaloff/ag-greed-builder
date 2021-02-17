import React, { Component } from "react";
import "./styles.css";

import { CommonFilterForm } from "./CommonFilterForm";

class SelectFilter extends Component<any, any> {
  private input: any;
  constructor(props: any) {
    super(props);

    this.input = React.createRef();

    this.state = {
      filter: "",
      options: [{ name: "", key: "" }, ...props.filterOptions],
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  isFilterActive() {
    return this.state.filter !== "";
  }

  doesFilterPass(params: any) {
    return true;
  }

  getModel() {
    const option = this.state.options.find(
      (opt: any) => opt.name === this.state.filter
    );
    return { filter: option.key };
  }

  setModel(model: any) {
    const filter = model ? model.filter : "";
    this.setState({ filter: filter });
  }

  afterGuiAttached(params: any) {
    this.input.current.focus();
  }

  onSubmit(event: any) {
    event.preventDefault();

    let filter = event.target.elements.filter.value;

    if (this.state.filter !== filter) {
      this.setState({ filter }, () => {
        this.props.filterChangedCallback();
      });
    }
  }

  render() {
    return (
      <CommonFilterForm onSubmit={this.onSubmit}>
        <select
          name="filter"
          ref={this.input}
          className={"filter-input"}
          defaultValue={this.state.filter}
        >
          {this.state.options.map((opt: any) => (
            <option>{opt.name}</option>
          ))}
        </select>
      </CommonFilterForm>
    );
  }
}

export { SelectFilter };
