import React, { Component } from 'react';


export class CustomHeader extends Component {
  constructor(props: any) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <span>{ 'super header' }</span>
    );
  }
}
