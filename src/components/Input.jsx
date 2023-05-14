const Input = ({ placeholder, disabled, value, onChange }) => (
  <input
    type="text"
    className="block h-12 w-full rounded-xl border-2 bg-white px-4 text-zinc-900 outline-none focus:border-indigo-500"
    placeholder={placeholder}
    disabled={disabled}
    value={value}
    onChange={onChange}
  />
);

export default Input;
