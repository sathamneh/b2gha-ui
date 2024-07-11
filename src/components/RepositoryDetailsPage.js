import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Graph from 'react-graph-vis';
import styled from 'styled-components';
import NavBar from './NavBar';
import CommitTable from './CommitTable';
import CommitGrid from './CommitGrid';
import { Pie, Line } from 'react-chartjs-2';
import ContributorsTable from './ContributorsTable';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import 'chart.js/auto';
import moment from 'moment';

ChartJS.register(ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-bottom: 3px solid transparent;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #555;

  &:hover, &.active {
    border-bottom-color: #007bff;
    color: #007bff;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
`;



const InfoTile = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const TileLabel = styled.span`
  font-weight: bold;
`;

const TileValue = styled.span`
  margin-left: 5px;
`;

const RepositoryDetailsPage = () => {
    const { id } = useParams();
    const [repository, setRepository] = useState(null);
    const [activeTab, setActiveTab] = useState('General Info');
    const [faqQuestions, setFaqQuestions] = useState([
        'What is the purpose of this repository?',
        'How often is this repository updated?',
        'Who are the main contributors to this repository?',
    ]);
    const [newQuestion, setNewQuestion] = useState('');
    const [questionHistory, setQuestionHistory] = useState([]);

    useEffect(() => {
        // Mock API call to fetch repository details
        const fetchRepositoryDetails = async () => {
            const mockRepository = {
                id: 1,
                name: 'Repo 1',
                description: 'Description for Repo 1',
                creationDate: '2023-01-01',
                lastUpdate: '2023-10-01',
                forked: false,
                archived: false,
                languages: { py: '54.55%', css: '9.09%', gitignore: '9.09%', html: '9.09%', md: '9.09%', txt: '9.09%' },
                totalCommits: 3,
                firstCommit: { message: 'initial commit - working version', date: 'Tue, 18 Jun 2024 04:37:38 GMT', author: 'Suheel Athamneh' },
                lastCommit: { message: 'update ollama functionality/ui', date: 'Tue, 18 Jun 2024 17:05:35 GMT', author: 'Suheel Athamneh' },
                totalPullRequests: 0,
                openPullRequests: 0,
                closedPullRequests: 0,
                totalIssues: 0,
                openIssues: 0,
                closedIssues: 0,
                topContributors: [
                    { name: 'Suheel Athamneh', contributions: 3 },
                    { name: 'Some one Else', contributions: 2 },
                    { name: 'unknown', contributions: 1 },
                ],
                commits: [
                    { id: 1, message: 'initial commit', date: 'Tue, 18 Jun 2024 04:37:38 GMT', author: 'Suheel Athamneh', filesChanged: 1 },
                    { id: 2, message: 'update ollama functionality/ui', date: 'Tue, 18 Jun 2024 17:05:35 GMT', author: 'Suheel Athamneh', filesChanged: 2 },
                ],
                codeGraph: {
                    nodes: [
                        { id: 1, label: 'File1.py', group: 'files' },
                        { id: 2, label: 'File2.css', group: 'files' },
                        { id: 3, label: 'File3.html', group: 'files' },
                        { id: 4, label: 'function1()', group: 'functions', parentId: 1 },
                        { id: 5, label: 'function2()', group: 'functions', parentId: 1 },
                        { id: 6, label: 'styleBlock1', group: 'functions', parentId: 2 },
                        { id: 7, label: 'markup1()', group: 'functions', parentId: 3 },
                    ],
                    edges: [
                        { from: 4, to: 5, arrows: 'to', label: 'calls' },
                        { from: 4, to: 6, arrows: 'to', label: 'applies styles' },
                        { from: 7, to: 4, arrows: 'to', label: 'uses function' }
                    ],
                },
            };
            setRepository(mockRepository);
        };

        fetchRepositoryDetails();
    }, [id]);

    if (!repository) {
        return <Container>Loading...</Container>;
    }

    const handleAskQuestion = () => {
        if (newQuestion.trim()) {
            const newEntry = { question: newQuestion, answer: 'Answer will appear here' };
            setQuestionHistory([...questionHistory, newEntry]);
            setNewQuestion('');
        }
    };
    const data = {
        labels: Object.keys(repository.languages),
        datasets: [
            {
                data: Object.values(repository.languages).map(lang => lang.percentage),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0']
            }
        ]
    };
    const prepareChartData = (commits) => {

        const sortedCommits = commits.sort((a, b) => new Date(a.date) - new Date(b.date));
        return {
            labels: sortedCommits.map(commit => moment(commit.date).format('YYYY-MM-DD')),
            datasets: [{
                label: 'Commits Over Time',
                data: sortedCommits.map((commit, index) => ({ x: moment(commit.date).format('YYYY-MM-DD'), y: index + 1 })),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true,
                tension: 0.1
            }]
        };
    };
    const handleFaqClick = (question) => {
        setNewQuestion(question);
    };
    const renderTabContent = () => {
        switch (activeTab) {
            case 'General Info':
                return (
                    <div>
                        <TileContainer>
                            <InfoTile><TileLabel>Description:</TileLabel><TileValue>{repository.description}</TileValue></InfoTile>
                            <InfoTile><TileLabel>Creation Date:</TileLabel><TileValue>{repository.creationDate}</TileValue></InfoTile>
                            <InfoTile><TileLabel>Last Update:</TileLabel><TileValue>{repository.lastUpdate}</TileValue></InfoTile>
                            <InfoTile><TileLabel>Forked:</TileLabel><TileValue>{repository.forked ? 'Yes' : 'No'}</TileValue></InfoTile>
                            <InfoTile><TileLabel>Archived:</TileLabel><TileValue>{repository.archived ? 'Yes' : 'No'}</TileValue></InfoTile>
                            <InfoTile><TileLabel>Total Commits:</TileLabel><TileValue>{repository.totalCommits}</TileValue></InfoTile>
                            <InfoTile><TileLabel>Total Pull Requests:</TileLabel><TileValue>{repository.totalPullRequests}</TileValue></InfoTile>
                            <InfoTile><TileLabel>Total Issues:</TileLabel><TileValue>{repository.totalIssues}</TileValue></InfoTile>
                            <InfoTile>
                                <TileLabel>Languages:</TileLabel>
                                <Pie data={data} />
                            </InfoTile>
                            <InfoTile>
                                <TileLabel>Top Contributors:</TileLabel>
                                <ul>
                                    {repository.topContributors.map((contributor, index) => (
                                        <li key={index}>{contributor.name}: {contributor.contributions} contributions</li>
                                    ))}
                                </ul>
                            </InfoTile>
                        </TileContainer>
                    </div>
                );
            case 'Commits':
                return <CommitTable commits={repository.commits} />;
            case 'Contributors':
                return <ContributorsTable contributors={repository.contributors} />;
            case 'CodeGraph':
                return (
                    <div style={{ height: '500px' }}>
                        <Graph
                            graph={repository.codeGraph}
                            options={{
                                layout: {
                                    hierarchical: false,
                                },
                                edges: {
                                    color: '#000000',
                                },
                                height: '100%',
                            }}
                            events={{
                                select: function (event) {
                                    const { nodes, edges } = event;
                                }
                            }}
                        />
                    </div>
                );
            case 'Ask':
                return (
                    <div>
                        <h3>FAQs</h3>
                        <ul>
                            {faqQuestions.map((question, index) => (
                                <li key={index}>
                                    <button onClick={() => handleFaqClick(question)}>{question}</button>
                                </li>
                            ))}
                        </ul>
                        <h3>Ask a New Question</h3>
                        <input
                            type="text"
                            value={newQuestion}
                            onChange={e => setNewQuestion(e.target.value)}
                            placeholder="Type your question here"
                        />
                        <button onClick={handleAskQuestion}>Ask</button>
                        <h3>Question History</h3>
                        <ul>
                            {questionHistory.map((entry, index) => (
                                <li key={index}>
                                    <strong>Q: {entry.question}</strong>
                                    <p>A: {entry.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Container>
            <NavBar />
            <Header>{repository.name}</Header>
            <div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {['General Info', 'Commits', 'Contributors', 'CodeGraph', 'Ask'].map(tab => (
                        <TabButton
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={activeTab === tab ? 'active' : ''}
                        >
                            {tab}
                        </TabButton>
                    ))}
                </div>
                <TabContent>
                    {renderTabContent()}
                </TabContent>
            </div>
        </Container>
    );
};

export default RepositoryDetailsPage;

