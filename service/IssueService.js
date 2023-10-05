const fs = require('fs')
const ISSUE_FILE_PATH = './data/issue.json';

const computeNextId = (issues) => {
    return issues.length > 0 ? issues[issues.length - 1].id + 1 : 1;
} 

const getIssues = () => {
    const data = fs.readFileSync(ISSUE_FILE_PATH, 'utf8');

    return JSON.parse(data);
}

const createIssue = (newIssue) => {
    // TODO validate input data 
    const issues = getIssues();
    const issue = {id: computeNextId(issues), ...newIssue};
    issues.push(issue);

    fs.writeFileSync(ISSUE_FILE_PATH, JSON.stringify(issues));
    return issue;
}

const updateIssue = (issueId, updatedIssue) => {
    const issues = getIssues();
    const indexToUpdate = issues.findIndex(issue => issue.id == issueId);
    const issue = {id: Number.parseInt(issueId), ...updatedIssue};
    issues[indexToUpdate] = issue;

    fs.writeFileSync(ISSUE_FILE_PATH, JSON.stringify(issues));
    return issue;
}

const deleteIssue = (issueId) => {
    const issues = getIssues();
    const indexToDelete = issues.findIndex(issue => issue.id == issueId);
    issues.splice(indexToDelete, 1);

    fs.writeFileSync(ISSUE_FILE_PATH, JSON.stringify(issues));
}

module.exports = {
    getIssues,
    createIssue,
    updateIssue,
    deleteIssue
}