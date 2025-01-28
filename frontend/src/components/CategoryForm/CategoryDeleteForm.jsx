import {Button, Typography} from "@mui/material";
import React from "react";

export function CategoryDeleteForm({category, onSubmit = () => {} }) {

    return (
        <form className="flex flex-col gap-2">
            <div>
                <Typography variant="subtitle1">Kategorie:</Typography>
                <Typography data-cy="category-name" style={{ marginTop: '8px' }}>
                    {category?.name}
                </Typography>
            </div>
            <Button data-cy="category-form-submit-button" onClick={onSubmit}>Delete</Button>
        </form>
    )
}