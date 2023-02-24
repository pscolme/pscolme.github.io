// Guardando una variable en el almacenamiento local
let item = document.getElementById("button");

item.addEventListener("click", function() {
    // Crea un objeto con los datos que deseas enviar en la petición POST
    let data = {
        name: document.getElementById("nameID").value,
        surname: document.getElementById("surnameID").value,
        dni: document.getElementById("dniID").value,
        phone: document.getElementById("phoneID").value,
        email: document.getElementById("emailID").value,
        address: document.getElementById("addressID").value,
        city: document.getElementById("cityID").value,
        province: document.getElementById("provinceID").value
    };
  
    // Convierte el objeto a un formato JSON
    let jsonData = JSON.stringify(data);
  
    // Ejecuta la función fetch y envía los datos
    fetch('http://localhost:3001/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        console.log('Success:', JSON.stringify(response))
        let users = JSON.parse(localStorage.getItem('users'))
        users.push(data)
        localStorage.setItem("users", JSON.stringify(users));
    })
    .catch(error => console.error('Error:', error));

    let iframe = document.querySelector("#contenedor9");
    iframe.remove()
});

// Guardando una variable en el almacenamiento local
let cancelButton = document.getElementById("cancelButton");

cancelButton.addEventListener("click", function() {
    let iframe = document.querySelector("#contenedor9");
    iframe.remove()
});