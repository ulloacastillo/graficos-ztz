import { UPDATE_CHART_DATA, UPDATE_CHART_HEADERS } from "./actions";

const initialState = {
  chartData: [],
  chartHeaders: [],
};

export const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHART_DATA:
      return {
        ...state,
        chartData: action.payload,
      };
    case UPDATE_CHART_HEADERS:
      return {
        ...state,
        chartHeaders: action.payload,
      };
    default:
      return state;
  }
};
