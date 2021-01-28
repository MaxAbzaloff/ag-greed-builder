import { ValueFormatterParams } from 'ag-grid-community';
import React from 'react';

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

    const make: ColumnBuilder = new ColumnBuilderImplementation('make');
    make.buildCheckbox((target: Params) => {
        // here can be any filtered funtion
        return target.data.price > 35000;
    });
    make.buildHeader('Fancy header');

    const model: ColumnBuilder = new ColumnBuilderImplementation('model');
    model.buildEdit();

    const price: ColumnBuilder = new ColumnBuilderImplementation('price');
    price.buildSort();
    price.buildValueFormatter((target: ValueFormatterParams): string => {
        return '$ ' + target.value;
    })

    const actions: ActionColumnBuilder = new ActionColumnBuilderImplementation('actions');
    actions.buildHeader('Actions');

    const table: Table = tableBuilder
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
