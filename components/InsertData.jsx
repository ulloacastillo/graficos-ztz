import React, { useState } from 'react';
import { validateData } from '../src/app/utils/validation';
import { useDispatch } from 'react-redux';
import { updateChartData, updateChartHeaders,updateOriginalData } from '../src/app/redux/actions';
import Filter from './Filter';

const InsertData = () => {
  const [inputData, setInputdata] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputdata(event.target.value);
  };

  const handleGenerateGraph = () => {
    const validation = validateData(inputData);
    if (!validation.isValid) {
      console.error(validation.error);
      return;
    }
    dispatch(updateOriginalData(validation.data));
    dispatch(updateChartData(validation.data));
    dispatch(updateChartHeaders(validation.headers));
  };
  return (
    <div>
      <h3 className="mb-4 font-bold text-2xl text-black dark:text-black"> Ingresar datos: </h3>
      <textarea className="w-300" value={inputData} onChange={handleInputChange} ></textarea>
      <Filter/>
      <button type="button" onClick={handleGenerateGraph} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold text-lg w-full py-2.5 text-center me-2 mb-2 px-8"> Generar Grafico</button>
    </div>
  );
};

export default InsertData;
