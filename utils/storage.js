export const saveDeal = (deal) => {
  if (typeof window === "undefined") return;

  const existing = JSON.parse(localStorage.getItem("investments") || "[]");
  localStorage.setItem("investments", JSON.stringify([...existing, deal]));
};

export const getDealsFromStorage = () => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem("investments") || "[]");
  } catch {
    return [];
  }
};