let plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" }
};

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
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmounts = totalAmounts(statementData);
  return renderPlainText(statementData);

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(aPerformance);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audiance > 30) {
          result += 1000 * (aPerformance.audiance - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audiance > 20) {
          result += 1000 + 500 * (aPerformance.audiance - 30);
        }
        result += 300 * aPerformance.audiance;
        break;
      default:
        throw new Error(`Unknown type: ${data.play.type}`);
    }
    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audiance - 30, 0);

    //each 10 comedy audiance can get extra points
    if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audiance / 5);
    return result;
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmounts(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}

console.log(statement(invoice));
