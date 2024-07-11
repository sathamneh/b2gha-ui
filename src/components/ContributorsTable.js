import React from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
        }
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        }
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        }
    },
};

const ExpandedContributorDetails = ({ data }) => (
    <div>
        <p><strong>Contributions:</strong></p>
        {data.contributions.map((contribution, index) => (
            <div key={index}>
                <p>{contribution.description}</p>
                <p>Date: {new Date(contribution.date).toLocaleDateString()}</p>
            </div>
        ))}
    </div>
);

const ContributorsTable = ({ contributors }) => {
    const columns = [
        {
            name: 'Contributor',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Total Contributions',
            selector: row => row.contributions.length,
            sortable: true,
            right: true,
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={contributors}
            customStyles={customStyles}
            expandableRows
            expandableRowsComponent={ExpandedContributorDetails}
            pagination
        />
    );
};

export default ContributorsTable;
