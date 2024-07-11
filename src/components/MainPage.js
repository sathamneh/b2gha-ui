import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './NavBar';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.h1`
  color: #333;
`;

const RepositoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RepositoryItem = styled.li`
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.p`
  color: #666;
`;

const Actions = styled.div`
  button {
    padding: 5px 10px;
    margin-left: 10px;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const MainPage = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Mock API call to fetch repositories
    const fetchRepositories = async () => {
      const mockRepositories = [
        { id: 1, name: 'Repo 1', description: 'Description for Repo 1', lastUpdate: '2024-06-30', commits: 34, contributors: 5 },
        { id: 2, name: 'Repo 2', description: 'Description for Repo 2', lastUpdate: '2024-07-01', commits: 27, contributors: 3 },
      ];
      setRepositories(mockRepositories);
    };

    fetchRepositories();
  }, []);

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <NavBar />
      <Header>Repository Dashboard</Header>
      <SearchInput
        type="text"
        placeholder="Search Repositories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <RepositoryList>
        {filteredRepositories.map(repo => (
          <RepositoryItem key={repo.id}>
            <div>
              <Link to={`/repository/${repo.id}`}>{repo.name}</Link>
              <Description>{repo.description}</Description>
              <small>Last Updated: {repo.lastUpdate}</small>
            </div>
            <Actions>
              <button onClick={() => navigate('/repository/' + repo.id)}>View Details</button>
              <button>Edit</button>
              <button>Delete</button>
            </Actions>
          </RepositoryItem>
        ))}
      </RepositoryList>
      <button onClick={() => navigate('/import')}>Import New Repository</button>

    </Container >
  );
};

export default MainPage;
