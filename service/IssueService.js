const fs = require('fs')
const ISSUE_FILE_PATH = './data/issue.json';

const computeNextId = (issues) => {
    return issues.length > 0 ? issues[issues.length - 1].id + 1 : 1;
} 

const getIssues = () => {
    const data = fs.readFileSync(ISSUE_FILE_PATH, 'utf8');

    return JSON.parse(data);
}

const createIssue = (title, description) => {
    // TODO validate input data 
    const issues = getIssues();
    const issue = {
        "id": computeNextId(issues),
        "title": title,
        "description": description
    }
    issues.push(issue);

    fs.writeFileSync(ISSUE_FILE_PATH, JSON.stringify(issues));
}

const updateIssue = (issueId, updatedIssue) => {
    const issues = getIssues();
    const indexToUpdate = issues.findIndex(issue => issue.id == issueId);
    issues[indexToUpdate] = updatedIssue;

    fs.writeFileSync(ISSUE_FILE_PATH, JSON.stringify(issues));
}

const deleteIssues = (issueId) => {
    const issues = getIssues();
    const issuesToKeep = issues.filter(issue => !issueId.includes(issue.id));

    fs.writeFileSync(ISSUE_FILE_PATH, JSON.stringify(issuesToKeep));
}

module.exports = {
    getIssues,
    createIssue
}