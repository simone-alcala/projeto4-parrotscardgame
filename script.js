
const imagesList = ["bobrossparrot","explodyparrot","fiestaparrot","metalparrot",
                       "revertitparrot","tripletsparrot","unicornparrot"];
const minCards   = 4;
const maxCards   = 14;
const counter    = document.querySelector(".counter");

let numCards     = null;
let numMoves     = null;
let rightCards   = null;
let turnedCards  = null;
let interval     = null;

function loadInitialBoard (){
  let board = document.querySelector(".initial-board");
  for (let i = 0; i < 12; i++ ) {
    board.innerHTML += "<div class='back face'></div>";
  }
}

function askNumCards(){
  return prompt ("Com quantas cartas deseja jogar? (4, 6, 8, 10, 12 ou 14)");
}

function validateNumCards(){
  let validNumber   = false;
  let numTypedCards = null;

  while (!validNumber) {
    numTypedCards = Number(numTypedCards);

    if ( !(numTypedCards >= minCards && numTypedCards <= maxCards) || numTypedCards%2 !== 0 || !Number.isInteger(numTypedCards) || Number.isNaN(numTypedCards) ) {
      numTypedCards = askNumCards();
    } else{
      validNumber = true;
      numCards = numTypedCards;
      closeInitialBoard();
      prepareCards();    
    }
  }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function prepareCards(){ 
  let cards  = document.querySelector(".game-board");
  let images = imagesList.slice();
  
  images.sort(comparador);
  images.splice(0, (maxCards-numCards)/2 );

  let j = images.length;

  for (let i=1; i<= j; i++){
    images.push(images[j-i]);
  }

  images.sort(comparador);
  setGame(cards, images);
}

function closeInitialBoard(){
  document.querySelector(".initial-board").classList.add("delete");
}

function clearGameBoard(){
  let board = document.querySelector(".game-board");
  board.classList.add("delete");
  board.innerHTML="";
}

function showInitialBoard (){
  document.querySelector(".initial-board").classList.remove("delete");
}

function setGame(cards,images){
  let divHtml = "";
  cards.classList.remove("delete");
  for (let i = 0; i< numCards; i++ ) {
    divHtml += `<div onclick="turnCard(this)" data-identifier="card" > 
                  <div class="back face" data-identifier="back-face" > 
                    <img src="imagens/${images[i]}.gif" alt="${images[i]}.gif"> 
                  </div>
                </div> `;
  }
  cards.innerHTML = divHtml;

}

function turnCard(card){
  numMoves ++;
  let selected = card.querySelector(".face") ;
  if (selected.classList.contains("back")){
    selected.classList.add("front");
    selected.classList.remove ("back"); 
    selected.classList.add("review");

    selected.setAttribute("data-identifier","front-face");

    verifyPair();
  } else {
    selected.classList.remove("review");
    selected.classList.remove("front");
    selected.classList.add ("back");

    selected.setAttribute("data-identifier","back-face");
  }
}

function verifyPair(){

  turnedCards = document.querySelectorAll(".review");

  if ( turnedCards.length === 2 ){

    if ( turnedCards[0].childNodes[1].getAttribute('src') === turnedCards[1].childNodes[1].getAttribute('src') ){
      //Mark cards as a pair
      turnedCards[0].classList.add("par");
      turnedCards[1].classList.add("par");
      //Remove cards from review
      turnedCards[0].classList.remove("review");
      turnedCards[1].classList.remove("review");
      //Users can't click anymore
      turnedCards[0].parentNode.setAttribute("onclick",null);
      turnedCards[1].parentNode.setAttribute("onclick",null);

      rightCards += 2;

      if (rightCards === numCards) {
        endGame();
      }
    } else{
      setTimeout ( returnCards , 1000 ); 
    }
  } 
}

function returnCards(){
  for (let i=0; i < turnedCards.length; i++){
    if ( turnedCards[i].classList.contains("review") ){
      turnedCards[i].classList.remove("review");
      turnedCards[i].classList.remove("front");
      turnedCards[i].classList.add ("back");

      turnedCards[i].setAttribute("data-identifier","back-face");
    }
  }
}

function endGame(){
  clearInterval(interval);
  alert (`Você ganhou em ${numMoves} jogadas e em ${counter.innerHTML} segundos!`);
  
  let restart = prompt("Deseja reiniciar a partida? (Sim ou Não)");

  if (restart.toUpperCase() === "SIM" || restart.toUpperCase() === "S"){
    restartGame();
  }
}

function startGame(){
  numCards      = 0;
  numMoves      = 0;
  rightCards    = 0;
  turnedCards   = 0;
  interval      = null;
  counter.innerHTML = "0";
}

function restartGame(){
  clearGameBoard ();
  showInitialBoard(); 
  startGame();
  validateNumCards();
  countTime();
}

function countTime(){
  interval = setInterval(count,1000);
}

function count(){
  counter.innerHTML = parseInt(counter.innerHTML) + 1;
}

startGame();
loadInitialBoard();
validateNumCards();
countTime();