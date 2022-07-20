const newFormHandler = async (event) => {
    event.preventDefault();
    
var med_id = document.getElementById('s1').value;
console.log('------------------------------------------',med_id);    

const comment = document.querySelector('#comment-submit').value.trim();
    if (comment) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ comment,med_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/med/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-comemnt-form')
    .addEventListener('submit', newFormHandler);
