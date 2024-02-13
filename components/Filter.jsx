import { useEffect } from 'react';
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
  const selectedYear = useChartSettings((state) => state.selectedYear);
  const setSelectedYear = useChartSettings((state) => state.setSelectedYear);

  useEffect(() => {
    let filteredData;
    let dataCopy = [...originalData];

    if (filterType === 'Mes') {
      if (selectedYear !== 'Todos') {
        dataCopy = dataCopy.filter(
          (item) => item[0].slice(0, 4) === selectedYear,
        );
      }
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
    const showImagesArray = filteredData.map((d) => false);
    setEvents(array);
    setShowImages(showImagesArray);
  }, [filterType, originalData, selectedYear]);

  const getUniqueYears = () => {
    const years = originalData.map((item) => item[0].slice(0, 4));
    return ['Todos', ...new Set(years)];
  };

  return (
    <div className="w-full px-8 py-8">
      <h3 className="mb-4 font-bold text-2xl text-black dark:text-black">
        Filtrar por:
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
              Mes
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
              Año
            </label>
          </div>
        </li>
      </ul>
      {filterType === 'Mes' && (
        <div className="flex flex-col w-full md:w-1/3 px-3 mb-6 md:mb-0 p-6">
          <label
            className="mb-4 font-bold text-2xl text-black dark:text-black"
            htmlFor="year-select"
          >
            Año:
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 align-middle"
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {getUniqueYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
