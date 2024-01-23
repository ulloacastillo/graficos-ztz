// Filter.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChartData } from '../src/app/redux/actions';
import { useChartSettings } from '@/app/store/store';

const Filter = () => {
  const originalData = useSelector((state) => state.originalData);
  const dispatch = useDispatch();
  const setFilterType = useChartSettings((state) => state.setFilterType);
  const filterType = useChartSettings((state) => state.filterType);
  const setEvents = useChartSettings((state) => state.setEvents);
  const setShowImages = useChartSettings((state) => state.setShowImages);

  useEffect(() => {
    let filteredData;

    const dataCopy = [...originalData];

    if (filterType === 'Mes') {
      filteredData = dataCopy.reduce((acc, item) => {
        const date = item[0].slice(5, 7);
        const existingItem = acc.find((i) => i[0] === date);
        if (existingItem) {
          existingItem[1] += item[1];
        } else {
          acc.push([date, item[1]]);
        }
        return acc;
      }, []);
    } else if (filterType === 'Año') {
      filteredData = dataCopy.reduce((acc, item) => {
        const date = item[0].slice(0, 4);
        const existingItem = acc.find((i) => i[0] === date);
        if (existingItem) {
          existingItem[1] += item[1];
        } else {
          acc.push([date, item[1]]);
        }
        return acc;
      }, []);
    }

    dispatch(updateChartData(filteredData));
    const array = filteredData.map(
      (d) => new Object({ date: d[0], amount: d[1], icon: null }),
    );
    const showImagesArray = filteredData.map((d) => true);
    setEvents(array);
    setShowImages(showImagesArray);
  }, [filterType, originalData]);

  return (
    <div className="py-8">
      <h3 className="mb-4 font-bold text-2xl text-black dark:text-black">
        {' '}
        Filtrar por:{' '}
      </h3>
      <ul className="items-center w-full text-lg font-bold text-black bg-white border border-black rounded-lg sm:flex dark:bg-8A90F1 dark:border-black dark:text-black">
        <li className="w-full border-b border-black sm:border-b-0 sm:border-r dark:border-black">
          <div className="flex items-center ps-3">
            <input
              type="radio"
              id="mes"
              name="periodo"
              value="Mes"
              checked={filterType === 'Mes'}
              onChange={(e) => setFilterType(e.target.value)}
            />
            <label
              htmlFor="horizontal-month"
              className="w-full py-3 ms-2 text-lg font-bold text-black dark:text-black"
            >
              {' '}
              Mes{' '}
            </label>
          </div>
        </li>
        <li className="w-full dark:border-black">
          <div className="flex items-center ps-3">
            <input
              type="radio"
              id="año"
              name="periodo"
              value="Año"
              checked={filterType === 'Año'}
              onChange={(e) => setFilterType(e.target.value)}
            />
            <label
              htmlFor="horizontal-year"
              className="w-full py-3 ms-2 text-lg font-bold text-black dark:text-black"
            >
              {' '}
              Año{' '}
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
