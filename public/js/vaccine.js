const newFormHandler = async (event) => {
  event.preventDefault();

  const med_name = document.querySelector('#vac-name').value.trim();
  const med_detail = document.querySelector('#vac-detail').value.trim();
  const type_of_vaccin = document.querySelector('#vac-type').value.trim();
  const made_by = document.querySelector('#vac-made').value.trim();
  const approved_in = document.querySelector('#vac-approve').value.trim();
  const approval_source = document.querySelector('#vac-source').value.trim();


  if (med_name && med_detail && type_of_vaccin && made_by && approved_in && approval_source) {
    const response = await fetch(`/api/med`, {
      method: 'POST',
      body: JSON.stringify({med_name, med_detail, type_of_vaccin, made_by, approved_in, approval_source }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/vaccines');
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('.new-vaccine-form')
  .addEventListener('submit', newFormHandler);

