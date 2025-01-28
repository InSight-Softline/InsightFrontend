import {BaseDialog} from "./BaseDialog.jsx";
import {useState} from "react";
import {CategoryForm} from "../CategoryForm/CategoryForm.jsx";

export default function NewCategoryDialog ({onClose, open, onSubmit}) {
    const [category, setCategory] = useState({
        name: "",
    });
    return (
        <BaseDialog title="Kategorie anlegen" onClose={onClose} open={open}>
            <CategoryForm value={category} onChange={setCategory} onSubmit={()=>onSubmit(category)}></CategoryForm>
        </BaseDialog>
    )
}