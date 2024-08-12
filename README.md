# CurrencyTextField - React Material UI Component

## Overview

`CurrencyTextField` is a [React][react] component built using [Material UI's][mui] `TextField` and `react-number-format`. It provides a text field for currency input, supporting custom formatting options.

[react]: https://react.dev/
[mui]: https://mui.com/material-ui/

## Usage

```jsx
import * as React from 'react';
import Dinero from 'dinero.js';
import CurrencyTextField from '../lib/components/CurrencyTextField';

export const MyComponent: React.FC = () => {

  const [value, setValue] = React.useState<Dinero.Dinero>();

  return (
    <CurrencyTextField
        label={'Amount'}
        name={'amount'}
        value={value}
        variant={'outlined'}
        currencySymbol="€"
        currency="EUR"
        precision={2}
        minimumValue={0}
        decimalCharacter=","
        digitGroupSeparator="."
        onChange={(value) => {
            setValue(value);
        }}
    />
  );
};
```

## Documentation

### Props

|Name|Type|Default|Description|
|---|---|---|---|
|decimalCharacter|`string`|`'.'`|The character used as the decimal separator.|
|digitGroupSeparator|`string`|`','`|The character used as the thousand separator.|
|currency|`Dinero.Currency`|`'USD'`|ISO 4217 CURRENCY CODES as specified in the [documentation][iso]. Sorted and parsed|
|currencySymbol|`string`|`'$'`|The symbol used as the currency prefix.|
|minimumValue|`string` `number`|`'-10000000000000'`|The minimum allowable value as a string.|
|maximumValue|`string` `number`|`'10000000000000'`|The maximum allowable value as a string.|
|precision|`number`|`2`|The number of decimal places to display.|
|value|`Dinero.Dinero`||The current value of the text field. Can be a number or a string.|
|defaultValue|`Dinero.Dinero`||The default value of the text field.|
|onChange|`func`||Callback function that is called when the value changes. Receives the new value and formatted value as arguments.|
|onBlur|`func`||Callback function that is called when the input loses focus. Receives the event and value as arguments.|

[iso]: https://www.iso.org/iso-4217-currency-codes.html

## Installation

```sh
# npm
npm install @wertarbyte/material-ui-currency-textfield

# yarn
yarn add @wertarbyte/material-ui-currency-textfield
```

## Development

### Testing

The library can be easily testet in dev mode via the provided 'dev' script and App.tsx.

```
# npm
npm run dev

# yarn
yarn dev
```
