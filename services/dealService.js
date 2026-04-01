import deals from "../data/deals.json";

export const getDeals = ({
  search = "",
  filters = {},
  sortBy = "",
  page = 1,
  limit = 5,
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // ❗ RANDOM ERROR SIMULATION
      if (Math.random() < 0.1) {
        reject("Random API error occurred");
        return;
      }

      let result = [...deals];

      // 🔍 SEARCH
      if (search) {
        result = result.filter((d) =>
          d.company.toLowerCase().includes(search.toLowerCase())
        );
      }

      // 🎯 FILTERS
      if (filters.industry) {
        result = result.filter((d) => d.industry === filters.industry);
      }

      if (filters.risk) {
        result = result.filter((d) => d.risk === filters.risk);
      }

      if (filters.minROI) {
        result = result.filter((d) => d.roi >= filters.minROI);
      }

      // 🔃 SORT
      if (sortBy === "roi") {
        result.sort((a, b) => b.roi - a.roi);
      }

      if (sortBy === "investment") {
        result.sort((a, b) => b.investmentRequired - a.investmentRequired);
      }

      // 📄 PAGINATION
      const start = (page - 1) * limit;
      const paginated = result.slice(start, start + limit);

      resolve({
        data: paginated,
        total: result.length,
      });
    }, 500);
  });
};