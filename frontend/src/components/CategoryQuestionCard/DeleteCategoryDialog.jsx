import {BaseDialog} from "./BaseDialog.jsx";
import {useState} from "react";
import {CategoryDeleteForm} from "../CategoryForm/CategoryDeleteForm.jsx";

export default function DeleteCategoryDialog ({onClose, open, onSubmit, deleteCategory}) {
    return (
        <BaseDialog title="Kategorie löschen" onClose={onClose} open={open}>
            <CategoryDeleteForm 
                category={deleteCategory} 
                onSubmit={()=>onSubmit(deleteCategory)}>
            </CategoryDeleteForm>
        </BaseDialog>
    )
}