import { ValueFormatterParams } from "ag-grid-community";
import { ActionColumnBuilder, ColumnBuilderAbstract, Params, TableColumn } from "./types";


export class ActionColumnBuilderImplementation extends ColumnBuilderAbstract implements ActionColumnBuilder {
    private column!: TableColumn;

    constructor(name: string) {
        super(name);
        this.reset();
        this.column.field = name;
        this.column.flexGrow = 1;
        this.column.header = name;
    }

    buildRenderer(): ActionColumnBuilder {
        return this;
    }

    buildValueFormatter(formatFunction: (taget: ValueFormatterParams) => string): ActionColumnBuilder {
        this.column.valueFormatter = formatFunction;
        return this;
    }

    reset(): ActionColumnBuilder {
        this.column = Object.create(null);
        return this;
    }

    buildHeader(header: string): ActionColumnBuilder {
        this.column.header = header;
        return this;
    }

    setBasicFlexGrow(flexGrow: number): ActionColumnBuilder {
        this.column.flexGrow = flexGrow;
        return this;
    }

    buildCheckbox(isCheckboxEnabled: ((target: Params) => boolean) | boolean = true): ActionColumnBuilder {
        this.column.checkboxSelection = isCheckboxEnabled;
        return this;
    }
    
    getColumn(): TableColumn {
        const column = this.column;
        this.reset();
        return column;
    }
}
