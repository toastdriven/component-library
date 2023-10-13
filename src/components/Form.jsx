export function InlineFormRow(props) {
  return (
    <div className="grid grid-cols-2 mb-2">
      <label
        for={props.name}
        className="inline-block mr-2 font-bold"
      >{props.label}</label>
      {props.children}
    </div>
  );
}

export function StackedFormRow(props) {
  return (
    <div className="mb-2">
      <label
        for={props.name}
        className="block mb-2 mr-2 font-bold"
      >{props.label}</label>
      {props.children}
    </div>
  );
}

export function Form(props) {
  function handleSubmit(ev) {
    ev.preventDefault();
    props.onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      {props.children}
    </form>
  );
}
