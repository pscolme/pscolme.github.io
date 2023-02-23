// Guardando una variable en el almacenamiento local
let data = document.getElementsByClassName("day");

Array.prototype.forEach.call(data, function(item) {
  item.addEventListener("click", function() {
      console.log('Elemento clickado')
      localStorage.setItem("currentDate", this.innerText);
    });
});