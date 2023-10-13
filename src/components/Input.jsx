export default function Input(props) {
  function handleChange(ev) {
    const newValue = ev.target.value;
    props.onChange(newValue);
  }

  return (
    <input
      type={(!props.type) ? "text" : props.type}
      name={props.name}
      value={props.value}
      onInput={handleChange}
      className="p-2 border-solid border-2 border-grey-500 rounded-md w-full"
    />
  );
}
