export const formatBirthDate = (input: string) => {
  let formatted = input.replace(/[^\d]/g, "");

  if (formatted.length >= 3 && formatted.length <= 4) {
    formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
  } else if (formatted.length > 4) {
    formatted =
      formatted.slice(0, 2) +
      "/" +
      formatted.slice(2, 4) +
      "/" +
      formatted.slice(4, 8);
  }

  return formatted;
};
