import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {useState} from "react";

/**
 * CheckboxSelect-Komponente
 *
 * Eine React-Komponente, die eine Gruppe von Checkboxen basierend auf den bereitgestellten Optionen rendert.
 * Es kann immer nur eine Checkbox gleichzeitig ausgewählt sein, und das Label der ausgewählten Checkbox
 * wird an die onChange-Rückruffunktion übergeben.
 *
 * @component
 * @param {Object} props - Die Eigenschaften für die Komponente.
 * @param {string} props.value - Der aktuell ausgewählte Wert.
 * @param {Array<string>} props.options - Ein Array mit den Labels für jede Checkbox-Option.
 * @param {function} props.onChange - Rückruffunktion, um Änderungen der Auswahl zu behandeln.
 *
 * @example
 * <CheckboxSelect
 *     value={selectedOption}
 *     options={["Option 1", "Option 2", "Option 3"]}
 *     onChange={(newValue) => setSelectedOption(newValue)}
 * />
 */

export function CheckboxSelect({ value, options, onChange }) {

    /**
     * Behandelt Änderungen des Checkbox-Status.
     *
     * @param {Object} event - Das durch die Checkbox-Änderung ausgelöste Ereignis.
     * @param {string} label - Das Label der Checkbox, die geändert wurde.
     */
    const handleCheckboxChange = (event, label) => {
        const isChecked = event.target.checked;

        if (!isChecked) {
            onChange(null);
        } else {
            onChange(label);
        }
    }

    return (
        <FormGroup className="px-5 flex justify-center" row>
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