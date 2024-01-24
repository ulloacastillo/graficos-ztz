import React from 'react';
import Dropzone from './DropzoneExcel';
import Filter from './Filter';

const UploadExcel = () => {
  return (
    <div className="">
      <div className="bg-slate-200 size-60 border-dashed border-2 border-green-600 rounded-[2.5rem] flex flex-col justify-center items-center relative text-center text-xs">
        <Dropzone title="Sube tu excel aquí" titleSize="text-xl" />
      </div>
      <div>
        <Filter />
      </div>
    </div>
  );
};

export default UploadExcel;
