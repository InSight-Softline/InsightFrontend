import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React from "react";

const CheckboxListComponent = ({ labels, question, getChecked, handleCheckboxChange }) => {
    return (
        <FormGroup className="px-5 flex justify-center" row>
            {labels.map((label) => (
                <FormControlLabel
                    key={label}
                    control={
                        <Checkbox
                            checked={getChecked(label, question)}
                            onChange={(event) => handleCheckboxChange(event, label, question)}
                        />
                    }
                    label={label.toString()}
                />
            ))}
        </FormGroup>
    )
}

export default CheckboxListComponent;