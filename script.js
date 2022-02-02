let numeroCartas = 0;

function carregarTelaInicial(){
  let tela = document.querySelector(".tela-inicial");

  for (let i = 0; i < 12; i++ ) {
    tela.innerHTML += "<div class='original face'></div>";
  }
}

carregarTelaInicial();

function pedirNumCartas(){
  return prompt ("Com quantas cartas deseja jogar?");
}

function validarNumeroCartas (){

  let numeroValido = false;
  let numCartasDigitadas = null;

  while (!numeroValido) {

    numCartasDigitadas = parseFloat(numCartasDigitadas);

    if ( typeof(numCartasDigitadas) != "number" || numCartasDigitadas < 4 || numCartasDigitadas > 14 
         || numCartasDigitadas%2 !=0   || !Number.isInteger (numCartasDigitadas) ) {

      numCartasDigitadas = pedirNumCartas();

    } else{

      numeroValido = true;
      numeroCartas = numCartasDigitadas;
      fecharTelaInicial();
      montarJogo()
      
    }
  }
}

validarNumeroCartas ();

function fecharTelaInicial(){
  document.querySelector(".tela-inicial").classList.add("sumir");
}

function montarJogo(){

  let cartas = document.querySelector(".tela-jogo");

  cartas.classList.remove("sumir");

  let divHtml = "";

  for (let i = 0; i< numeroCartas; i++ ) {

    divHtml += `<div class="carta" onclick="virarCarta(this)"> 
                  <div class="original face"></div>
                </div> `;

  }

  cartas.innerHTML = divHtml;
}

function virarCarta(carta){

  let selecionado = carta.querySelector(".face") ;

  if (selecionado.classList.contains("original")){
    selecionado.classList.add("carta-verso");
    selecionado.classList.add("carta-frente");

    selecionado.classList.remove ("original");
  } else {
    selecionado.classList.remove("carta-verso");
    selecionado.classList.remove("carta-frente");
    
    selecionado.classList.add ("original");
  }

}