const newFormHandler = async (event) => {
  event.preventDefault();


  const comment = document.querySelector('#comment-submit').value.trim();
  const ratingSelected = document.querySelector('#med-rating');
  const rating = ratingSelected.options[ratingSelected.selectedIndex].value;
  const med_id = document.querySelector('#submit-comment')

  if (comment) {
    const meds_id = document.location.pathname.split('/').pop();
    console.log("Med ID:", meds_id)
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify(
        {
          comment,
          rating,
          med_id: meds_id
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
  .querySelector('#comment-form')
  .addEventListener('submit', newFormHandler);
