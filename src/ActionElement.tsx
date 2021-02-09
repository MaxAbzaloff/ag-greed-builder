import React, { Component } from 'react';


// export const ActionElement: Component = () => {
//   return (
//     <div>
//       actions component
//     </div>
//   );
// }

export class ActionElement extends Component {
  constructor(props: any) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <span>{ 'actions' }</span>
    );
  }
}