export function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button {...props} className="btn btn-primary">
      {props.children}
    </button>
  );
}