import {exportComponentAsPNG} from "react-component-export-image";
import { useRef } from 'react';
import {Button, IconButton} from "@mui/material";
import {Download as DownloadIcon} from '@mui/icons-material';

const ChartWrapper = ({ children }) => {

    const componentRef = useRef();

    const handlePNGExport = () => {
        exportComponentAsPNG(componentRef,  {fileName: `chart-${(new Date()).toISOString()}.png`});
    }

    return (
        <div data-cy="chart-wrapper" ref={componentRef} className="flex flex-col items-end">
            <IconButton onClick={handlePNGExport}><DownloadIcon></DownloadIcon></IconButton>
            {children}
        </div>
    )
}

export default ChartWrapper