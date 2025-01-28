import {LayoutDefault} from "../layouts/LayoutDefault.jsx";
import {Button} from "@mui/material";
import Title from "../components/Textareas/Title.jsx";
import CategoryQuestionCard from "../components/CategoryQuestionCard/CategoryQuestionCard.jsx";
import {Fragment, useCallback, useEffect, useState} from "react";
import api from "../api.js";
import NewQuestionDialog from "../components/CategoryQuestionCard/NewQuestionDialog.jsx";
import AddIcon from "@mui/icons-material/Add";
import NewCategoryDialog from "../components/CategoryQuestionCard/NewCategoryDialog.jsx";
import DeleteQuestionDialog from "../components/CategoryQuestionCard/DeleteQuestionDialog.jsx";
import DeleteCategoryDialog from "../components/CategoryQuestionCard/DeleteCategoryDialog.jsx";

const LazyCategoryQuestionCard = ({category, availableCategories = []}) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openedOnce, setOpenedOnce] = useState(false);
    const [newQuestionDialogOpen, setNewQuestionDialogOpen] = useState(false);
    const [deleteQuestionDialogOpen, setDeleteQuestionDialogOpen] = useState(false);
    const [deleteQuestion, setDeleteQuestion] = useState();    
    const [deleteCategoryDialogOpen, setDeleteCategoryDialogOpen] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState();

    const handleOpen = async () => {
        if (!openedOnce) {
            await fetchQuestions();
            setOpenedOnce(true);
        }
    }

    const fetchQuestions = useCallback(() => {
        setLoading(true);
        return api.get(`/v1/categories/${category.id}/questions`).then((response) => {
            setQuestions(response.data);
        }).finally(() => {
            setLoading(false)
        })
    }, [category])

    const handleAddQuestion = () => {
        setNewQuestionDialogOpen(true)
    }

    const handleDeleteQuestion = (question) => {
        setDeleteQuestionDialogOpen(true),
        setDeleteQuestion(question)
    }

    const handleDeleteCategory = (category) => {
        setDeleteCategoryDialogOpen(true),
        setDeleteCategory(category)
    }


    function handleCreate(newQuestion) {
        api.post('/v1/questions/new', {
            categoryId: newQuestion.category,
            name: newQuestion.name
        }).then(response => {
            setQuestions?.((oldQuestions)=>[...oldQuestions, response.data])
            // todo: show success message
        }).catch(err => {
            alert('Error creating question') // TODO
        }).finally(()=>{
            setNewQuestionDialogOpen(false)
        })
    }

    function handleDeleteQues(deleteQuestion) {
        api.delete(`/v1/questions/${deleteQuestion.id}`, {
        }).then(response => {
            setQuestions?.((oldQuestions) => oldQuestions.filter(question => question.id !== deleteQuestion.id))
            // todo: show success message
        }).catch(err => {
            alert('Error delete question') // TODO
        }).finally(()=>{
            setDeleteQuestionDialogOpen(false)
        })
    }

    const handleDeleteCat = (deleteCategory)=>{
        api.delete(`/v1/categories/${deleteCategory.id}`, {
        }).then((response) => {
            setCategories?.((oldCategories) => oldCategories.filter(category => category.id !== deleteCategory.id))
            // todo: show success message
        }).catch((err) => {
            alert("Fehler beim Löschen der Kategorie: ");
            // todo: error
        }).finally(()=>{
            setDeleteCategoryDialogOpen(false)
        })
    }
    
    return (
        <Fragment>
            <NewQuestionDialog open={newQuestionDialogOpen} initialCategory={category.id}
                               availableCategories={availableCategories}
                               onSubmit={handleCreate}
                               onClose={() => setNewQuestionDialogOpen(false)}></NewQuestionDialog>
            <DeleteQuestionDialog open={deleteQuestionDialogOpen} 
                                  deleteQuestion={deleteQuestion}
                                  onSubmit={handleDeleteQues}
                                  onClose={() => setDeleteQuestionDialogOpen(false)}></DeleteQuestionDialog>
            <DeleteCategoryDialog open={deleteCategoryDialogOpen} 
                                  deleteCategory={deleteCategory}
                                  onSubmit={handleDeleteCat}
                                  onClose={()=>setDeleteCategoryDialogOpen(false)}></DeleteCategoryDialog>
            <CategoryQuestionCard category={category} questions={questions} 
                                  onOpen={handleOpen}
                                  onDeleteCategory={handleDeleteCategory}
                                  onAddQuestion={handleAddQuestion}
                                  onDeleteQuestion={handleDeleteQuestion}>
                {loading ? <div>Loading...</div> : undefined}
            </CategoryQuestionCard>
        </Fragment>
    )
}

/**
 * ManageCategoriesAndQuestions Component
 *
 * This component provides a user interface for managing categories and questions.
 * It includes functionality for exporting and importing questions.
 *
 * @returns {JSX.Element} The rendered component
 * @constructor
 */
export function ManageCategoriesAndQuestions() {

    /**
     * Handle the export questions button click.
     *
     * Creates an anchor element, sets the download attribute to trigger the download
     * of the exported questions as a CSV file, and simulates a click to start the download.
     */
    const handleExportQuestionsClick = () => {
        const link = document.createElement('a');
        link.target = "_blank";
        link.href = (import.meta.env.VITE_BACKEND_URL || "/api") + "/v1/database/export";
        link.setAttribute('download', 'DatabaseExport.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    /**
     * Handle the import questions button click.
     *
     * Placeholder for functionality to import questions.
     * To be implemented in the future.
     */
    const handleImportQuestionsClick = async () => {
        // ToDo: implement functionality
    }

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const fetchCategories = useCallback(() => {
        setCategoriesLoading(true);
        return api.get('/v1/categories').then((response) => {
            setCategories(response.data);
        }).finally(() => {
            setCategoriesLoading(false);
        })
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories]);


    const handleAddedQuestion = ()=>{
        fetchCategories()
    }

    const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);

    const handleNewCategory = (category)=>{
        api.post("/v1/categories/new" , {
            name: category.name,
        }).then((response) => {
            setCategories((oldCategories)=>[...oldCategories, response.data])
            // todo: success message
        }).catch((err) => {
            alert("Fehler beim Erstellen der Kategorie. :(");
            // todo: error
        }).finally(()=>{
            setNewCategoryDialogOpen(false)
        })
    }

    return (
        <LayoutDefault>
            <Title>Kategorien und Fragen verwalten</Title>
            <div className="flex justify-center space-x-4">
                <Button
                    data-cy="ExportQuestionsButton"
                    onClick={handleExportQuestionsClick}
                    variant="outlined"
                    color="error"
                >
                    Daten exportieren
                </Button>
                <Button
                    data-cy="ImportQuestionsButton"
                    onClick={handleImportQuestionsClick}
                    variant="outlined"
                    color="error"
                >
                    Daten importieren
                </Button>
            </div>
            <section className="flex flex-col gap-2 max-w-6xl mx-auto p-2">
                <NewCategoryDialog 
                    open={newCategoryDialogOpen} 
                    onClose={()=>setNewCategoryDialogOpen(false)} 
                    onSubmit={handleNewCategory}>
                </NewCategoryDialog>
                <Button
                    fullWidth
                    startIcon={<AddIcon />}
                    variant="outlined"
                    onClick={()=>setNewCategoryDialogOpen(true)}
                >
                    Kategorie hinzufügen
                </Button>

                {categoriesLoading ? <div>Loading...</div> : categories.map((category, index) =>
                    <LazyCategoryQuestionCard key={category.id} category={category} availableCategories={categories} onAddedQuestion={handleAddedQuestion}/>,
                    <Title>Kategorien und Fragen verwalten</Title>)}
            </section>
        </LayoutDefault>
    )
}