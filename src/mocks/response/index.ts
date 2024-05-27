import { api } from '../../constants/mswPath';
import addressList from './addressList.json';
import categories from './categories.json';
import mgcList from './mgcList.json';

const path = {
  [api.category]: categories,
  [api.mgc]: categories,
  [api.address]: addressList,
  [api.mgcList]: mgcList,
};

export default path;
