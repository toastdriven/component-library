export default function Select(props) {
  function handleSelect(ev) {
    const newValue = ev.target.value;
    props.onChange(newValue);
  }

  return (
    <select
      name={props.name}
      className="p-2 bg-white border-solid border-2 border-grey-500 rounded-md w-full"
      onInput={handleSelect}
    >
      {props.options.map((option) => (
        <option
          value={option.value}
          selected={props.value.toString() === option.value.toString()}
          disabled={option.disabled === true}
        >{option.name}</option>
      ))}
    </select>
  );
}
