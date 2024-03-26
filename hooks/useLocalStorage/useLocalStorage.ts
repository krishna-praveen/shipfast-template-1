import { getDataByKey } from './helpers/getDataByKey';
import { removeDataByKey } from './helpers/removeDataByKey';
import { setDataByKey } from './helpers/setDataByKey';
import { keys } from './keys';

export const useLocalStorage = {
  keys,
  setDataByKey,
  getDataByKey,
  removeDataByKey,
};
