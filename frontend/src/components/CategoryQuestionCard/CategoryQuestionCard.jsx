import ExpandableCard from "./ExpandableCard.jsx";
import QuestionTable from "./QuestionTable.jsx";


export default function CategoryQuestionCard({onOpen, children, questions, category, onAddQuestion, onDeleteQuestion, onDeleteCategory}) {

    const handleExpandChange = (expanded) => {
        if(expanded) {
            onOpen?.();
        }
    }

    const handleDeleteCategory = ()=>{
        onDeleteCategory?.(category)
    }

    const handleNew = () => {
        onAddQuestion?.();
    }

    const handleDelete = (question)=>{
        onDeleteQuestion?.(question)
    }


    return (
        <ExpandableCard onExpandChange={handleExpandChange} title={category?.name} onDelete={handleDeleteCategory}>
            {children ? children : <QuestionTable questions={questions} onNew={handleNew} onDelete={handleDelete}></QuestionTable>}
        </ExpandableCard>
    )
}