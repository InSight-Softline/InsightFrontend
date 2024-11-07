import Typography from '@mui/material/Typography';

const Title = ({ children }) => (
    <Typography variant="h4" align="center" gutterBottom>
        {children}
    </Typography>
);

export default Title;