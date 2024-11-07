import * as React from 'react';
import Dinero from 'dinero.js';
import { CurrencyTextField } from '../dist/material-ui-currency-textfield';
import { Box, Button, Typography } from '@mui/material';

export const App: React.FC = () => {
  const [brutto, setBrutto] = React.useState<Dinero.Dinero>(
    Dinero({ amount: 5000, currency: 'EUR', precision: 2 }),
  );
  const [addBrutto, setAddBrutto] = React.useState<Dinero.Dinero | undefined>(
    undefined,
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
      <CurrencyTextField
        label={'Zusätzliches Einkommen'}
        name={'add-einkommen'}
        value={addBrutto}
        variant={'outlined'}
        currencySymbol="€"
        currency="EUR"
        precision={2}
        minimumValue={0}
        InputLabelProps={{
          shrink: true,
        }}
        decimalCharacter=","
        digitGroupSeparator="."
        placeholder="0.00"
        onChange={(value) => {
          setAddBrutto(value);
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
      <Typography>
        Dinero amount: {brutto.getAmount() + (addBrutto?.getAmount() || 0)}
      </Typography>
    </Box>
  );
};
