let numeroCartas = 0;
let mminimoCartas = 4;
let maximoCartas = 14;

const imagensLista = ["bobrossparrot","explodyparrot","fiestaparrot","metalparrot","revertitparrot","tripletsparrot","unicornparrot"];
let imagens = imagensLista;
let jogadas = 0;
let cartasCorretas = 0;

function carregarTelaInicial(){
  let tela = document.querySelector(".tela-inicial");

  for (let i = 0; i < 12; i++ ) {
    tela.innerHTML += "<div class='verso face'></div>";
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

    divHtml += `<div class="carta" onclick="virarCarta(this)"> 
                  <div class="verso face"> <img src="imagens/${imagens[i]}.gif"> </div>
                </div> `;

  }
  
  cartas.innerHTML = divHtml;
}

function virarCarta(carta){

  jogadas ++;

  let selecionado = carta.querySelector(".face") ;

  if (selecionado.classList.contains("verso")){

    selecionado.classList.add("frente");
    selecionado.classList.remove ("verso"); 
    
    selecionado.classList.add("analise");
    
    let outraCarta = document.querySelectorAll(".analise");

     if ( outraCarta.length == 2 ){

      if ( outraCarta[0].childNodes[1].getAttribute('src') == outraCarta[1].childNodes[1].getAttribute('src') ){

        outraCarta[0].classList.add("correto");
        outraCarta[1].classList.add("correto");

        outraCarta[0].classList.remove("analise");
        outraCarta[1].classList.remove("analise");

        outraCarta[0].parentNode.setAttribute("onclick",null);
        outraCarta[1].parentNode.setAttribute("onclick",null);

        cartasCorretas += 2;

        if (cartasCorretas == numeroCartas) {
          alert (`Você ganhou em ${jogadas} jogadas!`);
        }

      } else{
        setTimeout ( voltarCartas(outraCarta) , 1000 ); 
       
      }

     } 
    

  } else {
    selecionado.classList.remove("analise");
    selecionado.classList.remove("frente");
    selecionado.classList.add ("verso");
    
  }

}

function voltarCartas(outraCarta){
  
  outraCarta[0].classList.remove("analise");
  outraCarta[0].classList.remove("frente");
  outraCarta[0].classList.add ("verso");

  outraCarta[1].classList.remove("analise");
  outraCarta[1].classList.remove("frente");
  outraCarta[1].classList.add ("verso");

}