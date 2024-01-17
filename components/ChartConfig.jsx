import { useChartSettings } from '@/app/store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SelectEvent from './SelectEvent';

function ChartConfig() {
  const theme = useChartSettings((state) => state.theme);
  const setTheme = useChartSettings((state) => state.setTheme);
  const useImage = useChartSettings((state) => state.useImage);
  const setUseImage = useChartSettings((state) => state.setUseImage);
  const eventsRegister = useChartSettings((state) => state.events);
  const setEvents = useChartSettings((state) => state.setEvents);
  const data = useSelector((state) => state.chartData);

  useEffect(() => {
    const array = data.map(
      (d) => new Object({ date: d[0], amount: d[1], icon: null }),
    );

    setEvents(array);

    console.log('aqui', eventsRegister, data);
  }, [data]);

  const handleChange = (e) => {
    setTheme(e.target.value);
    console.log(theme);
  };

  const handleToogle = (e) => {
    setUseImage(!useImage);
  };

  const toogleOffClass = ` bg-slate-100`;
  const toogleOnClass = `bg-green-600 translate-x-[20px]`;

  return (
    <div className="flex flex-col items-start gap-3 w-[100%]">
      <div className="w-[100%]">
        <h2 className="text-lg ">Temática e Imagen</h2>
        <div className="flex flex-col  w-[80%] border-solid border-2 shadow-md border-slate-200 rounded-md py-4 px-1 gap-3">
          <div className="flex flex-row justify-between">
            <label for="themes">Temáica del gráfico</label>
            <select name="themes" onChange={handleChange} value={theme}>
              <option value="default">Sin Temática</option>
              <option value="Halloween">Halloween</option>
              <option value="Navidad">Navidad</option>
            </select>
          </div>
          <div className="flex flex-row ">
            <label>Usar imagen subida</label>
            <button
              className={`w-[50px] my-0 mx-auto cursor-pointer rounded-full p-1 shadow-md bg-slate-200`}
              onClick={handleToogle}
            >
              <span
                className={`block size-[20px] rounded-full transition-all ${
                  useImage ? toogleOnClass : toogleOffClass
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[100%]">
        <h2 className="text-lg ">Eventos Por Mes</h2>
        <nav className="flex flex-row justify-center flex-wrap w-[80%] border-solid border-2 border-slate-200 shadow-md rounded-md py-4 px-1 gap-3">
          {eventsRegister.map((d, i) => (
            <li key={i} className="list-none ">
              <div className="flex flex-col items-center">
                <span>{d.date}</span>
                <SelectEvent index={i} />
              </div>
            </li>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ChartConfig;
