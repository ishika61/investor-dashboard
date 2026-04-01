import investors from "../data/investors.json";

export const getInvestors = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Optional error simulation
      if (Math.random() < 0.1) {
        reject(new Error("Failed to fetch investors"));
        return;
      }

      resolve(investors);
    }, 400);
  });
};
