/**
 * Asynchronously loads the component for CommonHandbooksPage
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
