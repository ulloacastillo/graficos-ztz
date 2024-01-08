'use client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { chartReducer } from './redux/reducers';
import Layout from '../../components/Layout';

const store = configureStore({
  reducer: chartReducer,
});
export default function Home() {


  return (
    <Provider store={store}>
       <Layout/>
    </Provider>
   
  );
}
