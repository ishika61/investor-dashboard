export const getIndustryChartData = (deals) => {
  const map = {};

  deals.forEach((d) => {
    map[d.industry] = (map[d.industry] || 0) + 1;
  });

  return Object.keys(map).map((key) => ({
    name: key,
    value: map[key],
  }));
};

export const getROIGrowthData = (deals) => {
  return deals.map((d, index) => ({
    name: d.company,
    roi: d.roi,
  }));
};