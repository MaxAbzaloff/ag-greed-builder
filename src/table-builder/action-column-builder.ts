import { ValueFormatterParams } from "ag-grid-community";
import {
  ActionColumnBuilder,
  ColumnBuilderAbstract,
  Params,
  TableColumn
} from "./types";


export class ActionColumnBuilderImplementation extends ColumnBuilderAbstract implements ActionColumnBuilder {
    private column!: TableColumn;

    constructor() {
        super();
        this.reset();
        this.column.flexGrow = 1;
    }
    
    setCustomHeader(component: string): ActionColumnBuilder {
        this.column.headerComponent = component;
        return this;
    }

    setRenderer(componentName: string): ActionColumnBuilder {
        this.column.cellRenderer = componentName;
        return this;
    }

    setValueFormatter(formatFunction: (taget: ValueFormatterParams) => string): ActionColumnBuilder {
        this.column.valueFormatter = formatFunction;
        return this;
    }

    reset(): ActionColumnBuilder {
        this.column = Object.create(null);
        return this;
    }

    setHeader(header: string): ActionColumnBuilder {
        this.column.header = header;
        return this;
    }

    setBasicFlexGrow(flexGrow: number): ActionColumnBuilder {
        this.column.flexGrow = flexGrow;
        return this;
    }

    setCheckbox(isCheckboxEnabled: ((target: Params<any>) => boolean) | boolean = true): ActionColumnBuilder {
        this.column.checkboxSelection = isCheckboxEnabled;
        return this;
    }
    
    build(): TableColumn {
        const column = this.column;
        this.reset();
        return column;
    }
}
