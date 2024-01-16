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

  const handleCheckBox = (e) => {
    setUseImage(!useImage);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <select name="themes" onChange={handleChange} value={theme}>
        <option value="default">Sin Temática</option>
        <option value="Halloween">Halloween</option>
        <option value="Navidad">Navidad</option>
      </select>
      <label>
        Usar imagen subida
        <input
          type="checkbox"
          onChange={handleCheckBox}
          checked={useImage}
        ></input>
      </label>
      <div>
        <nav>
          {eventsRegister.map((d, i) => (
            <li key={i}>
              <div>
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
