// import React from 'react';
// import { transformData } from '../../src/pages/PerformAudit.jsx';
//
// export const interceptGET = (points, na, comment) => {
//     cy.intercept('GET', '/api/v1/audits/1/ratings', {
//         statusCode: 200,
//         body: [
//             { id: 1, question: "Frage 1", points: points, comment: comment, na: na },
//         ]
//     }).as('questions');
// };
//
// export const interceptPATCH = (points, na, comment) => {
//     cy.intercept('PATCH', '/v1/ratings/0', {
//         statusCode: 200,
//         body: [{ id: 1, question: "Frage 1", points: points, comment: comment, na: na}]
//     });
// };
//
// describe('transformData', () => {
//
//     const backendData = [
//         {
//             category: { id: 1, name: "VPN", deletedAt: null },
//             id: 76,
//             comment: "hi",
//             points: 3,
//             nA: false,
//             question: "VPN id76 Frage 2?"
//         },
//         {
//             category: { id: 1, name: "VPN", deletedAt: null },
//             id: 44,
//             comment: "",
//             points: null,
//             nA: true,
//             question: "VPN id44 Frage 1?"
//         },
//         {
//             category: { id: 2, name: "Network", deletedAt: null },
//             id: 80,
//             comment: "",
//             points: 2,
//             nA: false,
//             question: "Network id80 Frage 5?"
//         },
//         {
//             category: { id: 2, name: "Network", deletedAt: null },
//             id: 24,
//             comment: "Schlecht",
//             points: null,
//             nA: null,
//             question: "Network id24 Frage 4?"
//         },
//         {
//             category: { id: 2, name: "Network", deletedAt: null },
//             id: 11,
//             comment: "Noch schlechter",
//             points: 1,
//             nA: false,
//             question: "Network id 11 Frage 3?"
//         }
//     ];
//
//     beforeEach(() => {
//         interceptGET(null, null, '');
//         cy.visit('http://localhost:5173/#/perform-audit/1');
//     });
//
//     it('should correctly sort and group questions by category and ID', () => {
//         const unsortedData = [...backendData].reverse();
//
//         const expectedOutput = [
//             {
//                 name: "VPN",
//                 id: 1,
//                 questions: [
//                     {
//                         id: 44,
//                         question: "VPN id44 Frage 1?",
//                         points: null,
//                         nA: true,
//                         comment: "",
//                     },
//                     {
//                         id: 76,
//                         question: "VPN id76 Frage 2?",
//                         points: 3,
//                         nA: false,
//                         comment: "hi",
//                     }
//                 ]
//             },
//             {
//                 name: "Network",
//                 id: 2,
//                 questions: [
//                     {
//                         id: 11,
//                         question: "Network id 11 Frage 3?",
//                         points: 1,
//                         nA: false,
//                         comment: "Noch schlechter",
//                     },
//                     {
//                         id: 24,
//                         question: "Network id24 Frage 4?",
//                         points: null,
//                         nA: null,
//                         comment: "Schlecht",
//                     },
//                     {
//                         id: 80,
//                         question: "Network id80 Frage 5?",
//                         points: 2,
//                         nA: false,
//                         comment: "",
//                     }
//                 ]
//             }
//         ];
//
//         const result = transformData(unsortedData);
//
//         expect(result).toEqual(expectedOutput);
//     });
//
//     it('', () => {
//
//     });
//
//     it('', () => {
//
//     });
// });