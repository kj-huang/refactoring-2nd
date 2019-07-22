let plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" }
};

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount(){
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audiance > 30) {
          result += 1000 * (this.performance.audiance - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audiance > 20) {
          result += 1000 + 500 * (this.performance.audiance - 30);
        }
        result += 300 * this.performance.audiance;
        break;
      default:
        throw new Error(`Unknown type: ${this.play.type}`);
    }
    return result;
  }

  get volumeCredits(){
    let result = 0;
    result += Math.max(this.performance.audiance - 30, 0);

    //each 10 comedy audiance can get extra points
    if ("comedy" === this.play.type)
      result += Math.floor(this.performance.audiance / 5);
    return result;
  }
}

module.exports = function createStatementData(invoice) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmounts = totalAmounts(statementData);
  return statementData;

  function enrichPerformance(aPerformance) {
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  function volumeCreditsFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCredits;
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmounts(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
};
