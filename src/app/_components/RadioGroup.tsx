interface Props {
  label: string;
  children: React.ReactNode;
}
const RadioGroup = ({ label, children }: Props) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div className="flex gap-4">{children}</div>
    </fieldset>
  );
};
export default RadioGroup;
