const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const { getIssues, createIssue } = require('./service/IssueService');
const ISSUE_FILE_PATH = './data/issue.json';

const app = express();
const port = 3000;

app.use(bodyParser()); // TODO replace deprecated parser
var jsonParser = bodyParser.json()

// APIs
app.get('/issues', (request, response) => {
  const issues = getIssues();
  response.status(202).json(issues);
})

app.post('/issue', jsonParser, (request, response) => {
  try {
    createIssue(request.body.title, request.body.description); 
    response.status(201).send('Issue has been created');
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).send(error.message || 'Error');
  }
});

// Client
app.get('/script.js', (request, response) => {
  response.setHeader('Content-Type', 'application/javascript');
  response.sendFile(__dirname + '/client/script.js');
});


app.get('/', (request, response) => {
  response.sendFile(__dirname + '/client/index.html');
});

const listener = app.listen(port, function () {
  console.log('App is listening on port ' + listener.address().port);
});