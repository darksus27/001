// Função para obter a data no formato "DD/MM/YYYY"
function obterData() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

// Função para salvar a anotação no localStorage
function salvarNota() {
  const nota = document.getElementById('nota').value.trim();
  if (nota === "") {
    alert("Por favor, escreva algo para salvar.");
    return;
  }

  const data = obterData();
  const anotacao = {
    texto: nota,
    data: data,
  };

  // Carrega as anotações existentes do localStorage, ou cria um array vazio
  const anotacoes = JSON.parse(localStorage.getItem("anotacoes")) || [];

  // Adiciona a nova anotação ao início da lista
  anotacoes.unshift(anotacao);

  // Salva as anotações de volta no localStorage
  localStorage.setItem("anotacoes", JSON.stringify(anotacoes));

  // Limpa o campo de texto
  document.getElementById('nota').value = '';

  // Atualiza a exibição das anotações
  carregarAnotacoes();
}

// Função para carregar as anotações armazenadas no localStorage
function carregarAnotacoes() {
  const listaAnotacoes = document.getElementById('listaAnotacoes');
  const anotacoes = JSON.parse(localStorage.getItem("anotacoes")) || [];

  // Limpa a lista de anotações
  listaAnotacoes.innerHTML = '';

  // Exibe todas as anotações
  anotacoes.forEach((anotacao) => {
    const divAnotacao = document.createElement('div');
    divAnotacao.innerHTML = `<strong>${anotacao.data}</strong><p>${anotacao.texto}</p>`;
    listaAnotacoes.appendChild(divAnotacao);
  });
}

// Carrega as anotações ao carregar a página
window.onload = carregarAnotacoes;
