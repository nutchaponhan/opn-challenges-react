import { configureStore } from '@reduxjs/toolkit';

import appReducer from './appSlicer';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export { store };
