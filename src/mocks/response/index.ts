import { apiFullUrl, apiPath } from '../../constants/mswPath';
import addressList from './addressList.json';
import categories from './categories.json';
import createReview from './createReview.json';
import mgcList from './mgcList.json';
import reviewContentList from './reviewContentList.json';
import user from './user.json';

const path = {
  [apiPath.category]: categories,
  [apiPath.mgc]: categories,
  [apiFullUrl.address]: addressList,
  [apiPath.mgcList]: mgcList,
  [apiPath.users]: user,
  [apiPath.reviewContents]: reviewContentList,
  [apiPath.createReview]: createReview,
};

export default path;
