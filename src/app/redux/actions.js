export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';

export const updateChartData = (data) => ({
  type: UPDATE_CHART_DATA,
  payload: data,
});

export const UPDATE_CHART_HEADERS = 'UPDATE_CHART_HEADERS';

export const updateChartHeaders = (headers) => ({
  type: UPDATE_CHART_HEADERS,
  payload: headers,
});