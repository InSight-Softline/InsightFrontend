import {Button, FormControl, Input, InputLabel} from "@mui/material";
import React from "react";

export function CategoryForm({value, onChange = (_value) => {}, onSubmit = () => {} }) {

    const setCategory = (name) => {
        onChange({...value, name: name})
    }

    return (
        <form className="flex flex-col gap-2">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
                <Input data-cy="category-form-category-name" value={value.name} onChange={(e) => setCategory(e.target.value)}></Input>
            </FormControl>
            <Button data-cy="category-form-submit-button" onClick={onSubmit}>Submit</Button>
        </form>
    )
}