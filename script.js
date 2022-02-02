let numeroCartas = 0;

validarNumeroCartas (prompt ("Com quantas cartas deseja jogar?") );

function validarNumeroCartas (numCartasDigitadas){

  let numeroValido = false;

  while (!numeroValido) {

    numCartasDigitadas = parseFloat(numCartasDigitadas);

    if ( typeof(numCartasDigitadas) != "number" || numCartasDigitadas < 4 || numCartasDigitadas > 14 
      || numCartasDigitadas%2 !=0   || !Number.isInteger (numCartasDigitadas) ) {

      numCartasDigitadas = prompt ("Com quantas cartas deseja jogar?");

    } else{
      numeroValido = true;
      numeroCartas = numCartasDigitadas;
      
      alert (numeroCartas);
    }

  }




}