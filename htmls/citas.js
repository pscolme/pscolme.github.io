const select = document.querySelector('.selector');
const iframe = document.querySelector('.iMes');
localStorage.setItem("currentMonth", 1);

select.addEventListener('change', function() {
  const monthNumber = this.value.split(',')[0]
  const monthPath = this.value.split(',')[1]
  iframe.src = monthPath;
  localStorage.setItem("currentMonth", monthNumber);
});

fetch('http://localhost:3001/users')
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error en la petición');
  })
  .then(data => saveUsersInLocalStorage(data))
  .catch(error => console.error(error));

// Función para rellenar la tabla HTML
function saveUsersInLocalStorage(data) {
    console.log(data)
    localStorage.setItem("users", JSON.stringify(data));
}