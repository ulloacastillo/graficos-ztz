import React, { useState } from 'react';
import { validateData } from '../src/app/utils/validation';
import { useDispatch } from 'react-redux';
import {
  updateChartData,
  updateChartHeaders,
  updateOriginalData,
} from '../src/app/redux/actions';
import Filter from './Filter';
import Swal from 'sweetalert2';

const InsertCSV = () => {
  const [inputData, setInputdata] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputdata(event.target.value);
  };

  const handleGenerateGraph = () => {
    const validation = validateData(inputData);
    if (!validation.isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: validation.error,
      });
      return;
    }
    dispatch(updateOriginalData(validation.data));
    dispatch(updateChartData(validation.data));
    dispatch(updateChartHeaders(validation.headers));
  };
  return (
    <div>
      <h3 className="mb-4 font-bold text-2xl text-black dark:text-black">
        {' '}
        Ingresar datos CSV:
      </h3>
      <textarea
        className="w-300"
        value={inputData}
        onChange={handleInputChange}
      ></textarea>
      <Filter />
      <button
        type="button"
        onClick={handleGenerateGraph}
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        Generar Grafico
      </button>
    </div>
  );
};

export default InsertCSV;
