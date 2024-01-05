import { UPDATE_CHART_DATA } from "./actions";

const initialState = {
    chartData: [],
  };
  
  export const chartReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_CHART_DATA:
        return {
          ...state,
          chartData: action.payload,
        };
      default:
        return state;
    }
  };