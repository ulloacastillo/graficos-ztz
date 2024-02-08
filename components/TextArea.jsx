import { useState, useRef } from 'react';

function TextArea(props) {
  const [scrollOffset, setScrollOffset] = useState(0);

  const { value, handler, title, placeholder } = props;

  const lineNumber = value.split('\n').length;

  const arr = new Array(lineNumber).fill(0);
  const handleScroll = (event) => {
    console.log(event.currentTarget.scrollTop);
    setScrollOffset(event.currentTarget.scrollTop);
  };
  return (
    <div className="w-full px-8 relative overflow-hidden">
      <h3 className="mb-4 font-bold text-2xl text-black dark:text-black">
        {title}
      </h3>

      {/* {arr.map((_, i) => (
          <span
            className={`block text-sm text-slate-400 font-extralight `}
            key={i}
          >
            {i + 1}
          </span>
        ))} */}

      <textarea
        onScroll={handleScroll}
        placeholder={placeholder}
        className="w-full h-60 text-sm font-light pl-1"
        value={value}
        rows={10}
        onChange={handler}
      ></textarea>
    </div>
  );
}

export default TextArea;
