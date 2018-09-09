import { createSelector } from 'reselect';

const selectProgress = state => state.get('progress');

const makeSelectLoading = () =>
  createSelector(
    selectProgress,
    progressState => (progressState ? progressState.get('loading') : false),
  );

export { selectProgress, makeSelectLoading };
