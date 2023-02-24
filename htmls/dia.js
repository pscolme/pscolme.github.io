const datalist = document.getElementById('users-list');
let users = JSON.parse(localStorage.getItem('users'))
users.forEach(user => {
  const option = document.createElement('option');
  option.value = user.name + ' ' + user.surname
  datalist.appendChild(option)
})

function createTable() {
  const table = document.getElementById('tablaCitas');
  const rowHeaders = document.createElement('tr');
  const hourHeader = document.createElement('td');
  hourHeader.textContent = 'HORA';
  hourHeader.className = 'tdHora';
  rowHeaders.appendChild(hourHeader);
  const lauraHeader = document.createElement('td');
  lauraHeader.textContent = 'LAURA';
  lauraHeader.className = 'tdChicas';
  rowHeaders.appendChild(lauraHeader);
  const ferHeader = document.createElement('td');
  ferHeader.textContent = 'FER';
  ferHeader.className = 'tdFer';
  rowHeaders.appendChild(ferHeader);
  const saraHeader = document.createElement('td');
  saraHeader.textContent = 'SARA';
  saraHeader.className = 'tdChicas';
  rowHeaders.appendChild(saraHeader);
  table.appendChild(rowHeaders);

  data = ['9','10','11','12','13','14','15','16','17','18','19','20','21']
  data.forEach(item => {
    const row = document.createElement('tr');
    const hourCell = document.createElement('td');
    hourCell.textContent = item + ':00';
    if(item.length == 1) {
      item = '0' + item
    }
    hourCell.className = 'tdHora';
    row.appendChild(hourCell);

    const lauraCell = document.createElement('td');
    lauraCell.className = 'tdchicas';
    lauraCell.id = 'Laura_' + item;
    row.appendChild(lauraCell);

    const ferCell = document.createElement('td');
    ferCell.className = 'tdfer';
    ferCell.id = 'Fer_' + item;
    row.appendChild(ferCell);
    
    const saraCell = document.createElement('td');
    saraCell.className = 'tdchicas';
    saraCell.id = 'Sara_' + item;
    row.appendChild(saraCell);
    table.appendChild(row);
  });
  clickOnCells()
}

function clickOnCells() {
  const table = document.getElementById('tablaCitas');
  const cells = table.getElementsByTagName('td');

  for (const cell of cells) {
    cell.addEventListener('click', (event) => {
      // check if the clicked cell is in the first row or column
      try {
        if (cell.cellIndex === 0 || cell.parentNode.rowIndex === 0) {
          return;
        }
      } catch (error) {
        
      }

      const previousValue = cell.innerText;
      let previousValueValid = false
      let users = JSON.parse(localStorage.getItem('users'))
      let name = previousValue.split(" ")[0];
      let surname = previousValue.split(" ")[1];
      if (previousValue.split(" ")[2]) {
        surname += " " + previousValue.split(" ")[2];
      }
      users.forEach(user => { 
        if (user.name === name && user.surname === surname) {
          previousValueValid = true
        }
      })
      const originalBgColor = window.getComputedStyle(cell).backgroundColor;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = previousValue;
      console.log('Meto el List')
      input.setAttribute("list", "users-list");
      input.style.width = cell.clientWidth + 'px';
      input.style.height = cell.clientHeight + 'px';
      input.style.backgroundColor = originalBgColor;
      input.style.fontFamily = window.getComputedStyle(cell).fontFamily;
      input.style.fontSize = window.getComputedStyle(cell).fontSize;
      input.style.outline = 'none';
      input.style.border = '0px solid black';
      input.style.textAlign = 'center';
      input.className = cell.className
      input.id = cell.id

      try {
        cell.replaceWith(input);
      } catch (error) {
        console.debug(error);
      }
      input.focus();

      const saveCellValue = () => {
        const newValue = input.value;

        const newCell = document.createElement('td');
        newCell.innerText = newValue;
        newCell.className = input.className
        newCell.id = input.id
        
        try {
          input.replaceWith(newCell);
          // SI hay texto
          if (newCell.innerText) {
            if (previousValueValid) {
              removeCita(newCell)
              saveCita(newCell)
            } else {
              saveCita(newCell)
            }
          // NO hay texto
          } else {
            if (previousValueValid) {
              removeCita(newCell)
            }
          }
        } catch (error) {
          console.debug(error);
        }
      };

      input.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) { // Enter key
          saveCellValue();
          clickOnCells()
        }
      });

      input.addEventListener('blur', () => {
        saveCellValue();
        clickOnCells()
      });
    });
}
}

createTable()


let currentDate = localStorage.getItem("currentDate");
let currentMonth = localStorage.getItem("currentMonth");
if (currentDate.length == 1) {
  currentDate = '0' + currentDate
}
if (currentMonth.length == 1) {
  currentMonth = '0' + currentMonth
}

// Haciendo una petición a la API usando fetch
fetch('http://localhost:3001/citasByDate?date=2023-' + currentMonth + '-' + currentDate)
  .then(response => {
    console.log(response)
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
  data.forEach(item => {
    const fisio = item.fisio
    const hour = item.hour
    const id = fisio + '_' + hour.slice(0, 2)
    console.log(id)

    fetch('http://localhost:3001/usuario?userid='+ item.userid)
    .then(response => {
      console.log(response)
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error en la petición');
    })
    .then(data => fillCell(id, data))
    .catch(error => console.error(error));
  });
}

function fillCell(id, data) {
  data.forEach(item => {
    const cell = document.getElementById(id);
    cell.innerText = item.name + ' ' + item.surname
  })
}

// Función para rellenar la tabla HTML
function saveCita(cell) {
  let name = cell.innerText.split(" ")[0];
  let surname = cell.innerText.split(" ")[1];
  if (cell.innerText.split(" ")[2]) {
    surname += " " + cell.innerText.split(" ")[2];
  }

  const users = JSON.parse(localStorage.getItem('users'))
  let userExists = false
  users.forEach(user => {
    if (user.name === name && user.surname === surname) {
      userExists = true
      data = {
        userid: user.userid,
        date: '2023-' + currentMonth + '-' + currentDate,
        hour: cell.id.split('_')[1] + ':00',
        fisio: cell.id.split('_')[0]
      }
      let jsonData = JSON.stringify(data);
      
      fetch('http://localhost:3001/addCita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }
  })
  if (!userExists){
    alert('No existe el usuario ' + cell.innerText)
    cell.innerText = ''
  }
}

// Función para rellenar la tabla HTML
function removeCita(cell) {
  data = {
    date: '2023-' + currentMonth + '-' + currentDate,
    hour: cell.id.split('_')[1] + ':00',
    fisio: cell.id.split('_')[0]
  }
  let jsonData = JSON.stringify(data);
  
  fetch('http://localhost:3001/removeCita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}