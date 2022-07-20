const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#tags').value.trim();
    if (name) {
      const response = await fetch(`/api/users/${name}`, {
        method: 'GET',
        //body: JSON.stringify({name}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('ok');
        document.location.replace(`/api/users/${name}`);
      } else {
        alert('Error to search!');
      }
    }
  };
  
  document
    .querySelector('.usersearch')
    .addEventListener('submit', newFormHandler);
  
  