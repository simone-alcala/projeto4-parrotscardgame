
const imagensLista  = ["bobrossparrot","explodyparrot","fiestaparrot","metalparrot",
                       "revertitparrot","tripletsparrot","unicornparrot"];
const mminimoCartas = 4;
const maximoCartas  = 14;
const contador      = document.querySelector(".contador");

let numeroCartas   = null;
let numJogadas     = null;
let cartasCorretas = null;
let cartasViradas  = null;
let intervalo      = null;

function carregarTelaInicial(){
  let tela = document.querySelector(".tela-inicial");
  for (let i = 0; i < 12; i++ ) {
    tela.innerHTML += "<div class='verso face'></div>";
  }
}

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
      prepararCartas();    
    }
  }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function prepararCartas(){ 
  let cartas  = document.querySelector(".tela-jogo");
  let imagens = imagensLista.slice();
  
  imagens.sort(comparador);
  imagens.splice(0, (maximoCartas-numeroCartas)/2 );

  let j = imagens.length;

  for (let i=1; i<= j; i++){
    imagens.push(imagens[j-i]);
  }

  imagens.sort(comparador);
  montarJogo(cartas, imagens);
}

function fecharTelaInicial(){
  document.querySelector(".tela-inicial").classList.add("sumir");
}

function limparTelaJogo(){
  let tela = document.querySelector(".tela-jogo");
  tela.classList.add("sumir");
  tela.innerHTML="";
}

function exibirTelaInicial(){
  document.querySelector(".tela-inicial").classList.remove("sumir");
}

function montarJogo(cartas,imagens){
  let divHtml = "";
  cartas.classList.remove("sumir");
  for (let i = 0; i< numeroCartas; i++ ) {
    divHtml += `<div class="carta" onclick="virarCarta(this)"> 
                  <div class="verso face"> <img src="imagens/${imagens[i]}.gif" alt="${imagens[i]}.gif"> </div>
                </div> `;
  }
  cartas.innerHTML = divHtml;
}

function virarCarta(carta){
  numJogadas ++;

  let selecionado = carta.querySelector(".face") ;

  if (selecionado.classList.contains("verso")){
    selecionado.classList.add("frente");
    selecionado.classList.remove ("verso"); 
    selecionado.classList.add("analise");
    
    verificaPar();

  } else {
    selecionado.classList.remove("analise");
    selecionado.classList.remove("frente");
    selecionado.classList.add ("verso");
    
  }

}

function verificaPar(){

  cartasViradas = document.querySelectorAll(".analise");

  if ( cartasViradas.length == 2 ){

    if ( cartasViradas[0].childNodes[1].getAttribute('src') == cartasViradas[1].childNodes[1].getAttribute('src') ){

      cartasViradas[0].classList.add("par");
      cartasViradas[1].classList.add("par");

      cartasViradas[0].classList.remove("analise");
      cartasViradas[1].classList.remove("analise");

      cartasViradas[0].parentNode.setAttribute("onclick",null);
      cartasViradas[1].parentNode.setAttribute("onclick",null);

      cartasCorretas += 2;

      if (cartasCorretas == numeroCartas) {
        finalizarJogo();
      }

    } else{
      setTimeout ( voltarCartas , 1000 ); 
    }
  } 
}

function voltarCartas(){
  
  cartasViradas[0].classList.remove("analise");
  cartasViradas[0].classList.remove("frente");
  cartasViradas[0].classList.add ("verso");

  cartasViradas[1].classList.remove("analise");
  cartasViradas[1].classList.remove("frente");
  cartasViradas[1].classList.add ("verso");

}

function finalizarJogo(){

  clearInterval(intervalo);
  alert (`Você ganhou em ${numJogadas} jogadas!`);

  let pergunta = prompt("Deseja reiniciar a partida? (Sim ou Não)");

  if (pergunta.toUpperCase() === "SIM" || pergunta.toUpperCase() === "S"){
    reiniciarJogo();
  }
}

function iniciarJogo(){
  numeroCartas   = 0;
  numJogadas     = 0;
  cartasCorretas = 0;
  cartasViradas  = 0;
  intervalo      = null;
  contador.innerHTML = "0";
}

function reiniciarJogo(){
  limparTelaJogo ();
  exibirTelaInicial(); 
  iniciarJogo();
  validarNumeroCartas ();
  contarTempo();
}

function contarTempo(){
  intervalo = setInterval(contar,1000);
}

function contar(){
  contador.innerHTML = parseInt(contador.innerHTML) + 1;
}

iniciarJogo();
carregarTelaInicial();
validarNumeroCartas ();
contarTempo();