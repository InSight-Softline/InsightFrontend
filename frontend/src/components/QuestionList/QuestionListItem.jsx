import { FormGroup} from "@mui/material";
import React, {useMemo} from "react";
import {CheckboxSelect} from "./CheckboxSelect.jsx";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
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
    const Textarea = useMemo(()=>styled(BaseTextareaAutosize)(
        ({ theme }) => `
    box-sizing: border-box;
    width: 95%;
    margin: 2.5%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? '#fff' : '#000'};
    background: ${theme.palette.mode === 'dark' ? '#000' : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? '#555' : '#ddd'};
    &:hover {
      border-color: #3399FF;
    }
    &:focus {
      outline: 0;
      border-color: #3399FF;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
    &:focus-visible {
      outline: 0;
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
        <div key={question.id}>
            <h2 className="px-10 py-5" data-cy="question-text">{question.question}</h2>
            <FormGroup className="px-5 flex justify-center" row>
                <CheckboxSelect
                    value={insertValue()}
                    options={options}
                    onChange={handleCheckboxChange}
                />
            </FormGroup>
            <Textarea
                data-cy="question-comment"
                placeholder='Kommentar eingeben'
                value={question.comment}
                onChange={(event) => handleCommentInput(event)}
            />
        </div>
    )
}