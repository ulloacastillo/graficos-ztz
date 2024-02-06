import React, { useState } from 'react';
import { validateData } from '../src/app/utils/validationYear';
import { useDispatch } from 'react-redux';
import { updateChartData } from '../src/app/redux/actions';
import Swal from 'sweetalert2';

const InsertDataForYear = () => {
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
    dispatch(updateChartData(validation.data));
  };
  return (
    <div>
      <div>
        <h3 className="mb-4 font-bold text-2xl text-black dark:text-black">
          Ingresar datos por Año:
        </h3>
        <textarea
          value={inputData}
          onChange={handleInputChange}
          className="w-300"
        ></textarea>
      </div>
      <div className="flex items-center justify-center py-7">
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

export default InsertDataForYear;
