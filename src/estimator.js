const covid19ImpactEstimator = (data) => {
  let days = 0;
  let day = 0;
  const income = data.region.avgDailyIncomeInUSD;
  if (data.periodType === 'days') {
    days = Math.trunc(data.timeToElapse / 3);
    day = data.timeToElapse;
  } else if (data.periodType === 'months') {
    days = data.timeToElapse * 10;
    day = data.timeToElapse * 30;
  } else {
    days = Math.trunc((data.timeToElapse * 7) / 3);
    day = data.timeToElapse * 7;
  }
  const rate = (2 ** days);
  return {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: data.reportedCases * 10 * rate,
      severeCasesByRequestedTime: Math.trunc(data.reportedCases * 10 * rate * 0.15),
      hospitalBedsByRequestedTime: Math.trunc((data.totalHospitalBeds * 0.35)
     - data.reportedCases * (10 * rate * 0.15)),
      casesForICUByRequestedTim: Math.trunc(data.reportedCases * 10 * rate * 0.05),
      casesForVentilatorsByRequestedTime: Math.trunc(data.reportedCases * 10 * rate * 0.02),
      dollarsInFlight: (data.reportedCases * 10 * rate * data.region.avgDailyIncomePopulation
      * income * day).toFixed(2)
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: data.reportedCases * 50 * rate,
      severeCasesByRequestedTime: Math.trunc(data.reportedCases * (50 * rate * 0.15)),
      hospitalBedsByRequestedTime: Math.trunc((data.totalHospitalBeds * 0.35)
     - data.reportedCases * (50 * rate * 0.15)),
      casesForICUByRequestedTim: Math.trunc(data.reportedCases * (50 * rate * 0.05)),
      casesForVentilatorsByRequestedTime: Math.trunc(data.reportedCases * 50 * rate * 0.02),
      dollarsInFlight: (data.reportedCases * 50 * rate * data.region.avgDailyIncomePopulation
      * income * day).toFixed(2)

    }
  };
};
export default covid19ImpactEstimator;
