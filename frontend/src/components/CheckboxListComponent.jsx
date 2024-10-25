import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {useState} from "react";



const CheckboxListComponent = ({ value, options, onChange }) => {

    const handleCheckboxChange = (event, label) => {
        const isChecked = event.target.checked;
        console.log(isChecked);

        if (!isChecked) {
            onChange({value: null});
        } else {
            onChange({value: label});
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

export default CheckboxListComponent;