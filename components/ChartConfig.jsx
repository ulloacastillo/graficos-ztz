import { useChartSettings } from '@/app/store/store';

function ChartConfig() {
  const chartSettings = useChartSettings((state) => state.chartSettings);
  const setSettings = useChartSettings((state) => state.setChartSettings);
  const handleChange = (e) => {
    setSettings(e.target.value);
    console.log(chartSettings);
  };

  return (
    <div>
      <select name="themes" onChange={handleChange} value={chartSettings.theme}>
        <option value="default">Sin Temática</option>
        <option value="Halloween">Halloween</option>
        <option value="Navidad">Navidad</option>
      </select>
      {chartSettings.theme}
    </div>
  );
}

export default ChartConfig;
