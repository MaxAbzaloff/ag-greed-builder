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
} from './table-builder';
import { ActionColumnBuilderImplementation } from './table-builder/action-column-builder';


const App = () => {
    const tableBuilder: TableBuilder = new TableBuilderImplementation();

    tableBuilder.registerComponent('actions', ActionElement);
    tableBuilder.registerComponent('customHeader', CustomHeader);

    const checkbox: ColumnBuilder = new ColumnBuilderImplementation();
    checkbox.buildCheckbox((target: Params<any>) => {
        // here can be any filtered funtion
        return target.data.price > 35000;
    });

    const make: ColumnBuilder = new ColumnBuilderImplementation();
    make.buildField('make');
    make.buildHeader('Fancy header');

    const model: ColumnBuilder = new ColumnBuilderImplementation();
    model.buildField('model');
    model.buildEdit();

    const price: ColumnBuilder = new ColumnBuilderImplementation();
    price.buildField('price');
    price.buildSort();
    price.buildValueFormatter((target: ValueFormatterParams): string => {
        return '$ ' + target.value;
    });

    const actions: ActionColumnBuilder = new ActionColumnBuilderImplementation();
    actions.buildHeader('Actions');
    actions.buildRenderer('actions');
    actions.buildCustomHeader('customHeader');

    const table: Table = tableBuilder
        .buildColumn(checkbox.getColumn())
        .buildColumn(make.getColumn())
        .buildColumn(model.getColumn())
        .buildColumn(price.getColumn())
        .buildColumn(actions.getColumn())
        .getTable();

    const TableElement: TableComponent = table.getReadyToUseJSXElement();

    return (
        <RandomPageWithAPropsAndXhr Table={TableElement} />
    );
};

export default App;
