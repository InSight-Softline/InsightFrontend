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
export const downloadPdf = async (auditId) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const response = await fetch(`${backendUrl}/v1/audits/${auditId}/export`, {
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
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 500);

        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };


