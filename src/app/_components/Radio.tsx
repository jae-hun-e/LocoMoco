interface Props {
  children: React.ReactNode;
  value: string;
  selected: string;
  setSelected: (selected: string) => void;
  disabled?: boolean;
}

const Radio = ({ children, value, selected, setSelected, disabled }: Props) => {
  return (
    <label>
      <input
        className="mr-1 cursor-pointer"
        type="radio"
        name={value}
        value={value}
        checked={selected === value}
        onChange={(e) => setSelected(e.target.value)}
        disabled={disabled}
      />
      {children}
    </label>
  );
};
export default Radio;
