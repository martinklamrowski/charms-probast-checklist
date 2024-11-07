export function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input {...props}
      type="text" className="input input-bordered px-4 py-2 rounded"
    >
    </input>
  );
}