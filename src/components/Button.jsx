export default function Button(props) {
  const baseClasses = 'rounded-md border-2 px-4 py-2 font-bold';
  let activeClasses = `${baseClasses} ${props.className}`;

  function handleClick(ev) {
    if (props.onClick) {
      ev.preventDefault();
      return props.onClick();
    }
  }

  return (
    <button
      type={(props.type === 'submit') ? 'submit' : 'button'}
      className={activeClasses}
      onClick={handleClick}
    >{props.label}</button>
  );
}
