const covid19ImpactEstimator = (data) => {
  let days = 0;
  let day = 0;
  const income = data.region.avgDailyIncomeInUSD;
  if (data.periodType === 'days') {
    days = parseInt(data.timeToElapse / 3, 10);
    day = data.timeToElapse;
  } else if (data.periodType === 'months') {
    days = data.timeToElapse * 10;
    day = data.timeToElapse * 30;
  } else {
    days = parseInt((data.timeToElapse * 7) / 3, 10);
    day = data.timeToElapse * 7;
  }
  const rate = (2 ** days);
  return {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: data.reportedCases * 10 * rate,
      severeCasesByRequestedTime: parseInt(data.reportedCases * 10 * rate * 0.15, 10),
      hospitalBedsByRequestedTime: parseInt((data.totalHospitalBeds * 0.35)
     - data.reportedCases * (10 * rate * 0.15), 10),
      casesForICUByRequestedTim: parseInt(data.reportedCases * 10 * rate * 0.05, 10),
      casesForVentilatorsByRequestedTime: parseInt(data.reportedCases * 10 * rate * 0.02, 10),
      dollarsInFlight: data.reportedCases * 10 * rate * (data.region.avgDailyIncomePopulation
      * income * day)
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: data.reportedCases * 50 * rate,
      severeCasesByRequestedTime: parseInt(data.reportedCases * (50 * rate * 0.15), 10),
      hospitalBedsByRequestedTime: parseInt((data.totalHospitalBeds * 0.35)
     - data.reportedCases * (50 * rate * 0.15), 10),
      casesForICUByRequestedTim: parseInt(data.reportedCases * (50 * rate * 0.05), 10),
      casesForVentilatorsByRequestedTime: parseInt(data.reportedCases * 50 * rate * 0.02, 10),
      dollarsInFlight: data.reportedCases * 50 * rate * data.region.avgDailyIncomePopulation
      * income * day

    }
  };
};
export default covid19ImpactEstimator;
