let plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}

let invoice = 
    {
        "customer": "BigCo",
        "performances": [
            {"playID": "hamlet", "audiance": "55"},
            {"playID": "as-like", "audiance": "35"},
            {"playID": "othello", "audiance": "40"}
        ]
    }


function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    

    //add volume credit
    volumeCredits += Math.max(perf.audiance - 30, 0);

    //each 10 comedy audiance can get extra points
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audiance / 5);

    //print this order
    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audiance
    } seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
}

function amountFor(aPerformance, play){
    let result = 0;
    switch (play.type) {
        case "tragedy":
                result = 40000;
          if(aPerformance.audiance > 30){
            result += 1000 * (aPerformance.audiance - 30)
          }
          break;
        case "comedy":
                result = 30000;
              if(aPerformance.audiance > 20){
                result += 1000 + 500 * (aPerformance.audiance - 30)
              } 
              result += 300 * aPerformance.audiance;
          break;
        default:
          throw new Error(`Unknown type: ${play.type}`);
      }
    return result;
}

function playFor(aPerformance){
    return plays[aPerformance.playID];
}

console.log(statement(invoice, plays));