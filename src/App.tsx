import * as React from 'react';
import Dinero from 'dinero.js';
import { CurrencyTextField } from '../dist/material-ui-currency-textfield';
import { Box, Button, Typography } from '@mui/material';

export const App: React.FC = () => {
  const [brutto, setBrutto] = React.useState<Dinero.Dinero>(
    Dinero({ amount: 5000, currency: 'EUR', precision: 2 }),
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200 }}
    >
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setBrutto((prev) =>
            prev.add(Dinero({ amount: 5000, currency: 'EUR' })),
          );
        }}
      >
        50 € hinzufügen
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setBrutto(() => Dinero({ amount: 5000, currency: 'EUR' }));
        }}
      >
        Auf 50 € setzen
      </Button>
      <Typography>Dinero amount: {brutto.getAmount()}</Typography>
    </Box>
  );
};
