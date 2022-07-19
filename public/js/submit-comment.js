const newFormHandler = async (event) => {
  event.preventDefault();


  const comment = document.querySelector('#comment-submit').value.trim();
  const ratingSelected = document.querySelector('#med-rating');
  const rating = ratingSelected.options[ratingSelected.selectedIndex].value;
  const med_id = document.querySelector('#submit-comment')
  console.log(med_id.getAttribute('data-med-id'))

  if (comment) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify(
        {
          comment,
          rating,
        }
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/cms/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};


document
  .querySelector('#comemnt-form')
  .addEventListener('submit', newFormHandler);
