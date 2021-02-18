import { ValueFormatterParams } from "ag-grid-community";
import React from "react";
import { ActionElement } from "./ActionElement";
import { CustomHeader } from "./CustomHeader";

import { RandomPageWithAPropsAndXhr } from "./ready-table";

import {
  ColumnBuilder,
  Table,
  TableBuilder,
  TableBuilderImplementation,
  TableComponent,
  ColumnBuilderImplementation,
  Params,
  ActionColumnBuilder,
  ActionColumnBuilderImplementation,
  SortObject,
} from "./table-builder";

import { FilterTypes } from "./table-builder/CustomFilters";

import "./ag-commont-styles.css";

const App = () => {
  const tableBuilder: TableBuilder = new TableBuilderImplementation();

  const serverSortExample = (sortMode: SortObject) => {
    console.log(sortMode);
    console.log("SERVER SORT");
  };

  const serverSearchExample = (searchModel: SortObject) => {
    console.log(searchModel);
    console.log("SERVER SEARCH");
  };

  tableBuilder.registerComponent("actions", ActionElement);
  tableBuilder.registerComponent("customHeader", CustomHeader);
  tableBuilder.setSortFunction(serverSortExample);
  tableBuilder.setSearchFunction(serverSearchExample);

  const checkbox: ColumnBuilder = new ColumnBuilderImplementation();
  checkbox.setCheckbox((target: Params<any>) => {
    // here can be any filtered function
    return target.data.price > 35000;
  });

  const make: ColumnBuilder = new ColumnBuilderImplementation();
  make.setField("make");
  make.setHeader("Fancy header");
  make.setSortable();
  make.setFilter(FilterTypes.TEXT_FILTER);

  const model: ColumnBuilder = new ColumnBuilderImplementation();
  model.setField("model");
  model.setEditable();
  model.setFilter(FilterTypes.ENUM_FILTER, [
    { name: "Один", key: "one" },
    { name: "Два", key: "two" },
    { name: "Три", key: "thri" },
  ]);

  const price: ColumnBuilder = new ColumnBuilderImplementation();
  price.setField("price");
  price.setSortable();
  price.setValueFormatter((target: ValueFormatterParams): string => {
    return "$ " + target.value;
  });
  price.setFilter(FilterTypes.DATE_FILTER);

  const actions: ActionColumnBuilder = new ActionColumnBuilderImplementation();
  actions.setHeader("Actions");
  actions.setRenderer("actions");
  actions.setCustomHeader("customHeader");

  const table: Table = tableBuilder
    .addColumn(checkbox.build())
    .addColumn(make.build())
    .addColumn(model.build())
    .addColumn(price.build())
    .addColumn(actions.build())
    .build();

  const TableElement: TableComponent = table.getReadyToUseJSXElement();

  return <RandomPageWithAPropsAndXhr Table={TableElement} />;
};

export default App;
