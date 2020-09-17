import {query} from '_utils/httpRequestUtil';
import {LIST_BRANCHES} from './queries';

const actions = {
  LIST_BRANCHES: 'LIST_BRANCHES',
  FILTER_BRANCH: 'FILTER_BRANCH',
  listBranches: (
    latLng,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      latitude: latLng.latitude,
      longitude: latLng.longitude,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.LIST_BRANCHES,
          LIST_BRANCHES,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  filterBranch: (branchType, branchColor) => {
    return {
      type: actions.FILTER_BRANCH,
      payload: {
        type: branchType,
        color: branchColor,
      },
    };
  },
};
export default actions;
