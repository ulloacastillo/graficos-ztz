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
export const UPDATE_ORIGINAL_DATA = 'UPDATE_ORIGINAL_DATA';

export const updateOriginalData = (data) => ({
  type: UPDATE_ORIGINAL_DATA,
  payload: data,
});

export const UPDATE_CLAIMS = 'UPDATE_CLAIMS';

export const updateClaims = (claims) => ({
  type: UPDATE_CLAIMS,
  payload: claims,
});

export const UPDATE_COL_NUMBER = 'UPDATE_COL_NUMBER';

export const updadateColNumber = (col) => ({
  type: UPDATE_COL_NUMBER,
  payload: col,
});
