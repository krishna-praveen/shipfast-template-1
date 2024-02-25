'use client'

interface GetDataByKeyProps {
  key: string;
}
export const getDataByKey = ({ key }: GetDataByKeyProps) => {
  if (typeof window == "undefined") return false;
  const data = localStorage.getItem(key);

  if (!data) return false;

  return JSON.parse(data);
};
