interface GetDataByKeyProps {
  key: string;
}
export const getDataByKey = ({ key }: GetDataByKeyProps) => {
  const data = localStorage.getItem(key);

  if (!data) return false;

  return JSON.parse(data);
};
