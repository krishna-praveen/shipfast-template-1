export const notAllowNumbersRefine = (value: string) => {
  if (value) {
    const nameWithNumber = new RegExp(/[0-9]/).test(value.trim());

    if (nameWithNumber) {
      return false;
    }

    return true;
  }

  return false;
};
