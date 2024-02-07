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
        className="w-full"
        value={inputData}
        onChange={handleInputChange}
      ></textarea>
      <Filter />
      <div className="flex items-center justify-center py-5">
        <button
          type="button"
          onClick={handleGenerateGraph}
          className="cursor-pointer transition-all bg-ztz-mainblue text-white px-6 py-2 rounded-lg
border-ztz-indigoblue
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Generar Grafico
        </button>
      </div>
    </div>
  );
};

export default InsertCSV;
