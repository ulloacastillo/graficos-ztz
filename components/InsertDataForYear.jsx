import React, { useState } from 'react';
import { validateData } from '../src/app/utils/validationYear';
import { useDispatch } from 'react-redux';
import { updateChartData } from '../src/app/redux/actions';
import Swal from 'sweetalert2';
import TextArea from './TextArea';

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
    <>
      <TextArea
        value={inputData}
        handler={handleInputChange}
        title={'Ingresar datos por Año o Mes:'}
        placeholder={
          'Ejemplo:\n2023=100\n2024=100\n2025=100\n2026=100\n2027=150'
        }
      />

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
    </>
  );
};

export default InsertDataForYear;
