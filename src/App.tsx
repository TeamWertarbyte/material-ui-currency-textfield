import * as React from 'react';
import Dinero from 'dinero.js';
import CurrencyTextField from '../lib/components/CurrencyTextField';
import { Typography } from '@mui/material';

export const App: React.FC = () => {
  const [brutto, setBrutto] = React.useState<Dinero.Dinero>(
    Dinero({ amount: 133742, currency: 'EUR', precision: 2 }),
  );

  return (
    <div>
      <CurrencyTextField
        label={'Einkommen'}
        name={'einkommen'}
        value={brutto}
        variant={'outlined'}
        currencySymbol="€"
        currency="EUR"
        precision={2}
        minimumValue={0}
        decimalCharacter=","
        digitGroupSeparator="."
        onChange={(value) => {
          setBrutto(value);
        }}
      />
      <Typography>Dinero amount: {brutto.getAmount()}</Typography>
    </div>
  );
};
