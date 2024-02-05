import {
  UPDATE_CHART_DATA,
  UPDATE_CHART_HEADERS,
  UPDATE_ORIGINAL_DATA,
} from './actions';

const initialState = {
  chartData: [],
  chartHeaders: [],
  originalData: [],
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
    case UPDATE_ORIGINAL_DATA:
      return {
        ...state,
        originalData: action.payload,
      };
    default:
      return state;
  }
};
