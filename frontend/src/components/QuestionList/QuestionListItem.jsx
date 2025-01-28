import { FormGroup} from "@mui/material";
import React, {useMemo} from "react";
import {CheckboxSelect} from "./CheckboxSelect.jsx";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

/**
 * QuestionListItem Component
 *
 * This component renders a questiontext, a list of checkboxes and a comment field based on the provided question data and options.
 * It contains event handlers to capture and propagate changes to the checkboxes and comment field.
 *
 * @component
 * @param {Object} question The question object containing question text, points, and comment data.
 * @param {Array.<string|number>} options - Array of options (labels) for each question's response, such as points (0-5) and "N/A."
 * @param {Function} onChange - Callback function that triggers when a question is updated.
 * This function takes the new value and a boolean if the box was checked or unchecked as its argument.
 * @returns {Element}
 * @constructor
 */
export function QuestionListItem({ question, options, onChange }) {
    //Styling for the Comment Sections
    const Textarea = useMemo(()=>styled(TextareaAutosize)(
        ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    margin-top: 1%;
    margin-bottom: 0%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px;
    border-radius: 12px 12px 0px 12px;
    color: #000;
    background: #fff;
    border: 1px solid #ddd;
    &:hover {
      border-color: #4B5563;
    }
    &:focus {
      outline: 0;
      border-color: #4B5563;
      box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.25);
    }
  `
    ), []);

    /**
     * handleCheckboxChange
     *
     * Event handler for checkbox selection changes.
     * Updates the question object with the selected value based on whether the checkbox is selected or not.
     *
     * @param {string} value - The value of the selected checkbox (e.g., a point or "N/A").
     */
    const handleCheckboxChange = (value) => {
        if (value === null) {
            onChange({...question, points: null, nA: null});
        } else {
            if (value === 'N/A') {
                onChange({...question, points: null, nA: true});
            } else {
                onChange({...question, points: value, nA: false});
            }
        }
    }

    /**
     * handleCommentInput
     *
     * Event handler for changes in the comment field.
     * Updates the question object with the new comment text.
     *
     * @param {Object} event - The input event from the comment textarea.
     */
    const handleCommentInput = (event) => {
        const newComment = event.target.value;
        onChange({...question, comment: newComment});
    }

    /**
     * insertValue
     *
     * Determines the initial value for the checkbox selection.
     * Returns "N/A" if the question is marked as "Not Applicable," otherwise returns the points value.
     *
     * @returns {string|number|null} - The current rating of the question, point value, "N/A," or null.
     */
    const insertValue = () => {
        if (question.nA === true) {
            return 'N/A';
        } else {
            return question.points;
        }
    }

    return (
        <div key={question.id} className="py-1">
            <div className="flex items-center justify-between">
                <h3 className="w-3/5" data-cy="question-text">{question.question}</h3>
                <FormGroup className="w-2/5 flex justify-end" row>
                    <CheckboxSelect
                        value={insertValue()}
                        options={options}
                        onChange={handleCheckboxChange}
                    />
                </FormGroup>
            </div>
            <Textarea
                data-cy="question-comment"
                placeholder='Kommentar eingeben'
                value={question.comment}
                onChange={(event) => handleCommentInput(event)}
            />
        </div>
    )
}