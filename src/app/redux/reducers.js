import {
  UPDATE_CHART_DATA,
  UPDATE_CHART_HEADERS,
  UPDATE_ORIGINAL_DATA,
  UPDATE_CLAIMS,
  UPDATE_COL_NUMBER,
} from './actions';

const initialState = {
  chartData: [],
  chartHeaders: [],
  originalData: [],
  claims: {},
  colNumber: 0,
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
    case UPDATE_CLAIMS:
      return {
        ...state,
        claims: action.payload,
      };

    case UPDATE_COL_NUMBER:
      return {
        ...state,
        colNumber: action.payload,
      };
    default:
      return state;
  }
};
