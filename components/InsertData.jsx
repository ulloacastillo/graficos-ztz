import { useState } from 'react';
import InsertCSV from './InsertCSV';
import InsertDataForYear from './InsertDataForYear';

const InsertData = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full py-6 space-y-4">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="peer ring-2 ring-gray-900 bg-gradient-to-r from-ztz-softblue to-ztz-indigoblue rounded-xl outline-none duration-300 after:duration-500 w-20 h-8  shadow-inner peer-checked:bg-gradient-to-r peer-checked:from-ztz-mainblue peer-checked:to-dark-purple shadow-gray-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-900  after:content-[''] after:rounded-2xl after:absolute after:outline-none after:h-12 after:w-12 after:bg-gray-50 after:-top-2 after:-left-2 after:flex after:justify-center after:items-center after:border-4 after:border-gray-900  peer-checked:after:translate-x-14"></div>
        <span className="ms-3 text-sm text-gray-900 pl-3 font-bold">
          {isChecked ? 'Ingrese datos manuales' : 'Ingrese CSV'}
        </span>
      </label>

      {isChecked ? <InsertCSV /> : <InsertDataForYear />}
    </div>
  );
};

export default InsertData;
