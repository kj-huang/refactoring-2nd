let createStatementData = require("./createStatementData.js");
let invoice = {
  customer: "BigCo",
  performances: [
    { playID: "hamlet", audiance: "55" },
    { playID: "as-like", audiance: "35" },
    { playID: "othello", audiance: "40" }
  ]
};

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
}

function htmlStatement(invoice) {
    return renderHTML(createStatementData(invoice));
}

function renderHTML(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += `<table>\n`;
    result += `<tr><th>play</th><th>seats</th><th>cost</th></tr>`;
    for (let perf of data.performances) {
      //print this order
      result += `<tr><td>${perf.play.name}</td><td>${perf.audiance}</td><td>${usd(perf.amount)}</tr>\n`;
    }
    result += `</table>\n`;
    result += `<p>Amount owed is <em>${usd(data.totalAmounts)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
    return result;
}

function statement(invoice) {
  return renderPlainText(createStatementData(invoice));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
      //print this order
      result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audiance} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmounts)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}

console.log(statement(invoice));
console.log(htmlStatement(invoice));