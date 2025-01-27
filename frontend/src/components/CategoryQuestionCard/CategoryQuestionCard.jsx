import ExpandableCard from "./ExpandableCard.jsx";
import QuestionTable from "./QuestionTable.jsx";


export default function CategoryQuestionCard({onOpen, children, questions, category, onAddQuestion, onEditQuestion, onDeleteQuestion}) {

    const handleExpandChange = (expanded) => {
        if(expanded) {
            onOpen?.();
        }
    }

    const handleNew = () => {
        onAddQuestion?.();
    }

    const handleDelete = (question)=>{
        onDeleteQuestion?.(question)
    }

    return (
        <ExpandableCard onExpandChange={handleExpandChange} title={category.name}>
            {children ? children : <QuestionTable questions={questions} onNew={handleNew} onDelete={handleDelete}></QuestionTable>}
        </ExpandableCard>
    )
}