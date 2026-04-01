export const getStats = (deals) => {
  if (!deals || deals.length === 0) {
    return {
      totalInvestment: 0,
      avgROI: 0,
      riskDistribution: {},
    };
  }

  const totalInvestment = deals.reduce(
    (sum, d) => sum + (d.investmentRequired || 0),
    0
  );

  const avgROI =
    deals.reduce((sum, d) => sum + (d.roi || 0), 0) / deals.length;

  const riskDistribution = deals.reduce((acc, d) => {
    acc[d.risk] = (acc[d.risk] || 0) + 1;
    return acc;
  }, {});

  return {
    totalInvestment,
    avgROI: avgROI.toFixed(2),
    riskDistribution,
  };
};