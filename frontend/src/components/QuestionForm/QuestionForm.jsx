import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React from "react";

export function QuestionForm({
                                 value, onChange = (_value) => {
    }, categoryOptions = [], onSubmit = () => {
    }
                             }) {

    const setQuestion = (name) => {
        onChange({...value, name: name})
    }

    const setCategory = (cat) => {
        onChange({...value, category: cat})
    }

    return (
        <form className="flex flex-col gap-2">
            <FormControl fullWidth>
                <TextField
                    data-cy="question-form-question-name"
                    label="Frage"
                    value={value?.name}
                    onChange={(e) => setQuestion(e.target.value)}
                    multiline
                    minRows={1}
                    fullWidth
                />
            </FormControl>
            {categoryOptions && <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
                <Select
                    data-cy="question-form-category-select"
                    value={value?.category}
                    onChange={(event) => setCategory(event.target.value)}
                    label="Kategorie" >
                    {categoryOptions.map(cat => (
                        <MenuItem data-cy="question-form-category-item" value={cat?.id} key={cat.id}>{cat?.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>}
            <Button data-cy="question-form-submit-button" onClick={onSubmit}>Submit</Button>
        </form>)
}