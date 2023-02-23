function filterFunction() {
  // Obtener el valor del input
  var input, field, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterInput");
  field = Number(document.getElementById("filtro").value);
  filter = input.value.toUpperCase();

  // usamos el iframe para acceder al objeto document de Pagina1.html
  var iframeDocument = document.getElementById('iClientes').contentDocument;
  table = document.getElementById("iClientes").contentWindow.document.getElementById("tableClientes");
  table = iframeDocument.getElementById("tableClientes");
  tr = table.getElementsByTagName("tr");

  // Recorrer todas las filas y ocultar aquellas que no coincidan con el filtro
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[field];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
