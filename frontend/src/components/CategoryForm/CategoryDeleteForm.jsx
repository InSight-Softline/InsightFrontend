import {Button, FormControl, Input, InputLabel} from "@mui/material";
import React from "react";

export function CategoryDeleteForm({value, onChange = (_value) => {}, onSubmit = () => {} }) {

    const setCategory = (name) => {
        onChange({...value, name: name})
    }

    return (
        <form className="flex flex-col gap-2">
            <div>
                <Typography variant="subtitle1">Kategorie:</Typography>
                <Typography data-cy="category-name" style={{ marginTop: '8px' }}>
                    value={value?.name}
                </Typography>
            </div>
            <Button data-cy="category-form-submit-button" onClick={onSubmit}>Delete</Button>
        </form>
    )
}