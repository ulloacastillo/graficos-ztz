import React from 'react';
import Dropzone from './DropzoneExcel';
import Filter from './Filter';

const UploadExcel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-4">
      <div className="w-full px-8 mt-4 mb-1">
        <Filter />
      </div>
      <div className="bg-ztz-mainblue hover:bg-ztz-softblue hover:text-white size-60 border-dashed border-2 border-ztz-indigoblue rounded-[2.5rem] flex flex-col justify-center items-center relative text-center text-xs">
        <Dropzone title="Sube tu excel aquí" titleSize="text-xl" />
      </div>
    </div>
  );
};

export default UploadExcel;
