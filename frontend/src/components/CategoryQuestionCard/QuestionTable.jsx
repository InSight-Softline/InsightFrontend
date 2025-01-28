import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function QuestionTable({questions=[], onDelete, onNew}) {
    return (
        <TableContainer component={Paper} data-cy="question-table">
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">
                            <Button onClick={()=>onNew?.()} data-cy="question-table-new-button"><AddIcon></AddIcon>hinzufügen</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((row) => (
                        <TableRow
                            data-cy="question-table-row"
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                <div className="flex justify-end">
                                    {/*<IconButton onClick={()=>onDelete?.(row)}><DeleteIcon></DeleteIcon></IconButton>*/}
                                    {onDelete && <IconButton data-cy="question-table-delete-button" onClick={()=>onDelete?.(row)}><DeleteIcon></DeleteIcon></IconButton>}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}