import { useChartSettings } from '@/app/store/store';

function SelectEvent(props) {
  const eventsRegister = useChartSettings((state) => state.events);
  const setEvents = useChartSettings((state) => state.setEvents);
  const { index } = props;

  const EVENTS = [
    { id: 0, name: 'Fiestas', icon: '🎅🏼' },
    { id: 1, name: 'Cyber', icon: '🛍️' },
  ];

  const ICONS = {
    Fiestas: '🎅🏼',
    Cyber: '🛍️',
  };

  const handleChange = (e) => {
    setEvents(
      eventsRegister.map((ev, i) => {
        if (i === index) {
          return { ...ev, icon: ICONS[e.target.value] };
        }
        return { ...ev };
      }),
    );
  };
  return (
    <select
      name="monthEvent"
      onChange={handleChange}
      className="bg-transparent"
    >
      <option selected value={'none'}>
        🔘
      </option>
      {EVENTS.map((e) => (
        <option value={e.name}>{e.icon}</option>
      ))}
    </select>
  );
}

export default SelectEvent;
