# ExportPdfButton

The `ExportPdfButton` component provides a button for downloading a PDF report associated with a specific audit.

## Props

### auditId

- **Type:** `number`
- **Required:** `true`

The ID of the audit for which the PDF will be generated.

### endpoint

- **Type:** `string`
- **Default:** `null`

## Functionality

The component sends a `GET` request to the API endpoint:  
`http://localhost:8080/api/v1/ratings/{auditId}/export`  
to fetch the PDF report associated with the provided `auditId`. The report is then downloaded as `Audit_{auditId}_Report.pdf`.

### Error Handling

If the API request fails, an error message is logged to the console.

## Usage

### Basic Usage

```jsx
import { ExportPdfButton } from "./ExportPdfButton";

<ExportPdfButton 
    auditId={123}
/>
