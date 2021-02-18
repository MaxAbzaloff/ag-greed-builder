import { Component } from "react";

import { TableBuilder, Table, TableColumn } from "./types";
import { TableImplementation } from "./table";

export class TableBuilderImplementation implements TableBuilder {
    private table!: Table;

    constructor() {
        this.reset();
    }

    public registerComponent(name: string, component: Component): TableBuilder {
        const newComponent = Object.create(null);
        newComponent[name] = component;
        this.table.addComponent(newComponent);
        return this;
    }

    public addColumn = (column: TableColumn): TableBuilder => {
        this.table.pushColumn(column);
        return this;
    };

    public setSortFunction = (serersideSort: Function): TableBuilder => {
      this.table.setSort(serersideSort);
      return this;
    };

    public setSearchFunction = (serersideSearch: Function): TableBuilder => {
      this.table.setSearch(serersideSearch);
      return this;
    };

    public reset = (): TableBuilder => {
        this.table = new TableImplementation();
        return this;
    }

    public build = (): Table => {
        const table = this.table;
        this.reset();
        return table;
    }
}
