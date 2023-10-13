export default function Header(props) {
  return (
    <div className="mb-4">
      {((!props.size) || (props.size === "xl")) && (
        <h1 className="font-bold text-2xl">{props.label}</h1>
      )}
      {props.size === "lg" && (
        <h2 className="font-bold text-lg">{props.label}</h2>
      )}
      {props.size === "md" && (
        <h3 className="font-bold text-md">{props.label}</h3>
      )}
      {props.size === "sm" && (
        <h4 className="font-bold text-sm">{props.label}</h4>
      )}
    </div>
  );
}
