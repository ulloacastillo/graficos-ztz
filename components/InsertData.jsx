import React, { useState } from 'react'
import {validateData} from '../src/utils/validation';

const InsertData = () => {

  const [inputData, setInputdata] = useState('');
  const handleInputChange = (event) =>{
    setInputdata(event.target.value);
  };
  
  const handleGenerateGraph = ()=>{
    const validation = validateData(inputData);
  
    if(!validation.isValid){
      console.error(validation.error);
      return;
    }
  
  }
  return (
    <div>
      <h3 className="mb-4 font-bold text-2xl text-black dark:text-black"> Ingresar datos: </h3>
      <textarea className="w-full" value={inputData} onChange={handleInputChange} ></textarea>
      <div className='py-8'>
        <h3 className="mb-4 font-bold text-2xl text-black dark:text-black"> Filtrar por: </h3>
        <ul class="items-center w-full text-lg font-bold text-black bg-white border border-black rounded-lg sm:flex dark:bg-8A90F1 dark:border-black dark:text-black">
          <li className="w-full border-b border-black sm:border-b-0 sm:border-r dark:border-black">
            <div className="flex items-center ps-3">
              <input
                type="radio"
                id="mes"
                name="periodo"
                value="Mes"
              />
              <label for="horizontal-month" className="w-full py-3 ms-2 text-lg font-bold text-black dark:text-black"> Mes </label>
            </div>
          </li>
          <li className="w-full dark:border-black">
            <div className="flex items-center ps-3">
              <input
                type="radio"
                id="año"
                name="periodo"
                value="Año"
              />
              <label for="horizontal-year" className="w-full py-3 ms-2 text-lg font-bold text-black dark:text-black"> Año </label>
            </div>
          </li>
        </ul>
      </div>
      <button type="button" onClick={handleGenerateGraph} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold text-lg w-full py-2.5 text-center me-2 mb-2 px-8"> Generar Grafico</button>
    </div>
  )
};


export default InsertData
