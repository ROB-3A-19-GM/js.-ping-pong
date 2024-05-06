let chancheDeErrar = 0;

//variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6; 

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;


//placar do jogo
let pontos = 0;
let pontosDoOponente =0;


//sons do jogo
let raquetada;
let ponto;
let trilha;
let colidiu = false;



function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

    

//variaveis do oponente
let xRaqueteOponente =585;
let yRaqueteOponente =150;    
let velocidadeYOponente;



function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
  velocidadeXBolinha = random(3,6);
  velocidadeYBolinha = random (3,6);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  bolinhanaoficapresa();
  calculachancheDeErrar();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  if (xBolinha + raio > x && 
      xBolinha - raio < x + raqueteComprimento && 
      yBolinha + raio > y && 
      yBolinha - raio < y + raqueteAltura) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}


function movimentaRaqueteOponente(){
  if(yRaqueteOponente < yBolinha - raqueteAltura / 2){
    yRaqueteOponente += 6;
  } else if (yRaqueteOponente > yBolinha - raqueteAltura / 2){
    yRaqueteOponente -= 6;
  }
}
function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(150, 10, 40,20);
  fill("white");
  text(pontos,170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill("white");
  text(pontosDoOponente, 470, 26);
}
function marcaPonto(){
  if(xBolinha > 590) {
    pontos +=1;
    ponto.play();
  }
  if(xBolinha  <  11){
   pontosDoOponente +=1;  
   ponto.play();
  }
}
function bolinhanaoficapresa(){
  if(xBolinha - raio < 0){
    xBolinha = 23
  }
}
function calculachancheDeErrar(){
  if (pontosDoOponente >= pontos){
    chancheDeErrar += 1
    if (chancheDeErrar >= 39){
      chancheDeErrar =40
    }
  } else {
    chancheDeErrar -= 1
    if (chancheDeErrar <= 35){
     chancheDeErrar = 35
    }
    
  } 
}
