import { useChartSettings } from '@/app/store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SelectEvent from './SelectEvent';
import ColorPicker from './ColorPicker';
import CheckBoxImage from './CheckBoxImage';
import { THEMES } from '@/app/constants';

function ChartConfig() {
  const theme = useChartSettings((state) => state.theme);
  const setTheme = useChartSettings((state) => state.setTheme);

  const eventsRegister = useChartSettings((state) => state.events);
  const setEvents = useChartSettings((state) => state.setEvents);
  const data = useSelector((state) => state.chartData);
  const setInitialColor = useChartSettings((state) => state.setInitialColor);
  const initialColor = useChartSettings((state) => state.initialColor);
  const setEndColor = useChartSettings((state) => state.setEndColor);
  const endColor = useChartSettings((state) => state.endColor);
  const textColor = useChartSettings((state) => state.textColor);
  const setTextColor = useChartSettings((state) => state.setTextColor);

  useEffect(() => {
    const array = data.map(
      (d) => new Object({ date: d[0], amount: d[1], icon: null }),
    );

    setEvents(array);
  }, [data]);

  const handleChange = (e) => {
    setTheme(e.target.value);
    setInitialColor(THEMES[e.target.value].colors[0]);
    setEndColor(THEMES[e.target.value].colors[1]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-[80%]  flex flex-col items-center">
        <h2 className="text-lg ">Configuración de Barras</h2>
        <div className="w-full mx-5 flex flex-col gap-y-4 bg-gray-100 rounded-xl shadow-2xl p-6">
          <div className="flex flex-row justify-between items-center">
            <label className="text-sm" htmlFor="themes">
              Tematica del gráfico
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-sm rounded-full block p-2.5 w-fit"
              name="themes"
              onChange={handleChange}
              value={theme}
            >
              <option value="default">Sin Temática</option>
              <option value="Halloween">Halloween</option>
              <option value="Navidad">Navidad</option>
              <option value="Valentin">Valentin</option>
              <option value="Cyber">Cyber Day</option>
              <option value="NewYear">Año nuevo</option>
            </select>
          </div>
          {theme !== 'Cyber' && (
            <>
              <div className="flex flex-row justify-between items-center">
                <span className="text-sm">Color Inicial</span>
                <ColorPicker setColor={setInitialColor} color={initialColor} />
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="text-sm">Color Final</span>
                <ColorPicker setColor={setEndColor} color={endColor} />
              </div>
            </>
          )}

          <div className="flex flex-row justify-between items-center">
            <span className="text-sm">Color del Texto </span>
            <ColorPicker setColor={setTextColor} color={textColor} />
          </div>
          <div className="flex flex-row "></div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center py-6">
        <h2 className="text-lg ">Eventos Por Mes</h2>
        <nav className="flex flex-row justify-center flex-wrap w-[80%] border-solid border-2 border-slate-200 shadow-md rounded-md py-4 px-1 gap-3">
          {eventsRegister.map((d, i) => (
            <li key={i} className="list-none ">
              <div className="flex flex-col items-center">
                <div className="flex gap-1">
                  <span className="text-sm">{d.date}</span>
                  <CheckBoxImage index={i} />
                </div>
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
