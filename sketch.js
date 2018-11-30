// paleta de cores
fundo = [44, 26, 29];
fundoT = [166, 127, 142];
contorno = [0, 0, 0];
corO = [108, 200, 137];
corX = [252, 111, 129];
corTexto = [255, 255, 255];

// espessura do tracos
espessura = 7;

// algumas variaveis
coord = 75;
textoVencedor = "";


// setup() principal do p5js
function setup() {
    var cnv = createCanvas(600, 600);

    cnv.position(0, 100);
    cnv.center('horizontal')

    // instanciando tabuleiro
    t = new Tabuleiro();

}

// draw() do p5js para desenhar na tela
function draw() {
    background(fundo);

    // show() eh a funcao que desenha tudo na tela
    t.show();

    // checaVitoria() eh a funcao que declara um vencedor ou um empate
    t.checaVitoria();

}

// mouseClicked() captura os cliques do mouse e dispara as funcoes de acordo
function mouseClicked(){

    // clicou em algum lugar do tabuleiro
    if(mouseX > 75 && mouseX < 450 + 75){
        if(mouseY > 75 && mouseY < 450 + 75){
            t.update();
        }
    }

    // clicou no botao de resetar
    if(mouseX > resetX && mouseX < (resetX + 120)){
       if(mouseY > resetY && mouseY < (resetY + 46)){
           resetTabuleiro();
       }
    }

}


// objeto Tabuleiro
function Tabuleiro(){

    // posicao do tabuleiro no canvas
    this.x = coord;
    this.y = coord;

    // valor de cada celula do tabuleiro (pode ser "X", "O", ou um Inteiro quando esta vazio)
    this.celulas =  [0, 1, 2,
                     3, 4, 5,
                     6, 7, 8];

    // update() atualiza o jogo conforme o Jogador ou o Computador jogam
    this.update = function(){

        // JOGADOR joga
        if(textoVencedor == ""){
             // primeiro quadrante
             if(mouseX > coord && mouseX < (150 + coord)){
                if(mouseY > coord && mouseY < (150 + coord)){
                    this.celulas[0] = "X";
                }
             }

             // segundo quadrante
             if(mouseX > (coord + 150) && mouseX < (300 + coord)){
                if(mouseY > coord && mouseY < (150 + coord)){
                    this.celulas[1] = "X";
                }
             }

             // terceiro quadrante
             if(mouseX > (coord + 300) && mouseX < (450 + coord)){
                if(mouseY > coord && mouseY < (150 + coord)){
                    this.celulas[2] = "X";
                }
             }

             // quarto quadrante
             if(mouseX > coord && mouseX < (150 + coord)){
                if(mouseY > (coord + 150) && mouseY < (300 + coord)){
                    this.celulas[3] = "X";
                }
             }

             // quinto quadrante
             if(mouseX > (coord + 150) && mouseX < (300 + coord)){
                if(mouseY > (coord + 150) && mouseY < (300 + coord)){
                    this.celulas[4] = "X";
                }
             }

             // sexto quadrante
             if(mouseX > (coord + 300) && mouseX < (450 + coord)){
                if(mouseY > (coord + 150) && mouseY < (300 + coord)){
                    this.celulas[5] = "X";
                }
             }

             // setimo quadrante
             if(mouseX > coord && mouseX < (150 + coord)){
                if(mouseY > (coord + 300) && mouseY < (450 + coord)){
                    this.celulas[6] = "X";
                }
             }

             // oitavo quadrante
             if(mouseX > (coord + 150) && mouseX < (300 + coord)){
                if(mouseY > (coord + 300) && mouseY < (450 + coord)){
                    this.celulas[7] = "X";
                }
             }

             // nono quadrante
             if(mouseX > (coord + 300) && mouseX < (450 + coord)){
                if(mouseY > (coord + 300) && mouseY < (450 + coord)){
                    this.celulas[8] = "X";
                }
             }
        }

        // COMPUTADOR joga
        var jogadasPossiveis = emptyIndexies(this.celulas);
        var melhorJogada = minimax(this.celulas, "O");
        this.celulas[melhorJogada.index] = "O";

     }

    // checaVitoria() eh a funcao que declara um vencedor ou um empate
    this.checaVitoria = function(){

         // checa vitoria de X
         if(
                // checando horizontal
                this.celulas[0] == "X" && this.celulas[1] == "X" && this.celulas[2] == "X" ||
                this.celulas[3] == "X" && this.celulas[4] == "X" && this.celulas[5] == "X" ||
                this.celulas[6] == "X" && this.celulas[7] == "X" && this.celulas[8] == "X" ||

                // checando vertical
                this.celulas[0] == "X" && this.celulas[3] == "X" && this.celulas[6] == "X" ||
                this.celulas[1] == "X" && this.celulas[4] == "X" && this.celulas[7] == "X" ||
                this.celulas[2] == "X" && this.celulas[5] == "X" && this.celulas[8] == "X" ||

                // checando diagonal
                this.celulas[0] == "X" && this.celulas[4] == "X" && this.celulas[8] == "X" ||
                this.celulas[2] == "X" && this.celulas[4] == "X" && this.celulas[6] == "X"){

                textoVencedor = "Humano venceu!";
                return 1;
        }

        //checa vitoria de O
        if(
               // checando horizontal
               this.celulas[0] == "O" && this.celulas[1] == "O" && this.celulas[2] == "O" ||
               this.celulas[3] == "O" && this.celulas[4] == "O" && this.celulas[5] == "O" ||
               this.celulas[6] == "O" && this.celulas[7] == "O" && this.celulas[8] == "O" ||

               // checando vertical
               this.celulas[0] == "O" && this.celulas[3] == "O" && this.celulas[6] == "O" ||
               this.celulas[1] == "O" && this.celulas[4] == "O" && this.celulas[7] == "O" ||
               this.celulas[2] == "O" && this.celulas[5] == "O" && this.celulas[8] == "O" ||

               // checando diagonal
               this.celulas[0] == "O" && this.celulas[4] == "O" && this.celulas[8] == "O" ||
               this.celulas[2] == "O" && this.celulas[4] == "O" && this.celulas[6] == "O"){

               textoVencedor = "Computador venceu!";
               return 2;
       }

       var vazios = emptyIndexies(this.celulas)
       if(vazios.length === 0){
           textoVencedor = "Deu velha!";
       }

     }

    // show() eh a funcao que desenha tudo na tela (ficou bem amador mas funciona)
    this.show = function(){

         // desenhando quadrante principal
         fill(fundoT);
         stroke(contorno);
         strokeWeight(espessura);
         rect(coord, coord, 450, 450);

         // desenhando 9 subquadrantes
         indice = -1;
         for(j = 0; j < 3; j++){
             for(i = 0; i < 3; i++){
                fill(fundoT);
                stroke(contorno);
                strokeWeight(espessura);
                rect(coord + (i*150), coord + (j*150), 150, 150);


                // escrevendo "O" ou "X"
                indice = indice + 1;
                posX = 0;
                posY = 0;

                textSize(90);

                if(this.celulas[indice] == "X"){
                    fill(corX);
                    posX = coord + 48 + (i*150);
                    posY = coord + 110 + (j*150);
                }
                if(this.celulas[indice] == "O"){
                    fill(corO);
                    posX = coord + 42 + (i*150);
                    posY = coord + 110 + (j*150);
                }

                text(this.celulas[indice], posX, posY);

             }
        }

        // botao de reset
        resetX = 460;
        resetY = 537;

        fill(fundoT);
        rect(resetX, resetY, 120, 46);

        fill(corTexto);
        textSize(30);
        text("RESET", resetX + 10, resetY + 35);

        // texto de vitoria
        vitoriaX = 80;
        vitoriaY = 537;

        fill(corTexto);
        textSize(30);
        text(textoVencedor, vitoriaX, vitoriaY + 35);

        // texto com o numero de chamadas recursivas
        fill(corTexto);
        textSize(24);
        text("chamadas recursivas: " + fc, 30, 50);

     }
}


// emptyIndexies(tabuleiro) retorna um array com todas as celulas vazias de um tabuleiro
function emptyIndexies(tabuleiro){
  return  tabuleiro.filter(s => s != "O" && s != "X");
}

// variavel que armazena quantas vezes a funcao foi recursivamente chamada
var fc = 0;

var huPlayer = "O";
var aiPlayer = "X";

// minimax(tabuleiro, jogador) eh a funcao do algoritmo de minimax
function minimax(newBoard, player){
  //add one to function calls
  fc++;

  //available spots
  var availSpots = emptyIndexies(newBoard);
  console.log(fc);
  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

function winning(novoTabuleiro, player){

    // checa vitoria de X
    if(
           // checando horizontal
           novoTabuleiro[0] == player && novoTabuleiro[1] == player && novoTabuleiro[2] == player ||
           novoTabuleiro[3] == player && novoTabuleiro[4] == player && novoTabuleiro[5] == player ||
           novoTabuleiro[6] == player && novoTabuleiro[7] == player && novoTabuleiro[8] == player ||

           // checando vertical
           novoTabuleiro[0] == player && novoTabuleiro[3] == player && novoTabuleiro[6] == player ||
           novoTabuleiro[1] == player && novoTabuleiro[4] == player && novoTabuleiro[7] == player ||
           novoTabuleiro[2] == player && novoTabuleiro[5] == player && novoTabuleiro[8] == player ||

           // checando diagonal
           novoTabuleiro[0] == player && novoTabuleiro[4] == player && novoTabuleiro[8] == player ||
           novoTabuleiro[2] == player && novoTabuleiro[4] == player && novoTabuleiro[6] == player){

           //textoVencedor =  player + " venceu!";
           return true;
   }
        return false;

}

function resetTabuleiro(){
    t.celulas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    textoVencedor = "";
    fc = 0;
}
