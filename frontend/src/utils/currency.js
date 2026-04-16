export const convertAmount = (amount, currency = "EUR") => {
  const value = Number(amount || 0);
  if (currency === "USD") {
    return value * 1.08;
  }
  return value;
};

export const formatCurrency = (amount, options = {}) => {
  const { language = "en", currency = "EUR" } = options;
  const locale = language === "fr" ? "fr-FR" : "en-US";
  const converted = convertAmount(amount, currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(converted);
};
