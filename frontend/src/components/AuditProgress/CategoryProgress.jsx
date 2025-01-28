/**
 * CategoryProgress Component
 *
 * Displays the progress of a specific category with a title,
 * a numerical progress indicator (e.g., "2/5"), and a visual progress bar.
 *
 * @param {string} name - The name of the category.
 * @param {number} answeredQuestions - The number of questions that have been answered in this category.
 * @param {number} totalQuestions - The total number of questions in this category.
 * @returns {JSX.Element} - A rendered category progress indicator.
 */
export function CategoryProgress({ name, answeredQuestions, totalQuestions}) {
    const percentage = (answeredQuestions/totalQuestions)*100;

    return (
        <div className="mb-1">
            {/* Top row with the category name and progress text */}
            <div className="flex justify-between items-center">

                {/* Display the category name */}
                <div className="text-gray-900 text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap" data-cy="category-name">
                    {name}
                </div>

                {/* Display answered questions out of total questions */}
                <div className="text-sm text-gray-600" data-cy="answered-out-of-total">
                    {`${answeredQuestions}/${totalQuestions}`}
                </div>
            </div>

            {/* Progress bar indicating the percentage of answered questions */}
            <div className="mt-2 h-2 w-full bg-gray-200 rounded">
                <div
                    className="h-2 bg-red-600 rounded"
                    style={{ width: `${percentage}%` }}
                    data-cy="category-progress-bar"
                />
            </div>
        </div>
    );
}