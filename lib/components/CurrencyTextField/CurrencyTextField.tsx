import React, { useState } from 'react';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import TextField, { TextFieldProps } from '@mui/material/TextField';

/**
 * Props for the CurrencyTextField component.
 *
 * Extends Material UI's TextFieldProps, excluding 'onChange' and 'defaultValue'.
 */
interface CurrencyTextFieldProps
  extends Omit<TextFieldProps, 'onChange' | 'defaultValue'> {
  /**
   * The character used as the decimal separator.
   * Defaults to '.'.
   */
  decimalCharacter?: string;

  /**
   * The character used as the thousand separator.
   * Defaults to ','.
   */
  digitGroupSeparator?: string;

  /**
   * The symbol used as the currency prefix.
   * Defaults to '$'.
   */
  currencySymbol?: string;

  /**
   * The minimum allowable value as a string.
   * Defaults to '-10000000000000'.
   */
  minimumValue?: string;

  /**
   * The maximum allowable value as a string.
   * Defaults to '10000000000000'.
   */
  maximumValue?: string;

  /**
   * The format of the output value.
   * Can be 'number' or 'string'. Defaults to 'number'.
   */
  outputFormat?: 'number' | 'string';

  /**
   * The current value of the text field.
   * Can be a number or a string.
   */
  value?: number | string;

  /**
   * The default value of the text field.
   * Can be a number or a string.
   */
  defaultValue?: number | string;

  /**
   * Callback function that is called when the value changes.
   * Receives the new value and formatted value as arguments.
   */
  onChange?: (value: number | string, formattedValue: string) => void;
}

/**
 * A currency input component built using Material UI's TextField and react-number-format.
 *
 * This component provides a text field for currency input, supporting custom formatting options.
 * It handles value formatting using the NumericFormat component from react-number-format.
 */
const CurrencyTextField: React.FC<CurrencyTextFieldProps> = ({
  decimalCharacter = '.',
  digitGroupSeparator = ',',
  currencySymbol = '$',
  minimumValue = '-10000000000000',
  maximumValue = '10000000000000',
  outputFormat = 'number',
  value = '',
  defaultValue,
  onChange,
  ...props
}) => {
  // Internal state to manage the input value.
  const [internalValue, setInternalValue] = useState(value);

  /**
   * Handle changes to the input value.
   *
   * @param {NumberFormatValues} values - The values from the NumberFormat component.
   */
  const handleValueChange = (values: NumberFormatValues) => {
    const { floatValue, formattedValue } = values;

    if (onChange) {
      if (outputFormat === 'number') {
        onChange(floatValue || 0, formattedValue);
      } else {
        onChange(values.value, formattedValue);
      }
    }

    setInternalValue(values.value);
  };

  return (
    <NumericFormat
      value={internalValue}
      defaultValue={defaultValue}
      displayType="input"
      decimalSeparator={decimalCharacter}
      thousandSeparator={digitGroupSeparator}
      valueIsNumericString={outputFormat === 'string'}
      prefix={currencySymbol}
      customInput={TextField}
      min={minimumValue}
      max={maximumValue}
      onValueChange={handleValueChange}
      {...props}
      type={'text'}
    />
  );
};

export default CurrencyTextField;
