import React, { FC, useEffect, useState } from 'react';

import { TableComponent } from './table-builder';


interface Props {
    Table: TableComponent
}

const RandomPageWithAPropsAndXhr: FC<Props> = ({ Table }) => {
    const [rowData, setRowData] = useState([]);
        
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, []);


    return (
        <div className="ag-theme-alpine" style={ { height: 400, width: '800px', margin: 'auto', paddingTop: '50px' } }>
            <Table rowData={rowData} />
        </div>
    )
}

export {
    RandomPageWithAPropsAndXhr,
}