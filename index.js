const express = require('express');
const bodyParser = require('body-parser');
const { getIssues, createIssue, deleteIssue, updateIssue } = require('./service/IssueService');
const ISSUE_FILE_PATH = './data/issue.json';

const app = express();
const port = 3000;
const jsonParser = bodyParser.json();

// APIs
app.get('/issues', (request, response) => {
  const issues = getIssues();
  response.status(202).json(issues);
})

app.post('/issue', jsonParser, (request, response) => {
  try {
    const issue = createIssue(request.body); 
    response.status(201).json(issue).send('Issue has been created');
  } catch (error) {
    response.status(error.status || 500).send(error.message || 'Error');
  }
});

app.post('/issue/:id', jsonParser, (request, response) => {
  try {
    const issue = updateIssue(request.params.id, request.body); 
    response.status(201).json(issue).send('Issue has been updated');
  } catch (error) {
    response.status(error.status || 500).send(error.message || 'Error');
  }
});

app.delete('/issue/:id', (request, response) => {
  try {
    deleteIssue(request.params.id);
    response.status(201).send('Issue has been deleted');
  } catch (error) {
    response.status(error.status || 500).send(error.message || 'Error');
  }
})

// Client
app.get('/script.js', (request, response) => {
  response.setHeader('Content-Type', 'application/javascript');
  response.sendFile(__dirname + '/client/script.js');
});


app.get('/style.css', (request, response) => {
  response.setHeader('Content-Type', 'text/css');
  response.sendFile(__dirname + '/client/style.css');
});



app.get('/', (request, response) => {
  response.sendFile(__dirname + '/client/index.html');
});

const listener = app.listen(port, function () {
  console.log('App is listening on port ' + listener.address().port);
});