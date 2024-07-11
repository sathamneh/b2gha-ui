import React, { useState } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  margin: 20px;
`;

const GridItem = styled.div`
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const CommitGrid = ({ commits }) => {
    return (
        <GridContainer>
            {commits.map(commit => (
                <CommitRow key={commit.id} commit={commit} />
            ))}
        </GridContainer>
    );
};

const CommitRow = ({ commit }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <GridItem onClick={() => setIsExpanded(!isExpanded)}>
            <p><strong>Commit Message:</strong> {commit.message}</p>
            <p><strong>User/Date:</strong> {commit.author} / {new Date(commit.date).toLocaleDateString()}</p>
            {isExpanded && (
                <div>
                    <p><strong>Date:</strong> {new Date(commit.date).toLocaleString()}</p>
                    <p><strong>Author:</strong> {commit.author}</p>
                    <p><strong>Files Changed:</strong> {commit.filesChanged} files</p>
                    {commit.details && <p><strong>Details:</strong> {commit.details}</p>}
                </div>
            )}
        </GridItem>
    );
};

export default CommitGrid;  