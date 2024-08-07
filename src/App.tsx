import * as React from 'react';
import Dinero from 'dinero.js';
import CurrencyTextField from '../lib/components/CurrencyTextField';

export const App: React.FC = () => {
  const [brutto, setBrutto] = React.useState(1337.42);

  function euro(amount: string): Dinero.Dinero {
    const [euro, cents] = amount.split('.');
    return Dinero({
      amount:
        (parseInt(euro, 10) || 0) * 100 +
        (parseInt(cents?.padEnd(2, '0'), 10) || 0),
      currency: 'EUR',
      precision: 2,
    });
  }

  return (
    <div>
      <CurrencyTextField
        label={'Einkommen'}
        name={'einkommen'}
        value={brutto}
        variant={'outlined'}
        currencySymbol="€"
        minimumValue={0}
        outputFormat="string"
        decimalCharacter=","
        digitGroupSeparator="."
        onBlur={(_event, value) => {
          const brutto = euro(value.toString());
          setBrutto(brutto.getAmount());
        }}
        helperText={`Dinero amount: ${brutto}`}
      />
    </div>
  );
};
