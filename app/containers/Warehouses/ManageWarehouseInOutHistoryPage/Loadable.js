import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('../../Customers/ManageCustomerPage/index'),
  loading: () => null,
});
