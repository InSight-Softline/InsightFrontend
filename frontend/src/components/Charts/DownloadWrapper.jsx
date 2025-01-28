import {exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG} from "react-component-export-image";
import {useRef} from 'react';
import {Button, ButtonGroup,} from "@mui/material";

const DownloadWrapper = ({children}) => {

    const componentRef = useRef();

    const handlePNGExport = () => {
        exportComponentAsPNG(componentRef, {
            fileName: `chart-${(new Date()).toISOString()}.png`,
        });
    }

    const handleJPEGExport = () => {
        exportComponentAsJPEG(componentRef, {fileName: `chart-${(new Date()).toISOString()}.jpeg`});
    }


    return (
        <div data-cy="chart-wrapper" className="flex flex-col items-end w-full">
            <ButtonGroup
                variant="outlined"
                color="error">
                <Button
                    onClick={() => {
                        handleJPEGExport();
                    }}
                >JPEG</Button>
                <Button
                    onClick={() => {
                        handlePNGExport();
                    }}
                >PNG</Button>
            </ButtonGroup>
            <div className="w-full" ref={componentRef}>
                {children}
            </div>
        </div>
    )
}

export default DownloadWrapper