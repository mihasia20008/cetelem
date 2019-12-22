import React from 'react';

import _get from 'lodash/get';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { adminDealersRequests } from '../../../../../../../api';

function AutocompleteWrapper(props) {
  const { type, label, error, helperText, id, value, regionId, onSelect } = props;

  const [inputValue, setInputValue] = React.useState(value);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleChangeInput = event => {
    setInputValue(event.target.value);
  };

  React.useEffect(() => {
    let active = true;

    if (inputValue === '' || regionId === -1) {
      setOptions([]);
      return undefined;
    }

    (async () => {
      const { error: reqError, data } =
        type === 'regions'
          ? await adminDealersRequests.findRegion(inputValue)
          : await adminDealersRequests.findCity(regionId, inputValue);

      if (reqError) {
        setOptions([]);
        return;
      }

      if (active) {
        const list = _get(data, 'regions.options', []);
        setOptions(list);
      }
    })();

    return () => {
      active = false;
    };
  }, [inputValue, regionId, type]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelect = (event, select) => {
    onSelect(type, select);
  };

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, selected) => option.name === selected.name}
      getOptionLabel={option => option.name}
      options={options}
      autoComplete
      freeSolo
      onChange={handleSelect}
      defaultValue={{ id, name: value }}
      disabled={type === 'cities' && regionId === -1}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          fullWidth
          variant="outlined"
          value={inputValue}
          error={error}
          helperText={helperText}
          autoComplete="off"
          onChange={handleChangeInput}
        />
      )}
    />
  );
}

export default AutocompleteWrapper;
