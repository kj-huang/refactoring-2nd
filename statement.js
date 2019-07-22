let invoice = {
  customer: "BigCo",
  performances: [
    { playID: "hamlet", audiance: "55" },
    { playID: "as-like", audiance: "35" },
    { playID: "othello", audiance: "40" }
  ]
};

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    //print this order
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audiance} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmounts)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100);
  }
}

function statement(invoice) {
  let createStatementData = require("./createStatementData.js");
  return renderPlainText(createStatementData(invoice));
}

console.log(statement(invoice));
