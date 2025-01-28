import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c4171f', //Softline Rot
        },
        secondary: {
            main: '#4B5563' //tailwind gray-600
        },
        background: {
            default: '#E0E0E0', //tailwind gray-300
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
});

const CustomThemeProvider = ({ children }) => {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default CustomThemeProvider;