import { Select as SelectUI, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SelectProps {
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const Select = ({ options, value, onChange, placeholder, ...props }: SelectProps) => {
  return (
    <SelectUI {...props} onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[120px] rounded-xl border border-brand-dark-600/20 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
        <SelectValue placeholder={placeholder} className="text-start" />
      </SelectTrigger>
      <SelectContent className="select-item__content">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="select-item__model hover:!bg-brand-dark-600/20"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectUI>
  );
};
