import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
};

const ExpandedComponent = ({ data }) => (
    <div>
        <p><strong>Date:</strong> {new Date(data.date).toLocaleString()}</p>
        <p><strong>Author:</strong> {data.author}</p>
        <p><strong>Files Changed:</strong> {data.filesChanged} files</p>
        {data.details && <p><strong>Details:</strong> {data.details}</p>}
    </div>
);

const CommitTable = ({ commits }) => {
    const columns = [
        {
            name: 'Commit Message',
            selector: row => row.message,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Author',
            selector: row => row.author,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleDateString(),
            sortable: true,
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={commits}
            customStyles={customStyles}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
        />
    );
};

export default CommitTable;
