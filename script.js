// script.js
let cards = [];

function addCard() {
  const cardName = document.getElementById("cardName").value;
  const pointsPerReal = parseFloat(
    document.getElementById("pointsPerReal").value
  );
  const fixedPoints = parseFloat(document.getElementById("fixedPoints").value);
  const monthlyFee = parseFloat(document.getElementById("monthlyFee").value);
  const feeWaiver = parseFloat(document.getElementById("feeWaiver").value);

  if (!cardName || !pointsPerReal || !monthlyFee) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  cards.push({
    name: cardName,
    pointsPerReal,
    fixedPoints,
    monthlyFee,
    feeWaiver,
  });
  document.getElementById("cardName").value = "";
  document.getElementById("pointsPerReal").value = "";
  document.getElementById("fixedPoints").value = "0";
  document.getElementById("monthlyFee").value = "";
  document.getElementById("feeWaiver").value = "0";
  alert(`${cardName} adicionado com sucesso!`);
}

function calculateBestCard() {
  const monthlySpending = parseFloat(
    document.getElementById("monthlySpending").value
  );
  const resultsDiv = document.getElementById("results");

  if (!monthlySpending || cards.length === 0) {
    resultsDiv.innerHTML =
      "Por favor, insira gastos mensais válidos e adicione pelo menos um cartão.";
    return;
  }

  let results = cards.map((card) => {
    const totalPoints =
      monthlySpending * card.pointsPerReal + card.fixedPoints * 12;
    const annualFee =
      monthlySpending >= card.feeWaiver && card.feeWaiver > 0
        ? 0
        : card.monthlyFee * 12;
    return { ...card, totalPoints, annualFee };
  });

  results.sort(
    (a, b) => b.totalPoints - a.totalPoints || a.annualFee - b.annualFee
  );

  const bestCard = results[0];
  resultsDiv.innerHTML = `
        <strong>Melhor Cartão:</strong> ${bestCard.name}<br>
        <strong>Pontos por ano:</strong> ${bestCard.totalPoints.toFixed(0)}<br>
        <strong>Mensalidade anual:</strong> R$ ${bestCard.annualFee}<br>
    `;
}
