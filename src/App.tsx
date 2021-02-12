import { ValueFormatterParams } from 'ag-grid-community';
import React from 'react';
import { ActionElement } from './ActionElement';
import { CustomHeader } from './CustomHeader';

import { RandomPageWithAPropsAndXhr } from './ready-table';

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
} from './table-builder';


const App = () => {
    const tableBuilder: TableBuilder = new TableBuilderImplementation();

    tableBuilder.registerComponent('actions', ActionElement);
    tableBuilder.registerComponent('customHeader', CustomHeader);

    const checkbox: ColumnBuilder = new ColumnBuilderImplementation();
    checkbox.setCheckbox((target: Params<any>) => {
        // here can be any filtered function
        return target.data.price > 35000;
    });

    const make: ColumnBuilder = new ColumnBuilderImplementation();
    make.setField('make');
    make.setHeader('Fancy header');

    const model: ColumnBuilder = new ColumnBuilderImplementation();
    model.setField('model');
    model.setEditable();

    const price: ColumnBuilder = new ColumnBuilderImplementation();
    price.setField('price');
    price.setSortable();
    price.setValueFormatter((target: ValueFormatterParams): string => {
        return '$ ' + target.value;
    });

    const actions: ActionColumnBuilder = new ActionColumnBuilderImplementation();
    actions.setHeader('Actions');
    actions.setRenderer('actions');
    actions.setCustomHeader('customHeader');

    const table: Table = tableBuilder
        .addColumn(checkbox.buildColumn())
        .addColumn(make.buildColumn())
        .addColumn(model.buildColumn())
        .addColumn(price.buildColumn())
        .addColumn(actions.buildColumn())
        .buildTable();

    const TableElement: TableComponent = table.getReadyToUseJSXElement();

    return (
        <RandomPageWithAPropsAndXhr Table={TableElement} />
    );
};

export default App;
