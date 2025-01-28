import ExpandableCard from "./ExpandableCard.jsx";
import QuestionTable from "./QuestionTable.jsx";


export default function CategoryQuestionCard({onOpen, children, questions, category, onAddQuestion, onDeleteCategory, onDeleteQuestion}) {

    const handleExpandChange = (expanded) => {
        if(expanded) {
            onOpen?.();
        }
    }

    const handleDeleteCategory = (category)=>{
        console.log("Verbindung steht mit Button, Kategorie:", category.id)
        onDeleteCategory?.(category)
    }

    const handleNew = () => {
        onAddQuestion?.();
    }

    const handleDelete = (question)=>{
        onDeleteQuestion?.(question)
    }

    return (
        <ExpandableCard onExpandChange={handleExpandChange} title={category.name} onDeleteCategory={handleDeleteCategory}>
            {children ? children : <QuestionTable questions={questions} onNew={handleNew} onDelete={handleDelete}></QuestionTable>}
        </ExpandableCard>
    )
}