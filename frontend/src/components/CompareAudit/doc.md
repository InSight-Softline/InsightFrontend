# Component Documentation


## AuditDropdown Component

### Description
The `AuditDropdown` component renders a dropdown menu for selecting an audit to compare.

### Props
- **`audits`** (Array):
  The list of available audits. Each audit should have an `id` and `name`.
- **`onAuditSelect`** (Function):
  Callback function triggered when an audit is selected.

### Functionality
- Filters out the already selected audit from the dropdown.
- Calls the `onAuditSelect` function with the selected audit.

### Key Methods
- **Dropdown `onChange` Handler**:
  - Extracts the selected audit ID from the dropdown.
  - Finds the matching audit in the `audits` array.
  - Passes the selected audit to `onAuditSelect`.

---

## AuditComparisonCard Component

### Description
The `AuditComparisonCard` component displays detailed comparison data for an audit, including overall progress, category-wise progress, and a point distribution chart.

### Props
- **`name`** (string):
  The name of the audit.
- **`progress`** (number):
  The overall progress of the audit in percentage.
- **`categories`** (Array):
  Array of objects representing category progress. Each object contains:
  - `name` (string): The category name.
  - `progress` (number): The category progress percentage.
- **`distribution`** (Array):
  Array representing the point distribution for the bar chart.

### Functionality
- Displays a progress bar for the overall progress.
- Displays circular progress indicators for each category.
- Displays a bar chart for the point distribution.

### Key Methods
- **ProgressBar Rendering**:
  - Displays the `progress` prop as a percentage.
- **Category Mapping**:
  - Iterates through `categories` to render circular progress indicators.
- **Bar Chart**:
  - Uses the `distribution` array to render a bar chart with predefined colors.
