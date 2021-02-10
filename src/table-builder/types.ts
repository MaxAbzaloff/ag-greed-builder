// all inside Params interface
import {
    ColDef,
    Column,
    ColumnApi,
    Context,
    GridApi,
    RowNode,
    ValueFormatterParams,
} from "ag-grid-community";
import { Component } from "react";

export interface TableBuilder {
    /**
     * Add new column to the table.
     * 
     * @param {TableColumn} column ready column object
     */
    buildColumn(column: TableColumn): TableBuilder,
    /**
     * Sets jsx elements to render content (custom react elements for cells content)
     * @param component component which will render cells content
     */
    registerComponent(name: string, component: any): TableBuilder;
    /**
     * Drop all settings.
     */
    reset(): TableBuilder,
    /**
     * Return ready to use table config.
     */
    getTable(): Table,
}

export interface TableColumn {
    /**
     * Which field from row it should render.
     */
    field: string;
    /**
     * Option header title for column.
     */
    header?: string;
    /**
     * Is column can be sortable or not.
     */
    sortable?: boolean;
    /**
     * Is row can be selected.
     */
    checkboxSelection?: boolean | ((target: any) => boolean);
    /**
     * How fast it should be sized relative to the others columns.
     */
    flexGrow?: number;
    /**
     * Is this value could be changed.
     */
    editable?: boolean | ((target: any) => boolean);
    /**
     * Is header checkbox needed.
     */
    headerCheckboxSelection?: boolean;
    /**
     * Name of registered header component
     */
    headerComponent?: string;
    /**
     * Callback function on edit value.
     */
    onChangeValue?: (target: any) => void;
    /**
     * Pipe which change mapped value in a specific form.
     */
    valueFormatter?: (taget: ValueFormatterParams) => string;
    /**
     * Pipe which addes new renderer.
     */
    columnRenderer?: () => Component;
    /**
     * Defines if column can be selected from header checkbox.
     */
    isRowSelectable?: boolean;
    /**
     * Name of react component that will render content
     */
    cellRenderer?: string;
}

export type TableComponent = (props: any) => JSX.Element;

export interface TableFrameworkComponent {
    name: string;
    component: JSX.Element;
}

export interface Table {
    /**
     * Push new column in a table setup
     * @param column table column
     */
    pushColumn(column: TableColumn): Table;
    /**
     * Sets jsx elements to render content (custom react elements for cells content)
     * @param component component which will render cells content
     */
    addComponent(component: TableFrameworkComponent): Table;
    /**
     * Return JSX element which we can use as a usual react component.
     */
    getReadyToUseJSXElement(): TableComponent;
}

export interface TableProps {
    rowData: Object[];
}

interface BasicColumnBuilder {
    /**
     * Drop all settings.
     */
    reset(): BasicColumnBuilder;
    /**
     * Add custom header for column.
     * 
     * @param {string} header custom header
     */
    buildHeader(header: string): BasicColumnBuilder;
    /**
     * Set elements from row can be selected by checkbox.
     */
    buildCheckbox(isCheckboxEnabled?: (target: any) => boolean): BasicColumnBuilder;
    /**
     * Set formatter for column.
     * 
     * @param formatFunction function that formats value in a specific way
     */
    buildValueFormatter(formatFunction: (taget: ValueFormatterParams) => string): BasicColumnBuilder;
    /**
     * Set new renderer for a column.
     */
    buildRenderer(componentName: string): BasicColumnBuilder;
    /**
     * Return ready to use column config.
     */
    getColumn(): TableColumn;
}

export interface ColumnBuilder extends BasicColumnBuilder {
    /**
     * Set column as sortable.
     */
    buildSort(): ColumnBuilder;
    /**
     * Set element as editable.
     * 
     * @param isEditable true/false or function to figure it out later dynamically
     */
    buildEdit(isEditable?: boolean | ((target: any) => boolean), onChangeValue?: (params: any) => void): ColumnBuilder;
    /**
     * Set field from data to be rendered here.
     * 
     * @param name field name from data to map at column
     */
    buildField(name: string): ColumnBuilder;
    /**
     * Set title of column.
     * 
     * @param title title of the new column
     */
    buildTitle(title: string): ColumnBuilder;
}

export interface ActionColumnBuilder extends BasicColumnBuilder {
    /**
     * Set custom header component
     * 
     * @param component name of registered component that should replace header
     */
    buildCustomHeader(component: string): ActionColumnBuilder;
}

export abstract class ColumnBuilderAbstract {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {}
}

export interface Params<T> {
    api: GridApi;
    columnApi: ColumnApi;
    colDef: ColDef;
    column: Column;
    context: Context;
    value?: any;
    valueFormatted?: any;
    rowIndex?: number;
    node?: RowNode;
    /**
     * Row object with all data from our data array.
     */
    data?: T;
}
