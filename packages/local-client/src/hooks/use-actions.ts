import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, treeCreators } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(
      Object.assign({}, actionCreators, treeCreators),
      dispatch
    );
  }, [dispatch]);
};
