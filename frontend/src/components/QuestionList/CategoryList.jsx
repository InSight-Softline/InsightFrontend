import {CategoryListItem} from "./CategoryListItem.jsx";

/**
 * CategoryList Component
 *
 * Renders a list of categories, where each category contains its associated questions.
 *
 * @param {Array} categories - An array of category objects. Each category is expected to have the following structure:
 *                             {
 *                               id: number,
 *                               name: string,
 *                               questions: [
 *                                   {
 *                                       id: number,
 *                                       question: string,
 *                                       points: number | null,
 *                                       nA: boolean | null,
 *                                       comment: string
 *                                   },
 *                                   ...
 *                               ]
 *                             }
 * @param {Array.<string|number>} options - Array of options (labels) for each question's response, such as points (0-5) and "N/A."
 * @param {Function} onChange - A callback function triggered when a category or its associated questions are updated.
 *                              It receives two arguments:
 *                              1. `newCategories`: The updated array of categories.
 *                              2. `updatedQuestion`: The question object that was updated.
 * @returns {JSX.Element} - A React component that renders the list of categories.
 *
 * The component works as follows:
 * - Iterates through the `categories` array and renders each category using the `CategoryListItem` component.
 * - Handles changes to a category or its questions through the `handleCategoryChange` function, which:
 *    1. Updates the corresponding category in the `categories` array.
 *    2. Calls the `onChange` callback with the updated categories and the specific question that was modified.
 * - Each `CategoryListItem` receives the current category, options, and the `handleCategoryChange` function as props.
 */
export function CategoryList({ categories, options, onChange }) {

    const handleCategoryChange = (newCategory, updatedQuestion) => {
        const newCategories = categories.map((category) => newCategory.id === category.id? {...category, ...newCategory} : category);
        onChange(newCategories, updatedQuestion);
    }

    return (
        <div className="category-list">
            {categories.map((category) => (
                <div key={category.id}>
                    <CategoryListItem
                        category={category}
                        options={options}
                        onChange={handleCategoryChange}
                    />
                </div>
            ))};
        </div>
    )
}
