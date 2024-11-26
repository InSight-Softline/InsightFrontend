import {QuestionList} from "./QuestionList.jsx";
import Title from "../Textareas/Title.jsx";

/**
 * CategoryListItem Component
 *
 * Renders a single category with its name as a title and a list of associated questions.
 *
 * @param {Object} category - The category object to render. Expected structure:
 *                            {
 *                              id: number,
 *                              name: string,
 *                              questions: [
 *                                  {
 *                                      id: number,
 *                                      question: string,
 *                                      points: number | null,
 *                                      nA: boolean | null,
 *                                      comment: string
 *                                  },
 *                                  ...
 *                              ]
 *                            }
 * @param {Array.<string|number>} options - Array of options (labels) for each question's response, such as points (0-5) and "N/A."
 * @param {Function} onChange - A callback function triggered when a question within the category is updated.
 *                              It receives two arguments:
 *                              1. `newCategory`: The updated category object with its modified questions.
 *                              2. `updatedQuestion`: The question object that was updated.
 * @returns {JSX.Element} - A React component that renders a category title and its list of questions.
 *
 * The component works as follows:
 * - Displays the category name using the `Title` component.
 * - Renders a list of questions using the `QuestionList` component.
 * - Handles updates to the question list through the `handleQuestionChange` function, which:
 *    1. Constructs an updated category object with the new list of questions.
 *    2. Calls the `onChange` callback to propagate the changes to the parent component.
 */
export function CategoryListItem({ category, options, onChange }) {

    const handleQuestionChange = (newQuestionList, updatedQuestion) => {
        const newCategory = {...category, questions: newQuestionList};
        onChange(newCategory, updatedQuestion);
    }

    return (
        <div key={category.id} data-cy={`category-${category.id}`} className="category-list-item">
            <Title data-cy={`category-title-${category.id}`}>{category.name}</Title>
            <QuestionList
                questions={category.questions}
                options={options}
                onChange={handleQuestionChange}
            />
        </div>
    );
}
