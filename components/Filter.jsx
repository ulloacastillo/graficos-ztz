import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChartData, updateClaims } from '../src/app/redux/actions';
import { useChartSettings } from '@/app/store/store';
import Select from './Select';

const Filter = () => {
  const originalData = useSelector((state) => state.originalData);
  const dispatch = useDispatch();
  const setFilterType = useChartSettings((state) => state.setFilterType);
  const filterType = useChartSettings((state) => state.filterType);
  const claims = useSelector((state) => state.claims);
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
    dispatch(
      updateClaims({
        ...claims,
        total: filteredData.reduce((acc, item) => acc + item[1], 0),
      }),
    );
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
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
          <Select
            label="Seleccione el año a graficar"
            id="year-select"
            onChange={(e) => setSelectedYear(e.target.value)}
            options={getUniqueYears().map((year) => {
              return { value: year, id: year, text: year };
            })}
            selected={selectedYear}
            setSelected={setSelectedYear}
            className={
              'bg-gray-50 border border-gray-300 rounded-full block p-2.5 w-fit '
            }
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
