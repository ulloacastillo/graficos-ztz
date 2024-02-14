'use client';
import { useState } from 'react';
import Dropzone from './DropzoneExcel';
import Filter from './Filter';
import Select from './Select';
import { DATE_TYPES } from '@/app/constants';

const UploadExcel = () => {
  const [dateType, setDateType] = useState(DATE_TYPES[0].value);

  const handleDateChange = (event) => {
    setDateType(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-4">
      <div className="w-full px-8 mt-4 mb-1">
        <Filter />
      </div>
      <Select
        onChange={handleDateChange}
        label="Seleccione el formato de fecha"
        id="selectDateType"
        className={
          'bg-gray-50 border border-gray-300 rounded-full block p-2.5 w-fit mb-2 '
        }
        options={DATE_TYPES.map((el) => {
          return { ...el, text: el.value };
        })}
      />
      <div className="bg-ztz-mainblue hover:bg-ztz-softblue hover:text-white size-60 border-dashed border-2 border-ztz-indigoblue rounded-[2.5rem] flex flex-col justify-center items-center relative text-center text-xs">
        <Dropzone
          title="Sube tu excel aquí"
          titleSize="text-xl"
          dateType={dateType}
        />
      </div>
    </div>
  );
};

export default UploadExcel;
