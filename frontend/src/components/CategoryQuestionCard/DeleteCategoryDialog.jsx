import {BaseDialog} from "./BaseDialog.jsx";
import {useState} from "react";
import {CategoryDeleteForm} from "../CategoryForm/CategoryDeleteForm.jsx";

export default function DeleteCategoryDialog ({onClose, open, onSubmit, deleteCategory}) {
    const [category, setCategory] = useState({
        id: deleteCategory,
    });
    return (
        <BaseDialog title="Kategorie löschen" onClose={onClose} open={open}>
            <CategoryDeleteForm 
            value={category} onChange={setCategory} onSubmit={()=>onSubmit(category)}>

            </CategoryDeleteForm>
        </BaseDialog>
    )
}