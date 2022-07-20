

const newFormHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector('#password').value.trim();
  const password_confirm = document.querySelector('#password-confirm').value.trim();
  const id = parseInt(document.activeElement.value.trim());
  // const id = event.target.getAttribute("data-id");
  console.log('--------------------------------------',id);

  if ((password === password_confirm)&& password && password_confirm) {
    const response = await fetch(`/api/users/${password}`, {
      method: 'PUT',
      body: JSON.stringify({ id,password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/userslist');
    } else {
      alert('Failed to reset password!');
    }
  }else{
    alert('please enter your passwords again!');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/userslist');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.user-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.user-del')
  .addEventListener('click', delButtonHandler);
