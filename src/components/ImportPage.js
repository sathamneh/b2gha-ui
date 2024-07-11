import React, { useState } from 'react';
import styled from 'styled-components';

const Tab = styled.button`
  padding: 10px;
  margin-right: 10px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;

  &.active {
    border-color: #007bff;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

const ImportPage = () => {
    const [activeTab, setActiveTab] = useState('local');
    const [selectedFolder, setSelectedFolder] = useState('');

    const handleFolderChange = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFolder(event.target.files[0].webkitRelativePath.split('/')[0]);
        }
    };

    return (
        <div>
            <h1>Import New Repository</h1>
            <div>
                <Tab
                    className={activeTab === 'local' ? 'active' : ''}
                    onClick={() => setActiveTab('local')}
                >
                    Local
                </Tab>
                <Tab
                    className={activeTab === 'github' ? 'active' : ''}
                    onClick={() => setActiveTab('github')}
                >
                    GitHub Repo
                </Tab>
            </div>
            <TabContent>
                {activeTab === 'local' ? (
                    <div>
                        <p>Select a folder to import:</p>
                        <input
                            type="file"
                            webkitdirectory="true"
                            directory="true"
                            onChange={handleFolderChange}
                        />
                        {selectedFolder && <p>Selected Folder: {selectedFolder}</p>}
                    </div>
                ) : (
                    <div>
                        <p>Import from GitHub...</p>
                        {/* Form or instructions to import from GitHub */}
                    </div>
                )}
            </TabContent>
        </div>
    );
};

export default ImportPage;
