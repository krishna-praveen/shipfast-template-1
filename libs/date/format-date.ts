export const formatDate = (dateString: string, format = "pt-BR") => {
  return new Date(dateString).toLocaleDateString(format);
};
