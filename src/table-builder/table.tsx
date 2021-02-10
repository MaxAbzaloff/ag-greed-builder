import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { RowNode } from 'ag-grid-community';

import {
  Table,
  TableColumn,
  TableComponent,
  TableFrameworkComponent,
  TableProps,
} from './types';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export class TableImplementation implements Table {
  private columns: TableColumn[] = [];
  private components = Object.create(null);
  
  public addComponent(component: TableFrameworkComponent): Table {
    this.components = {
      ...this.components,
      ...component,
    };
    return this;
  }

  public pushColumn(column: TableColumn): Table {
    this.columns.push(column);
    return this;
  }

  private isRowSelectable = (rowNode: RowNode): boolean => {
    const checkboxConfig = this.columns.map((column: TableColumn) => column.checkboxSelection);

    if (!checkboxConfig.length || typeof checkboxConfig[0] !== 'function') return false;

    return checkboxConfig[0](rowNode);
  }

  public getReadyToUseJSXElement(): TableComponent {
    return (props: TableProps) => {
      const {
        rowData,
      } = props;
      
      return (
        <AgGridReact
          rowData={rowData}
          isRowSelectable={this.isRowSelectable}
          frameworkComponents={this.components}
        >
          {
            this.columns.map((column: TableColumn) => (
              <AgGridColumn
                key={column.field} 
                field={column.field}
                sortable={column.sortable}
                checkboxSelection={column.checkboxSelection}
                headerName={column.header}
                flex={column.flexGrow}
                editable={column.editable}
                onCellValueChanged={column.onChangeValue}
                valueFormatter={column.valueFormatter}
                headerCheckboxSelection={column.headerCheckboxSelection}
                cellRenderer={column.cellRenderer}
                headerComponent={column.headerComponent}
              ></AgGridColumn>
            ))
          }
        </AgGridReact>
      );
  }}
}
