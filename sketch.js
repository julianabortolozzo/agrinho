let perguntas = [
  {
    pergunta: "🌾🚜 Qual produto do campo é essencial para fazer pão?",
    alternativas: ["Leite", "Trigo", "Café", "Carne"],
    correta: 1,
    fraseErro: "❌ O pão é feito de trigo, que vem do campo!"
  },
  {
    pergunta: "🏙️🌽 O que a cidade oferece ao campo?",
    alternativas: ["Tecnologia", "Animais", "Sementes nativas", "Chuva"],
    correta: 0,
    fraseErro: "❌ A cidade oferece tecnologia para ajudar na produção do campo."
  },
  {
    pergunta: "🍅🚛 Como os alimentos do campo chegam à cidade?",
    alternativas: ["A pé", "Internet", "Transportes como caminhões", "Pombo correio"],
    correta: 2,
    fraseErro: "❌ É através dos transportes como caminhões que os alimentos chegam à cidade!"
  },
  {
    pergunta: "🌻🛍️ Onde compramos produtos do campo na cidade?",
    alternativas: ["Shopping", "Feira e supermercado", "Cinema", "Hospital"],
    correta: 1,
    fraseErro: "❌ Compramos alimentos do campo na feira ou no supermercado!"
  }
];

let indice = 0;
let estado = "pergunta"; // 'pergunta', 'feedback' ou 'fim'
let acertos = 0;
let errou = false;

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(180, 230, 250);

  if (estado === "pergunta") {
    mostrarPergunta();
  } else if (estado === "feedback") {
    mostrarFeedback();
  } else if (estado === "fim") {
    mostrarResultado();
  }

  // Mostrar pontuação durante todo o jogo
  if (estado !== "fim") {
    fill(0);
    textSize(18);
    text(`⭐ Pontuação: ${acertos}`, width - 100, 20);
  }
}

function mostrarPergunta() {
  let p = perguntas[indice];

  fill(50);
  textSize(24);
  text("🎉 Festejando a Conexão Campo-Cidade 🎉", width / 2, 40);

  textSize(20);
  text(p.pergunta, width / 2, 100);

  for (let i = 0; i < p.alternativas.length; i++) {
    fill(255);
    rect(200, 150 + i * 60, 400, 50, 10);
    fill(0);
    text(p.alternativas[i], 400, 175 + i * 60);
  }
}

function mousePressed() {
  if (estado === "pergunta") {
    for (let i = 0; i < 4; i++) {
      if (
        mouseX > 200 &&
        mouseX < 600 &&
        mouseY > 150 + i * 60 &&
        mouseY < 200 + i * 60
      ) {
        verificarResposta(i);
      }
    }
  } else if (estado === "feedback") {
    proximaPergunta();
  } else if (estado === "fim") {
    // Reiniciar o jogo
    indice = 0;
    acertos = 0;
    estado = "pergunta";
  }
}

function verificarResposta(resposta) {
  if (resposta === perguntas[indice].correta) {
    acertos++;
    proximaPergunta();
  } else {
    errou = true;
    estado = "feedback";
  }
}

function proximaPergunta() {
  errou = false;
  indice++;

  if (indice >= perguntas.length) {
    estado = "fim";
  } else {
    estado = "pergunta";
  }
}

function mostrarFeedback() {
  let p = perguntas[indice];
  background(250, 200, 200);
  fill(0);
  textSize(24);
  text("Ops... Resposta incorreta! ❌", width / 2, 100);

  textSize(18);
  text(p.fraseErro, width / 2, 160);

  textSize(20);
  fill('blue');
  text("Clique para continuar 👉", width / 2, 300);
}

function mostrarResultado() {
  background(100, 200, 150);
  fill(255);
  textSize(28);
  text("Parabéns! 🎊", width / 2, 100);
  text(
    `Você acertou ${acertos} de ${perguntas.length} perguntas!`,
    width / 2,
    160
  );

  textSize(20);
  text("Clique para jogar novamente 🔄", width / 2, 300);
}
