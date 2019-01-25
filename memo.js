// GLOBAL VARIABLES
var validation
var clicks = 0
var firstClick
var secondClick
var tried = 0
var found = 0 
var rank 
var triedTotal = 0
var level
//ARRAY IMG
var image = [
    'img/alce.jpg',
    'img/epelante.jpg',
    'img/nena.jpg',
    'img/peces.jpg',
    'img/unichancho.jpg',
    'img/zapas.jpg',
    'img/alce.jpg',
    'img/epelante.jpg',
    'img/nena.jpg',
    'img/peces.jpg',
    'img/unichancho.jpg',
    'img/zapas.jpg'
];

// VALIDATION NAME 
//Remove formulario and Add Board
$('.level').on('click', function(){
    validation = $('#name').val();                              //Guardo una var el valor que el user coloco en el campo nombre
    var alertEmpty = 'Tu Nombre es Requerido';                  //Agrego una var con el msj para mostrar en caso de que el campo nombre esta vacio
    if (validation == ""){                                      //Valido si el campo nombre esta vacio
        $('.formulario').append(`<p>${alertEmpty}</p>`);        //Apendeo mi msj de alerta
    }else{
        $('.formulario').addClass('hide')
        $('.boardTable').removeClass('hide')
        $('#nameUser').append(`<span class="blue"> ${validation}</span>`)
        
    }
})

//FUNCTION SHUFFLE
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

//CALL OF MESSY
const messy = shuffle(image)

//TRANSITION OF CARD
$('.transition').on('click', function(e) {
    $(this).addClass('efect'); 
    const imgId = e.target.id
    const id = $('#' + imgId).attr('data-id')
    $('#' + imgId).attr('src', messy[id - 1])
  })

//COMPARATION
  $('img').on('click', function(){
      clicks=clicks + 1
      console.log(clicks)
      if (clicks == 1){
        var id = $(this).attr('id')
        var img = $(this).attr('src')
        firstClick ={
            id: id,
            img: img
        }
      }else if(clicks == 2){
        var id2 = $(this).attr('id')
        var img2 = $(this).attr('src')
        tried = tried + 1
        $('.tried').html('<span> Intentos ' + tried + '</span>')
        secondClick ={
            id: id2,
            img: img2
        }
          if(firstClick.img == secondClick.img){
            console.log('iguales')
            $('#' + firstClick.id).addClass('same')
            $('#' + secondClick.id).addClass('same')
            found = found + 1
            clicks=0
            $('.same').unbind();
            console.log(tried, triedTotal)
            
          }else {
              setTimeout(function(){
                $('#' + firstClick.id ).attr('src','img/tapada.jpg').removeClass('efect')
                $('#' + secondClick.id ).attr('src','img/tapada.jpg').removeClass('efect')
                clicks=0
              }, 1000)
          }
          if (found === 6){
            $('.modal')
           .append(`
           <div>GANASTE! <i class="em em-clinking_glasses"></i>
           con <span class="blue">${tried}</span> Intentos.
           <br>
           Ya podés volver a jugar
           <br>
           <button class="boton" onclick="reloader()">VOLVER A JUGAR</button>
           </div>
           `)
           .removeClass('hide')
           ranking()
            
        }else if (tried == triedTotal){
           $('.modal')
           .append(`
           <div>PERDISTE! <i class="em em-sob"></i>
           con ${tried} Intentos.
           <br>
           Ya podés volver a jugar
           <br>
           <button class="boton" onclick="reloader()">VOLVER A JUGAR</button>
           </div>
           `)
           .removeClass('hide')
        }
      }
  })

//   FUNCTION RELOAD GAME
function reloader() {
    location.reload();
}

  //Level EASY    
  $('#easy').on('click', function(){
      triedTotal= 18
      level= 'FACIL'
      $('#intentos').append(`<span class="blue">${triedTotal} INTENTOS</span>`)
      $('#level').append(level)
  })
  
  //Level MEDIUM
  $('#medium').on('click', function(){
      level= 'INTERMEDIO'
      triedTotal= 12
      $('#intentos').append(`<span class="blue">${triedTotal} INTENTOS</span>`)
      $('#level').append(level)
  })
  
  //Level Hard
  $('#hard').on('click', function(){
      level= 'DIFICIL'
      triedTotal= 9
      $('#intentos').append(`<span class="blue">${triedTotal} INTENTOS</span>`)
      $('#level').append(level)
  })

//   RANKING
    var arrRank = JSON.parse(localStorage.getItem("infoRank"))
    function ranking(){
        rank ={
            name: $('#name').val(),
            level: level,
            tries: tried
        }
        if (arrRank == null){
            arrRank = []
        }
        arrRank.push(rank)
        localStorage.setItem("infoRank", JSON.stringify(arrRank))
        for (var i=0; i< arrRank.length; i++){
            $('#tab').append(`
                <tr>
                    <td>${arrRank[i].name}</td>
                    <td>${arrRank[i].level}</td>
                    <td>${arrRank[i].tries}</td>
                </tr>
             `)
             }
    }
