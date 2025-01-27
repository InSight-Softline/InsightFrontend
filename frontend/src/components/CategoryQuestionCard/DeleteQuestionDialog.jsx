import {BaseDialog} from "./BaseDialog.jsx";
import {QuestionDeleteForm} from "../QuestionForm/QuestionDeleteForm.jsx";
import {useState} from "react";

export default function DeleteQuestionDialog ({onClose, open, onSubmit, deleteQuestion}) {
    return (
        <BaseDialog title="Frage löschen" onClose={onClose} open={open}>
            <QuestionDeleteForm 
                question={deleteQuestion} 
                onSubmit={()=>onSubmit(deleteQuestion)}>
            </QuestionDeleteForm>
        </BaseDialog>
    )
}