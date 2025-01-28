/**
 * CategoryTitle Component
 *
 * Component for equally displayed category titles on PerformAudit page.
 *
 * @param children - title which should be displayed
 * @param props - more optional props like data-cy for testing
 * @returns {JSX.Element} - rendered category title
 */
const CategoryTitle = ({ children, ...props }) => {
    return(
        <h2 className="py-1 text-xl" {...props}>
            {children}
        </h2>
    )
}

export default CategoryTitle;