import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { RowNode } from "ag-grid-community";

import {
  Table,
  TableColumn,
  TableComponent,
  TableFrameworkComponent,
  TableProps,
  SortObject,
} from "./types";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { NumberFilter, TextFilter, SelectFilter } from "./CustomFilters";
export class TableImplementation implements Table {
  private columns: TableColumn[] = [];
  private components = Object.create(null);
  private setServerSort = (sort: SortObject) => {};
  private setServerSearch = (search: any) => {};

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

  public setSort(serverSideSort: (sort: SortObject) => void) {
    this.setServerSort = serverSideSort;
  }

  public setSearch(serverSideSearch: (sort: SortObject) => void) {
    this.setServerSearch = serverSideSearch;
  }

  private isRowSelectable = (rowNode: RowNode): boolean => {
    const checkboxConfig = this.columns.map(
      (column: TableColumn) => column.checkboxSelection
    );

    if (!checkboxConfig.length || typeof checkboxConfig[0] !== "function")
      return false;

    return checkboxConfig[0](rowNode);
  };

  private handleSortChanged = (event: any) => {
    const sortModel = event?.columnApi?.columnController?.sortController?.getSortModel();
    if (sortModel) {
      this.setServerSort(sortModel[0] as SortObject);
    }
  };

  private handleFilterChanged = (event: any) => {
    const filterModel = event?.api?.getFilterModel();
    if (filterModel) {
      this.setServerSearch(filterModel);
    }
  };

  public getReadyToUseJSXElement(): TableComponent {
    return (props: TableProps) => {
      const { rowData } = props;
      const components = {
        textFilter: TextFilter,
        numberFilter: NumberFilter,
        selectFilter: SelectFilter,
      };
      return (
        <AgGridReact
          rowData={rowData}
          isRowSelectable={this.isRowSelectable}
          frameworkComponents={{ ...this.components, ...components }}
          gridOptions={{
            onSortChanged: this.handleSortChanged,
            onFilterChanged: this.handleFilterChanged,
          }}
        >
          {this.columns.map((column: TableColumn) => (
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
              comparator={column.comparator}
              filter={column.filter}
              filterParams={column.filterOptions}
            ></AgGridColumn>
          ))}
        </AgGridReact>
      );
    };
  }
}
