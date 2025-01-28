    import {Button, Typography} from "@mui/material";
    import React from "react";

    export function QuestionDeleteForm({ question, onSubmit = () => {} }) {

        return (
            <form className="flex flex-col gap-2">
                <div>
                    <Typography variant="subtitle1">Frage:</Typography>
                    <Typography data-cy="question-name" style={{ marginTop: '8px' }}>
                        {question?.name}
                    </Typography>
                </div>
                <div>
                    <Typography variant="subtitle1">Kategorie:</Typography>
                    <Typography data-cy="category-name" style={{ marginTop: '8px' }}>
                        {question?.category.name}
                    </Typography>
                </div>

                <Button data-cy="question-form-submit-button" onClick={onSubmit}>Delete</Button>
            </form>)
    }