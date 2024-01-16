import { useChartSettings } from '@/app/store/store';

function ChartConfig() {
  const theme = useChartSettings((state) => state.theme);
  const setTheme = useChartSettings((state) => state.setTheme);
  const useImage = useChartSettings((state) => state.useImage);
  const setUseImage = useChartSettings((state) => state.setUseImage);
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
    </div>
  );
}

export default ChartConfig;
