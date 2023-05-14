const Input = ({ placeholder, disabled, value, onChange }) => (
  <input
    type="text"
    className="block w-full rounded-lg border border-zinc-300 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-indigo-500"
    placeholder={placeholder}
    disabled={disabled}
    value={value}
    onChange={onChange}
  />
);

export default Input;
