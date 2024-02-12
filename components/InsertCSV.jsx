import { useState } from 'react';
import { validateData } from '../src/app/utils/validation';
import { useDispatch } from 'react-redux';
import {
  updateChartData,
  updateChartHeaders,
  updateOriginalData,
} from '../src/app/redux/actions';
import Filter from './Filter';
import TextArea from './TextArea';
import Select from './Select';
import Swal from 'sweetalert2';
import { DATE_TYPES } from '@/app/constants';

const InsertCSV = () => {
  const [inputData, setInputdata] = useState('');
  const [dateType, setDateType] = useState(DATE_TYPES[0].value);
  const dispatch = useDispatch();

  const handleDateChange = (event) => {
    setDateType(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputdata(event.target.value);
  };

  const handleGenerateGraph = () => {
    const validation = validateData(inputData, dateType);
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
    <>
      <Select
        className={'m-0'}
        onChange={handleDateChange}
        label="Seleccione el formato de fecha"
        id="selectDateType"
        options={DATE_TYPES.map((el) => {
          return { ...el, text: el.value };
        })}
      />
      <TextArea
        value={inputData}
        handler={handleInputChange}
        title={'Ingresar datos CSV:'}
        placeholder={`Inserta tu archivo de la forma:\n\nFechaIngreso,FechaSalida(opcional)\nFecha1,Fecha2\n...`}
      />
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
    </>
  );
};

export default InsertCSV;
