import { useEffect, useState } from 'react';

function ColorPicker(props) {
  const { setColor, color } = props;

  const [text, setText] = useState(color);
  const regex = new RegExp(`^#(?:[0-9a-fA-F]{6}){1,2}$`);

  const handleChange = (e) => {
    if (regex.test(e.target.value)) {
      setColor(e.target.value);
      setText(e.target.value);
    } else {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    setText(color);
  }, [color]);

  return (
    <div
      className={`flex flex-row items-center gap-2 bg-white px-2 py-1 relative w-fit rounded-full`}
    >
      <div className={`bg-[${color}] w-8 h-8 rounded-full`}>
        <input
          className={`size-full rounded-full border-none left-4 cursor-pointer outline-none bg-transparent`}
          id="colorInput"
          type="color"
          onChange={(e) => {
            setColor(e.target.value);
            setText(e.target.value);
          }}
          value={color}
        />
      </div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="w-16 text-sm text-slate-600"
      />
      <span className="text-sm font-medium pr-2 text-slate-600">HEX</span>
    </div>
  );
}

export default ColorPicker;
