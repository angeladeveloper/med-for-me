

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/med/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/vaccines');
      } else {
        alert('Failed to delete project');
      }
    }
  };

document
  .querySelector('.vaccine-list')
  .addEventListener('click', delButtonHandler);