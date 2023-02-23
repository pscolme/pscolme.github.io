
// Haciendo una petición a la API usando fetch
fetch('http://localhost:3001/users')
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error en la petición');
  })
  .then(data => fillTable(data))
  .catch(error => console.error(error));

// Función para rellenar la tabla HTML
function fillTable(data) {
  console.log(data)
  const table = document.getElementById('tableClientes');
  data.forEach(item => {
    const row = document.createElement('tr');
    const useridCell = document.createElement('td');
    useridCell.textContent = item.userid;
    row.appendChild(useridCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const surnameCell = document.createElement('td');
    surnameCell.textContent = item.surname;
    row.appendChild(surnameCell);

    const dniCell = document.createElement('td');
    dniCell.textContent = item.dni;
    row.appendChild(dniCell);

    const addressCell = document.createElement('td');
    addressCell.textContent = item.address;
    row.appendChild(addressCell);

    const cityCell = document.createElement('td');
    cityCell.textContent = item.city;
    row.appendChild(cityCell);

    const provinceCell = document.createElement('td');
    provinceCell.textContent = item.province;
    row.appendChild(provinceCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = item.phone;
    row.appendChild(phoneCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = item.email;
    row.appendChild(emailCell);
    table.appendChild(row);
  });
}
