import { configureStore } from "@reduxjs/toolkit";

import metricsSlice from "./reducers/metricsSlice";
import lightSlice from "./reducers/lightSlice";

export const store = configureStore({
  reducer: {
    metrics: metricsSlice,
    background: lightSlice,
  },
});
