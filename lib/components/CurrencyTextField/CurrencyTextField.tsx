import React, { useEffect, useMemo, useState } from 'react';
import Dinero from 'dinero.js';
import { NumericFormat, type NumberFormatValues } from 'react-number-format';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

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
   * ISO 4217 CURRENCY CODES as specified in the documentation
   * Taken from https:// www. iso. org/ iso-4217-currency-codes.html
   * Sorted and parsed
   * Defaults to 'USD'.
   */
  currency?: Dinero.Currency;

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
   * The number of decimal places to display.
   * Defaults to 2.
   */
  precision?: number;

  /**
   * The current value of the text field.
   * Can be a number or a string.
   */
  value?: Dinero.Dinero;

  /**
   * The default value of the text field.
   */
  defaultValue?: Dinero.Dinero;

  /**
   * Callback function that is called when the value changes.
   * Receives the new value and formatted value as arguments.
   */
  onChange?: (value: Dinero.Dinero, formattedValue: string) => void;

  /**
   * Callback function that is called when the input loses focus.
   * Receives the event and value as arguments.
   */
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: Dinero.Dinero,
  ) => void;
}

/**
 * A currency input component built using Material UI's TextField and react-number-format.
 *
 * This component provides a text field for currency input, supporting custom formatting options.
 * It handles value formatting using the NumericFormat component from react-number-format.
 */
const CurrencyTextField: React.FC<CurrencyTextFieldProps> = ({
  decimalCharacter = ',',
  digitGroupSeparator = '.',
  currency = 'USD',
  currencySymbol = '$',
  minimumValue = '-10000000000000',
  maximumValue = '10000000000000',
  precision = 2,
  value,
  defaultValue,
  onBlur,
  onChange,
  ...props
}) => {
  // Internal state to manage the input value.
  const [internalValue, setInternalValue] = useState<Dinero.Dinero>(
    (value || defaultValue) ??
      Dinero({
        amount: 0,
        currency: currency,
        precision: precision,
      }),
  );

  /**
   * TODO: fix loop when precision changes
   */
  useEffect(() => {
    setInternalValue((prevState) => ({
      ...prevState,
      currency: currency,
      precision: precision,
    }));
  }, [currency, precision]);

  /**
   * Handle changes to the input value.
   *
   * @param {NumberFormatValues} values - The values from the NumberFormat component.
   */
  const handleValueChange = (values: NumberFormatValues) => {
    const [euro, cents] = values.value.split('.');

    const dineroValue = Dinero({
      amount: values.value
        ? (parseInt(euro, 10) || 0) * 100 +
          (parseInt(cents?.padEnd(2, '0'), 10) || 0)
        : 0,
      currency: currency,
      precision: precision,
    });

    onChange?.(dineroValue, values.formattedValue);

    setInternalValue(dineroValue);
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

  /**
   * Formats the dinero value to a matching number that can be use in NumericFormat
   */
  const formattedValue = useMemo(() => {
    const amount = internalValue?.getAmount() ?? 0;
    const precision = internalValue?.getPrecision() ?? 2;
    const factor = Math.pow(10, precision);
    return (amount / factor).toFixed(precision);
  }, [internalValue]);

  /**
   * Formats the dinero value to a matching number that can be use in NumericFormat
   */
  const formattedDefaultValue = useMemo(() => {
    const amount = defaultValue?.getAmount() ?? 0;
    const precision = defaultValue?.getPrecision() ?? 2;
    const factor = Math.pow(10, precision);
    return (amount / factor).toFixed(precision);
  }, [defaultValue]);

  return (
    <NumericFormat
      value={formattedValue}
      defaultValue={formattedDefaultValue}
      displayType="input"
      fixedDecimalScale
      decimalScale={precision}
      decimalSeparator={decimalCharacter}
      thousandSeparator={digitGroupSeparator}
      valueIsNumericString
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
