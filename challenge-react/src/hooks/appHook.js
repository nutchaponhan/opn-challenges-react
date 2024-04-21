import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCharities, fetchPayments, postPayment } from '../store/appSlicer';

export const useAppHook = () => {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const donate = useCallback((params) => {
    dispatch(postPayment(params));
  }, []);

  useEffect(() => {
    dispatch(fetchCharities());
    dispatch(fetchPayments());
  }, []);

  return {
    state: appState,
    action: { donate },
  };
};
