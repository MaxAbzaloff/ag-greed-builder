import React, { Component } from "react";

class TextFilter extends Component<any, any> {
  private input: any;
  constructor(props: any) {
    super(props);

    this.input = React.createRef();

    this.state = {
      filter: "",
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
    return { filter: this.state.filter };
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
      this.setState({ filter: filter }, () => {
        this.props.filterChangedCallback();
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="filter"
          ref={this.input}
          defaultValue={this.state.filter}
        />
        <button>Apply</button>
      </form>
    );
  }
}

export { TextFilter };
