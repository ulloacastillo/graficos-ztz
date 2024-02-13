function Select(props) {
  const { options, id, onChange, label, className } = props;
  return (
    <>
      <label className="text-sm font-normal" htmlFor={id}>
        {label}
      </label>
      <select
        name={id}
        id={id}
        onChange={onChange}
        className={'text-sm font-normal' + ' ' + className}
      >
        {options.map((op) => (
          <option
            className="text-sm font-normal text-blue-600"
            key={op.id}
            value={op.value}
            defaultValue={op.id === 1}
          >
            {op.text}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
