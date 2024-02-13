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
      <div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            checked={isChecked}
            onChange={handleCheckboxChange}
            type="checkbox"
            value=""
            class="sr-only peer"
          />
          <div class="group peer ring-0 bg-gradient-to-r from-ztz-softblue to-ztz-mainblue  rounded-full outline-none duration-700 after:duration-300 w-24 h-12  shadow-md peer-checked:bg-gradient-to-r peer-checked:from-ztz-indigoblue peer-checked:to-dark-purple peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1  peer-checked:after:translate-x-12 peer-hover:after:scale-95"></div>
          <span className="ms-3 text-sm text-gray-900 pl-3 font-bold">
            {isChecked ? 'Ingrese datos manuales' : 'Ingrese CSV'}
          </span>
        </label>
      </div>
      {isChecked ? <InsertCSV /> : <InsertDataForYear />}
    </div>
  );
};

export default InsertData;
