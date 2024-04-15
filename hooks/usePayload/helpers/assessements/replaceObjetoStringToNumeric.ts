export const replaceObjetoStringToNumeric = (data: any) => {
  const filledProps: any = {};
  const dataConverted = data as any;

  Object.keys(dataConverted).forEach((key) => {
    const dataRow = dataConverted;
    if (dataRow[key]) {
      const numericValue = parseFloat(dataRow[key].replace(',', '.'));
      if (!isNaN(numericValue)) {
        filledProps[key] = numericValue;
      }
    }
  });

  return filledProps
}
