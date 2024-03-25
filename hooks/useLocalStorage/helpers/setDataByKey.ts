interface SetDataByKeyProps {
  key: string;
  value: any;
}

export const setDataByKey = ({ key, value }: SetDataByKeyProps) => {
  localStorage.setItem(key, JSON.stringify(value));
};
