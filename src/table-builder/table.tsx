import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import { Table, TableColumn, TableComponent, TableProps } from './types';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export class TableImplementation implements Table {
  public columns: TableColumn[] = [];
  public getReadyToUseJSXElement(): TableComponent {
    return (props: TableProps) => {
      const {
        rowData,
      } = props;
      
      console.log(props);

      return (
        <AgGridReact
          rowData={rowData} 
          rowSelection="multiple"
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
              ></AgGridColumn>
            ))
          }
        </AgGridReact>
      );
  }}
}
