
document.addEventListener('DOMContentLoaded', () => {
    const issueList = document.getElementById('issue-list');
   // const issueForm = document.getElementById('issue-form');

   /** 
    issueForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');

        const newIssue = {
            title: titleInput.value,
            description: descriptionInput.value
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
            const section = document.createElement('section');

            const title = document.createElement('div');
            title.textContent = issue.title;
            section.appendChild(title);

            const description = document.createElement('div');
            description.textContent = issue.description;
            section.appendChild(description);

            issueList.appendChild(section);
            
            // Clear form fields
            titleInput.value = '';
            descriptionInput.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
         
        });
    });
    */

    fetch('/issues')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error while retrieving issues');
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((issue) => {
                const section = document.createElement('section');

                const title = document.createElement('div');
                title.textContent = issue.title;
                section.appendChild(title);

                const description = document.createElement('div');
                description.textContent = issue.description;
                section.appendChild(description);

                issueList.appendChild(section);
            });   
        })
        .catch((error) => {
            console.error('Error:', error);
            const errorLi = document.createElement('li');
            errorLi.textContent = 'Error fetching issues.';
            issueList.appendChild(errorLi);
        });
});