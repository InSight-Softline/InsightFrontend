import { styled } from '@mui/system';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

const Textarea = styled(BaseTextareaAutosize)(
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
);

export default Textarea;
