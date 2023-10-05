const issueList = document.getElementById('issue-list');
const issueForm = document.getElementById('issue-form');

const displayIssue = (issue) => {
    const section = document.createElement('section');
    section.id = `issue-${issue.id}`;
    section.style = 'margin-top:13px;'

    const title = document.createElement('div');
    title.style = 'font-weight:bold'
    title.textContent = issue.title;
    section.appendChild(title);

    const description = document.createElement('div');
    description.textContent = issue.description;
    section.appendChild(description);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteIssue(issue.id);
    });
    section.appendChild(deleteButton);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => {
        switchToEditMode(issue.id, issue.title, issue.description);
    });
    section.appendChild(updateButton);

    issueList.appendChild(section);
}

const loadData = () => {
    fetch('/issues')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error while retrieving issues');
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((issue) => {
                displayIssue(issue);
            });   
        })
        .catch((error) => {
            console.error('Error:', error);
            const errorLi = document.createElement('li');
            errorLi.textContent = 'Error fetching issues.';
            issueList.appendChild(errorLi);
        });
}

const addIssue = (title, description) => {
    const newIssue = {
        title,
        description
    };

    fetch('/issue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newIssue)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error while adding issue');
        }
        return response.json();
    })
    .then((issue) => {
        displayIssue(issue);
    })
    .catch((error) => {
        console.error('Error:', error);
     
    });
}

const deleteIssue = (id) => {
    fetch(`/issue/${id}`, {
        method: 'DELETE'
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .then(() => {
        const issueItem = document.getElementById(`issue-${id}`);
        if (issueItem) {
            issueItem.remove();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const switchToEditMode = (id, title, description) => {
    const editForm = document.createElement('form');
    editForm.id = `edit-form-${id}`;
    
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = title;
    titleLabel.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = description;
    descriptionLabel.appendChild(descriptionInput);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        const updatedTitle = titleInput.value;
        const updatedDescription = descriptionInput.value;
        saveChanges(id, updatedTitle, updatedDescription);
    });

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        exitEditMode();
    });

    editForm.appendChild(titleLabel);
    editForm.appendChild(descriptionLabel);
    editForm.appendChild(saveButton);
    editForm.appendChild(cancelButton);

    const issueSection = document.getElementById(`issue-${id}`);
    issueSection.innerHTML = ''; // Clear the issue section
    issueSection.appendChild(editForm);
};

const saveChanges = (id, title, description) => {
    const newIssue = {
        title,
        description
    };

    fetch(`/issue/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newIssue)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error while adding issue');
        }
        return response.json();
    })
    .then((issue) => {
        exitEditMode(issue)
    })
    .catch((error) => {
        console.error('Error:', error);
     
    });
    exitEditMode();
};

const exitEditMode = (issue) => {
    if(issue){
        const section = document.getElementById(`issue-${issue.id}`);
        section.innerHTML = ''; // Clear the issue section
         
        const title = document.createElement('div');
        title.textContent = issue.title;
        section.appendChild(title);
    
        const description = document.createElement('div');
        description.textContent = issue.description;
        section.appendChild(description);
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteIssue(issue.id);
        });
        section.appendChild(deleteButton);
    
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => {
            switchToEditMode(issue.id, issue.title, issue.description);
        });
        section.appendChild(updateButton);
    } else {
        loadData();
    }
   
};

document.addEventListener('DOMContentLoaded', () => {

    loadData();

    issueForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');

        addIssue(titleInput.value, descriptionInput.value)
                
        titleInput.value = '';
        descriptionInput.value = '';
        
    });

});