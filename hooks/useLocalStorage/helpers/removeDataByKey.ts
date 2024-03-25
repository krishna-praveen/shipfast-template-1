interface RemoveDataByKeyProps {
  key: string;
  value: any;
}

export const removeDataByKey = ({ key }: RemoveDataByKeyProps) => {
  return localStorage.removeItem(key);
};
