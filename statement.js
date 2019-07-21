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

function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    //print this order
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audiance
    } seats)\n`;
    totalAmount += amountFor(perf);
  }
  
  result += `Amount owed is ${usd(totalAmount)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;

  return result;
}

function amountFor(aPerformance) {
  let result = 0;
  switch (playFor(aPerformance).type) {
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
      throw new Error(`Unknown type: ${playFor(aPerformance).type}`);
  }
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audiance - 30, 0);

  //each 10 comedy audiance can get extra points
  if ("comedy" === playFor(aPerformance).type)
    result += Math.floor(aPerformance.audiance / 5);
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
}

function totalVolumeCredits(){
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      //add volume credit
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
}

console.log(statement(invoice, plays));
