'use client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { chartReducer } from './redux/reducers';
import App from '../../components/App';

const store = configureStore({
  reducer: chartReducer,
});
export default function Home() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
