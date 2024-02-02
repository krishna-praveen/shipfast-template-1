export const notAllowNumbersRefine = (value: string) => {
  if (value) {
    const nameWithNumber = new RegExp(/[0-9]/).test(value.trim());
    if (nameWithNumber) {
      throw { message: "Nomes com números não são permitidos", path: [] };
    }
    const nameValid =
      /\b[A-Za-zÀ-ú.][A-Za-zÀ-ú.]+,?\s[A-Za-zÀ-ú.][A-Za-zÀ-ú.]{2,19}\b/gi;

    return nameValid.test(value.trim());
  }

  return false;
};
