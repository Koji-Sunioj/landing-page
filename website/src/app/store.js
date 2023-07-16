import { configureStore } from "@reduxjs/toolkit";

import metricsSlice from "./reducers/metricsSlice";

export const store = configureStore({
  reducer: {
    metrics: metricsSlice,
  },
});
