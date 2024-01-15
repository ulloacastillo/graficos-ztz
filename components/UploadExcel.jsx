import React from 'react';
import Dropzone from './DropzoneExcel';

const UploadExcel = () => {
  return (
    <div className="bg-slate-200 size-60 border-dashed border-2 border-green-600 rounded-[2.5rem] flex flex-col justify-center items-center relative text-center text-xs">
      <Dropzone title="Sube tu excel aquí" titleSize="text-xl" />
    </div>
  );
};

export default UploadExcel;
