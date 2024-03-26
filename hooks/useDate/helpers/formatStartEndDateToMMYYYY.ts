interface FormatStartEndDateToMMYYYYProps {
  startDate: Date
  endDate: Date
}

export const formatStartEndDateToMMYYYY = ({ startDate, endDate }: FormatStartEndDateToMMYYYYProps) => {
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMonth = monthNames[start.getMonth()];
  const endMonth = monthNames[end.getMonth()];
  const year = start.getFullYear();

  return `${startMonth} - ${endMonth} (${year})`;
}
