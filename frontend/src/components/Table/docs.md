
# Component Documentation

## Table Component

### Description
The `Table` component is responsible for displaying a set of selectable and selected items. Users can add items to a selected list or remove them as needed. It is designed to manage item selection and provide a list structure.

### Props
- **value**: `Array` - An array of selected item IDs.
- **options**: `Array` - An array of available options to select from.
- **onChange**: `Function` - A callback function to handle changes in the selected items.

### Usage
```jsx
import { Table } from "./Table.jsx";

<Table
    value={selectedItems}
    options={availableOptions}
    onChange={handleItemChange}
/>
```

---

## TableColumn Component

### Description
The `TableColumn` component serves as a container for `TableItem` components and enables drag-and-drop functionality within the column. It receives items as props and renders each item with the ability to drag.

### Props
- **title**: `String` - The title of the column.
- **items**: `Array` - An array of items to display in the column.
- **onDropItem**: `Function` - A callback function triggered when an item is dropped in the column.

### Usage
```jsx
import { TableColumn } from "./TableColumn.jsx";

<TableColumn
    title="Column Title"
    items={columnItems}
    onDropItem={handleDropItem}
/>
```

---

## TableItem Component

### Description
The `TableItem` component represents a single item in the table, which can be dragged and dropped within a column. It displays a title and manages drag events.

### Props
- **id**: `String` - The unique identifier for the item.
- **title**: `String` - The display title of the item.
- **onDragStart**: `Function` - A callback function triggered when the drag process begins.

### Usage
```jsx
import { TableItem } from "./TableItem.jsx";

<TableItem
    id="unique-item-id"
    title="Item Title"
    onDragStart={handleDragStart}
/>
```
