import {Autocomplete, debounce, TextField} from '@mui/material';
import {useCallback, useMemo} from "react";


export const TextSearch = ({
                               options = [], value = "", onChange, placeholder, onSearchChange = (_value) => {
    }, debounceTime = 1000, loading = false
                           }) => {
    const setValue = useCallback((newValue) => {
        onChange(newValue);
    }, [onChange])

    const debounceSearchUpdate = useMemo(
        () =>
            debounce((value) => {
                onSearchChange(value);
            }, debounceTime),
        [debounceTime, onSearchChange],
    );

    const onInputChange = useCallback((event) => {
        debounceSearchUpdate(event.target.value);
    }, [debounceSearchUpdate])

    return (
        <Autocomplete
            options={options}
            loading={loading}
            value={value}
            filterOptions={(x) => x}
            noOptionsText={"No results found"}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => (
                <TextField {...params} onChange={onInputChange} label={placeholder} fullWidth/>
            )}
        />
    )
}