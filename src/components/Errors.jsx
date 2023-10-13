export default function Errors(props) {
  if (props.messages.length <= 0) {
    return;
  }

  return (
    <div className="mb-4 px-4 py-2 border-2 border-solid border-red-600 bg-red-300 text-red-600">
      <ul>
        {props.messages.map((msg) => (
          <li>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
