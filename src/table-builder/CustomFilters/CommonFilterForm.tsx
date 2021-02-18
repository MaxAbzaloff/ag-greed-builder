import React, { FunctionComponent } from "react";

type Props = {
  onSubmit(event: any): void;
};

const CommonFilterForm: FunctionComponent<Props> = (props) => {
  return (
    <form className={"filter-form"} onSubmit={props.onSubmit}>
      {props.children}
      <button className={"filter-apply-button"}>Apply</button>
    </form>
  );
};

export { CommonFilterForm };
