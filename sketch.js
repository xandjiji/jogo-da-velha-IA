// VARIAVEIS GLOBAIS ///////////////////////////////////////////////////////////

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
var contadorChamadas = 0;

////////////////////////////////////////////////////////////////////////////////



// FUNCOES DO p5js /////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////



// FUNCOES DO TABULEIRO ////////////////////////////////////////////////////////

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
           console.clear();
       }
    }

}

// reseta o tabuleiro e as demais variaveis para um estado inicial
function resetTabuleiro(){
    t.celulas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    textoVencedor = "";
    contadorChamadas = 0;
}

////////////////////////////////////////////////////////////////////////////////



// TABULEIRO ///////////////////////////////////////////////////////////////////

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
        var jogadasPossiveis = celulasVazias(this.celulas);
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

       var vazios = celulasVazias(this.celulas)
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
        text("chamadas recursivas: " + contadorChamadas, 30, 50);

     }

}

////////////////////////////////////////////////////////////////////////////////



// FUNCOES IA //////////////////////////////////////////////////////////////////

// minimax(tabuleiro, jogador) eh a funcao do algoritmo de minimax
function minimax(novoTabuleiro, jogador){

    // incrementa o numero de chamadas
    contadorChamadas++;
    console.log(contadorChamadas + " chamadas");

    // armazena em um array as celulas vazias
    var possiveisJogadas = celulasVazias(novoTabuleiro);

    // verifica se tem um estado terminal em que o COMPUTADOR ganha, perde ou empata e retorna uma pontuacao
    if (vence(novoTabuleiro, "O")){
        return {pontuacao:-10};
    }
    else if (vence(novoTabuleiro, "X")){
        return {pontuacao:10};
    }
    else if (possiveisJogadas.length === 0){
        return {pontuacao:0};
    }

    // array que vai guardar todas as jogadas e suas pontuacoes
    var jogadas = [];

    // loop que vai colocar todas as possiveis jogadas no array
    for (var i = 0; i < possiveisJogadas.length; i++){

        // vai criar um objeto para cada um e armazenar o index da celula de cada jogada
        var jogada = {};
        jogada.index = novoTabuleiro[possiveisJogadas[i]];

        // faz uma jogada numa celula vazia
        novoTabuleiro[possiveisJogadas[i]] = jogador;

        // armazena a pontuacao retornada do estado terminal daquela jogada
        if (jogador == "X"){
            var result = minimax(novoTabuleiro, "O");
            jogada.pontuacao = result.pontuacao;
        }
        else{
            var result = minimax(novoTabuleiro, "X");
            jogada.pontuacao = result.pontuacao;
        }

        // desfaz a jogada
        novoTabuleiro[possiveisJogadas[i]] = jogada.index;

        // coloca a jogada no array de jogadas
        jogadas.push(jogada);
    }

    // se for a vez do COMPUTADOR o loop resultara na jogada com a melhor pontuacao
    var melhorJogada;
    if(jogador === "X"){
    var melhorPontuacao = -10000;
        for(var i = 0; i < jogadas.length; i++){
            if(jogadas[i].pontuacao > melhorPontuacao){
                melhorPontuacao = jogadas[i].pontuacao;
                melhorJogada = i;
            }
        }
    }else{

        // se for a vez do HUMANO o loop resultara na jogada com a pior pontuacao
        var melhorPontuacao = 10000;
        for(var i = 0; i < jogadas.length; i++){
            if(jogadas[i].pontuacao < melhorPontuacao){
                melhorPontuacao = jogadas[i].pontuacao;
                melhorJogada = i;
            }
        }
    }

    // retorna a jogada com a maior pontuacao
    return jogadas[melhorJogada];

    }

// checa se "X" ou "O" vence
function vence(novoTabuleiro, jogador){

    // checa vitoria de "X" ou "O"
    if(
           // checando horizontal
           novoTabuleiro[0] == jogador && novoTabuleiro[1] == jogador && novoTabuleiro[2] == jogador ||
           novoTabuleiro[3] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[5] == jogador ||
           novoTabuleiro[6] == jogador && novoTabuleiro[7] == jogador && novoTabuleiro[8] == jogador ||

           // checando vertical
           novoTabuleiro[0] == jogador && novoTabuleiro[3] == jogador && novoTabuleiro[6] == jogador ||
           novoTabuleiro[1] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[7] == jogador ||
           novoTabuleiro[2] == jogador && novoTabuleiro[5] == jogador && novoTabuleiro[8] == jogador ||

           // checando diagonal
           novoTabuleiro[0] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[8] == jogador ||
           novoTabuleiro[2] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[6] == jogador){

           //textoVencedor =  jogador + " venceu!";
           return true;

   }
        return false;

}

// celulasVazias(tabuleiro) retorna um array com todas as celulas vazias de um tabuleiro
function celulasVazias(tabuleiro){
  return  tabuleiro.filter(s => s != "O" && s != "X");
}

////////////////////////////////////////////////////////////////////////////////
