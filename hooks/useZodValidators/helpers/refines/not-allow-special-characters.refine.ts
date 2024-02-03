export const notAllowSpecialCharactersRefine = (value: string) => {
  if (value) {
    const nameValid = value
      .trim()
      .split(/ +/)
      .every((splittedValue) =>
        new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'-.\s]+$/).test(
          splittedValue
        )
      );

    return nameValid;
  }

  return false;
};
