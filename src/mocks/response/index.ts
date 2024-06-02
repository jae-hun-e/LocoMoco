import { api } from '../../constants/mswPath';
import addressList from './addressList.json';
import categories from './categories.json';
import mgcList from './mgcList.json';
import reviewContentList from './reviewContentList.json';
import user from './user.json';

const path = {
  [api.category]: categories,
  [api.mgc]: categories,
  [api.address]: addressList,
  [api.mgcList]: mgcList,
  [api.users]: user,
  [api.reviewContents]: reviewContentList,
};

export default path;
