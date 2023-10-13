/**
 * <Header
 *   label="human_readable"
 *   [size="xl" | "lg" | "md" | "sm"]
 * />
 */
export default function Header({ label, size = 'xl', ...props }) {
  return (
    <div className="mb-4">
      {((!size) || (size === "xl")) && (
        <h1 className="font-bold text-2xl">{label}</h1>
      )}
      {size === "lg" && (
        <h2 className="font-bold text-lg">{label}</h2>
      )}
      {size === "md" && (
        <h3 className="font-bold text-md">{label}</h3>
      )}
      {size === "sm" && (
        <h4 className="font-bold text-sm">{label}</h4>
      )}
    </div>
  );
}
