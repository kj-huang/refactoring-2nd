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
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        break;
      case "comedy":
        break;
      default:
        throw new Error(`Unknown type: ${play.type}`);
    }

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
