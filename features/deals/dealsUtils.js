export const filterAndSortDeals = (deals, filters, sortBy) => {
  let result = [...deals];

  // FILTERS
  if (filters.industry) {
    result = result.filter((d) => d.industry === filters.industry);
  }

  if (filters.risk) {
    result = result.filter((d) => d.risk === filters.risk);
  }

  if (filters.minROI) {
    result = result.filter((d) => d.roi >= filters.minROI);
  }

  // SORTING
  if (sortBy === "roi") {
    result.sort((a, b) => b.roi - a.roi);
  }

  if (sortBy === "investment") {
    result.sort((a, b) => b.investmentRequired - a.investmentRequired);
  }

  return result;
};