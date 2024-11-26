
# AuditGrid

## Props

### data

- Type: `array`
- Default: `[]`
  
The audit data to display in the grid format.

### loading

- Type: `boolean`
- Default: `false`

Indicates if the data is currently loading.

### error

- Type: `object` or `null`
- Default: `null`

Represents an error, if any, in loading the data.

## Usage

### Basic Usage

```jsx
import AuditGrid from "./AuditGrid";

<AuditGrid 
    data={[{ id: 1, name: "Audit 1" }, { id: 2, name: "Audit 2" }]}
    loading={false}
    error={null}
/>
```

---

# AuditGridItem

## Props

### audit

- Type: `object`
  
The audit object representing a single audit item in the grid.

## Usage

### Basic Usage

```jsx
import { AuditGridItem } from "./AuditGridItem";

<AuditGridItem 
    audit={{ id: 1, name: "Audit 1", description: "Sample audit" }}
/>
```

---

# NewAuditGridItem

This component renders a button or element to create a new audit item.

## Usage

### Basic Usage

```jsx
import { NewAuditGridItem } from "./NewAuditGridItem";

<NewAuditGridItem />
```

---

# AuditGrid.cy.jsx

This file seems to be a Cypress test file for `AuditGrid`. Ensure that the test checks loading, error, and rendering of audit data.
