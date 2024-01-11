// Filter.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChartData } from '../src/app/redux/actions'; // Asegúrate de importar la acción correcta

const Filter = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Mes');
  const originalData = useSelector((state) => state.originalData); // Obtén originalData del estado de la aplicación
  const dispatch = useDispatch(); // Obtén la función de despacho del store de Redux

  useEffect(() => {
    // Esta función se ejecutará cada vez que selectedPeriod cambie
    let filteredData;
  
    // Trabaja con una copia de originalData
    const dataCopy = [...originalData];
  
    if (selectedPeriod === 'Mes') {
      // Agrupa los datos por mes y suma el conteo
      filteredData = dataCopy
        .reduce((acc, item) => {
          const date = item[0].slice(5, 7); // Obtiene el mes (mm)
          const existingItem = acc.find((i) => i[0] === date);
          if (existingItem) {
            existingItem[1] += item[1];
          } else {
            acc.push([date, item[1]]);
          }
          return acc;
        }, []);
    
      console.log('Datos filtrados por mes:', filteredData);
    
  
      console.log('Datos filtrados por mes:', filteredData); // Agrega esta línea
    } else if (selectedPeriod === 'Año') {
      // Filtra los datos por año y suma el conteo
      filteredData = dataCopy
        .reduce((acc, item) => {
          const date = item[0].slice(0, 4); // Obtiene el año (yyyy)
          const existingItem = acc.find((i) => i[0] === date);
          if (existingItem) {
              existingItem[1] += item[1];
          } else {
              acc.push([date, item[1]]);
          }
          return acc;
        }, []);
  
      console.log('Datos filtrados por año:', filteredData); // Agrega esta línea
    }
  
    // Despacha la acción updateChartData con los datos filtrados
    dispatch(updateChartData(filteredData));
  }, [selectedPeriod]);
  

  return (
    <div className='py-8'>
        <h3 className="mb-4 font-bold text-2xl text-black dark:text-black"> Filtrar por: </h3>
        <ul className="items-center w-full text-lg font-bold text-black bg-white border border-black rounded-lg sm:flex dark:bg-8A90F1 dark:border-black dark:text-black">
          <li className="w-full border-b border-black sm:border-b-0 sm:border-r dark:border-black">
            <div className="flex items-center ps-3">
              <input
                type="radio"
                id="mes"
                name="periodo"
                value="Mes"
                checked={selectedPeriod === 'Mes'}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              />
              <label htmlFor="horizontal-month" className="w-full py-3 ms-2 text-lg font-bold text-black dark:text-black"> Mes </label>
            </div>
          </li>
          <li className="w-full dark:border-black">
            <div className="flex items-center ps-3">
              <input
                type="radio"
                id="año"
                name="periodo"
                value="Año"
                checked={selectedPeriod === 'Año'}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              />
              <label htmlFor="horizontal-year" className="w-full py-3 ms-2 text-lg font-bold text-black dark:text-black"> Año </label>
            </div>
          </li>
        </ul>
      </div>
  )
}

export default Filter;
