let numeroCartas = 0;
let mminimoCartas = 4;
let maximoCartas = 14;

let imagens = ["bobrossparrot","explodyparrot","fiestaparrot","metalparrot","revertitparrot","tripletsparrot","unicornparrot"];

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

    if ( typeof(numCartasDigitadas) != "number" || numCartasDigitadas < mminimoCartas || numCartasDigitadas > maximoCartas
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

function comparador() { 
	return Math.random() - 0.5; 
}

function prepararCartas(){ 
  imagens.sort(comparador);
  imagens.splice(0, (maximoCartas-numeroCartas)/2 );

  let j = imagens.length;

  for (let i=1; i<= j; i++){
    imagens.push(imagens[j-i]);
  }
  imagens.sort(comparador);
}

function fecharTelaInicial(){
  document.querySelector(".tela-inicial").classList.add("sumir");
}

function montarJogo(){

  let cartas = document.querySelector(".tela-jogo");
  let divHtml = "";

  cartas.classList.remove("sumir");

  prepararCartas();

  for (let i = 0; i< numeroCartas; i++ ) {

    divHtml += `<div class="carta" id="${i}" onclick="virarCarta(this)"> 
                  <div class="original face"></div>
                </div> `;

  }
 
  cartas.innerHTML = divHtml;
}

function virarCarta(carta){

  let selecionado = carta.querySelector(".face") ;

  if (selecionado.classList.contains("original")){
    /*selecionado.classList.add("carta-verso");
    selecionado.classList.add("carta-frente");*/
    selecionado.style.backgroundImage = `url(imagens/${imagens[parseInt(carta.id)]}.gif)`;
    
    console.log(carta);

    selecionado.classList.remove ("original");
  } else {
    selecionado.classList.remove("carta-verso");
    selecionado.classList.remove("carta-frente");
    
    selecionado.classList.add ("original");
  }

}