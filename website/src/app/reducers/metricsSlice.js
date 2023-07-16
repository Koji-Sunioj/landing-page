import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import apiUrls from "../../utils/apis.json";

export const fetchMetrics = createAsyncThunk("fetch-metrics", async () => {
  const apis = apiUrls["IronpondStack"];
  const metricsApi = Object.keys(apis).filter((endPoint) =>
    endPoint.includes("Metrics")
  );
  const url = `${apis[metricsApi]}metrics`;
  return await fetch(url).then((response) => response.json());
});

const initialMetricState = {
  data: null,
  loading: false,
  error: false,
  message: null,
};

export const metricsSlice = createSlice({
  name: "metrics",
  initialState: initialMetricState,
  reducers: {
    resetMetrics: () => initialMetricState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetMetrics } = metricsSlice.actions;
export default metricsSlice.reducer;
