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

function amountFor(perf, play){
    let thisAmount = 0;
    switch (play.type) {
        case "tragedy":
          thisAmount = 40000;
          if(perf.audiance > 30){
              thisAmount += 1000 * (perf.audiance - 30)
          }
          break;
        case "comedy":
              thisAmount = 30000;
              if(perf.audiance > 20){
                  thisAmount += 1000 + 500 * (perf.audiance - 30)
              } 
              thisAmount += 300 * perf.audiance;
          break;
        default:
          throw new Error(`Unknown type: ${play.type}`);
      }
    return thisAmount;
}

console.log(statement(invoice, plays));