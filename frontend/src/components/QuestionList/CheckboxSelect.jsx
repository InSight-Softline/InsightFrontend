import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React from "react";

/**
 * CheckboxSelect Component
 *
 * A React component that renders a group of checkboxes based on the provided options.
 * Only one checkbox can be selected at a time, and the label of the selected checkbox
 * is passed to the onChange callback function.
 *
 * @component
 * @param value - The currently selected value.
 * @param {Array.<string|number>} options - An array containing the labels for each checkbox option.
 * @param {function} onChange - Callback function to handle selection changes.
 * This function takes the new value and a boolean if the box was checked or unchecked as its argument.
 * @returns {Element}
 * @constructor
 */

export function CheckboxSelect({ value, options, onChange }) {

    /**
     * Handles changes to the checkbox status.
     *
     * @param {Object} event - The event triggered by a checkbox change.
     * @param {string} label - The label of the checkbox that was changed.
     */
    const handleCheckboxChange = (event, label) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            onChange(label);
        } else {
            onChange(null);
        }
    }

    return (
        <FormGroup row>
            {options.map((label) => (
                <FormControlLabel
                    key={label}
                    control={
                        <Checkbox
                            checked={value === label}
                            onChange={(event) => handleCheckboxChange(event, label) }
                        />
                    }
                    label={label.toString()}
                />
            ))}
        </FormGroup>
    )
}