import React from 'react';

/**
 * ExportPdfButton component provides a button for downloading a PDF report
 * associated with a specific audit.
 *
 * @param {number} auditId - The ID of the audit for which the PDF will be generated.
 * @param {string} endpoint - The API endpoint for exporting the PDF (optional, not used currently).
 * @returns {JSX.Element} A button component for initiating the PDF download.
 * @constructor
 */
export function ExportPdfButton({ auditId, endpoint }) {
    const downloadPdf = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/ratings/${auditId}/export`, {
                method: 'GET',
                headers: { 'Accept': 'application/pdf' },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Audit_${auditId}_Report.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <button
            onClick={downloadPdf}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
            Download PDF
        </button>
    );
}
