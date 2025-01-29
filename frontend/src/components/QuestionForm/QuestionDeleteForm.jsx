    import {Button, Typography} from "@mui/material";
    import React from "react";
    import Text from "../Textareas/Text.jsx";

    export function QuestionDeleteForm({
            question, onSubmit = () => {}
                                        }) {

        return (
            <form className="flex flex-col gap-2">
                <Text data-cy="question-name">Frage: {question?.name}</Text>
                <Text data-cy="category-name">Kategorie: {question?.category.name}</Text>

                <Button data-cy="question-form-submit-button" onClick={onSubmit}>Löschen</Button>
            </form>)
    }