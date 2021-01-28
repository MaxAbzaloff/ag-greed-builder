import { TableBuilder, Table, TableColumn } from "./types";
import { TableImplementation } from "./table";


export class TableBuilderImplementation implements TableBuilder {
    private table!: Table;

    constructor() {
        this.reset();
    }

    public buildColumn = (column: TableColumn): TableBuilder => {
        this.table.columns.push(column);
        return this;
    };

    public reset = (): TableBuilder => {
        this.table = new TableImplementation();
        return this;
    }

    public getTable = (): Table => {
        const table = this.table;
        this.reset();
        return table;
    }
}
