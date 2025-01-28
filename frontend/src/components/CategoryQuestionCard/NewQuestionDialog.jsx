import {BaseDialog} from "./BaseDialog.jsx";
import {QuestionForm} from "../QuestionForm/QuestionForm.jsx";
import {useState} from "react";

export default function NewQuestionDialog ({onClose, open, availableCategories = [], onSubmit, initialCategory}) {
    const [question, setQuestion] = useState({
        name: "",
        category: initialCategory ?? ""
    });
    return (
        <BaseDialog title="Neue Frage anlegen" onClose={onClose} open={open}>
            <QuestionForm value={question} onChange={setQuestion} onSubmit={()=>onSubmit(question)} categoryOptions={availableCategories}></QuestionForm>
        </BaseDialog>
    )
}