import React, { useState } from 'react';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import TextField, { TextFieldProps } from '@mui/material/TextField';

/**
 * Props for the CurrencyTextField component.
 *
 * Extends Material UI's TextFieldProps, excluding 'onChange' and 'defaultValue'.
 */
interface CurrencyTextFieldProps
  extends Omit<TextFieldProps, 'onBlur' | 'onChange' | 'defaultValue'> {
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
  minimumValue?: string | number;

  /**
   * The maximum allowable value as a string.
   * Defaults to '10000000000000'.
   */
  maximumValue?: string | number;

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

  /**
   * Callback function that is called when the input loses focus.
   * Receives the event and value as arguments.
   */
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string | number,
  ) => void;
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
  onBlur,
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
    if (onChange) {
      if (outputFormat === 'number') {
        onChange(values.floatValue || 0, values.formattedValue);
      } else {
        onChange(values.value, values.formattedValue);
      }
    }

    setInternalValue(values.value);
  };

  /**
   * Handle the blur event for the input field.
   *
   * @param {React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>} event - The blur event.
   */
  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (onBlur) {
      onBlur(event, internalValue);
    }
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
      onBlur={handleBlur}
      onValueChange={handleValueChange}
      {...props}
      type={'text'}
    />
  );
};

export default CurrencyTextField;
