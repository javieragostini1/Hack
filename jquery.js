var porcentaje = 0.3;

function listenEvents() {

  $(".slider").on("change", function(event) {
    $(".display").text(event.target.value)
    porcentaje = event.target.value / 100
    borrar()
    algoritmo()
  })

  $(".reservar-btn").on("click", function(event){
    if(confirm("Confirma tus lugares")){
      txt = "Tus lugares han quedado confirmados"
      $(".usuario-reservado-grid-on").removeClass("usuario-reservado-grid-on").addClass("usuario-reservado-grid")
    }
    else{
      txt = "Se ha cancelado tu reservacion"
      $(".usuario-reservado-grid-on").removeClass("usuario-reservado-grid-on").addClass("usuario-disponible-grid")
    }
  })

  $(document).on("click",".usuario-disponible-grid", function(event) {
    $(this).removeClass("usuario-disponible-grid").addClass("usuario-reservado-grid-on")
  })

  $(".hamburger").on("click", function(event){
    $("#navbarSupportedContent").toggle(1000);
  })
}



function grid() {
  for (i = 1; i <= 11; i++) {
    for (j = 0; j < 10; j++) {
      if (i == 1 && j == 0) {
        $("#grid-container").append("<div class = 'grid-item' id = 'item-1'></div>");
        break
      } else {
        $("#grid-container").append("<div class = 'grid-item' id = 'item-" + (i - 2) + "-" + j + "'></div>");
      }
    }
  }
}

function borrar() {
  $(".grid-item").children().remove()
}

function llenaVacios(rows, cols) {
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      if ($("#item-" + i + "-" + j).children().length == 0) {
        $("#item-" + i + "-" + j).append("<i class='fas fa-times-circle fa-2x icono-no-disponible-grid'></i>")
      }
    }
  }
}

function algoritmo() {
  var rows = 10;
  var cols = 10;
  var k = 0;

  var disponibles = [];
  var contNuevo = 0;

  var total = rows * cols;
  var capacidad = total * porcentaje;

  var coef = (cols / ((total * porcentaje) / rows));
  var salto = Math.floor(coef);

  var cont = 1;
  var contAsientos = 0;

  if (salto < 3) {
    for (i = 0; i < rows; i++) {
      for (j = 0; j < cols; j++) {
        $("#item-" + i + "-" + j).append("<i class='fas fa-times-circle fa-2x icono-no-disponible-grid'></i>")
      }
    }
  } else {
    if (salto >= 3) {
      for (i = 0; i < rows; i++) {
        cont -= 1;
        for (j = cont; j < cols; j += salto) {
          if (contAsientos < capacidad) {
            contAsientos += 1;
            $("#item-" + i + "-" + j).append("<i class='fas fa-user fa-2x usuario-disponible-grid'></i>")
          }
        }

        if (cont == 0) {
          cont = 3;
        }
      }
    }
  }
  llenaVacios(rows, cols);

}

grid();

algoritmo();
