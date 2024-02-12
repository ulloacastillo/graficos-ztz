import { useState } from 'react';

function TextArea(props) {
  const [setScrollOffset] = useState(0);

  const { value, handler, title, placeholder } = props;

  const lineNumber = value.split('\n').length;

  const handleScroll = (event) => {
    console.log(event.currentTarget.scrollTop);
    setScrollOffset(event.currentTarget.scrollTop);
  };
  return (
    <div className="w-full px-8 relative overflow-hidden">
      <h3 className="mb-4 font-bold text-2xl text-black dark:text-black">
        {title}
      </h3>

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
