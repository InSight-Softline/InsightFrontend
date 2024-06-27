import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

//Styling for the Comment Sections
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

/**
 * Creates the perform audits site with basic functionality
 * 
 * @author [Anna Liepelt] https://gitlab.dit.htwk-leipzig.de/anna.liepelt
 */
function PerformAudit() {

  const [questions, setQuestions] = useState([
    { id: 1, question_text: "Frage 1", points: 0, comment: '', na: false},
    { id: 2, question_text: "Frage 2", points: 1, comment: '', na: true},
    { id: 3, question_text: "Frage 3", points: 2, comment: '', na: false}
  ]);

  const updateQuestionById = (id, newPartialQuestion) => {
    const q = questions.map(question => id === question.id? {...question, ...newPartialQuestion} : question );
    setQuestions(q);
  }

  const handleCommentInput = (event, id) => {
    const newComment = event.target.value;
    updateQuestionById(id, {comment: newComment})
  };

  const handleCheckboxChange = (event, label, question) => {
    switch (label) {
      case 'N/A':
        updateQuestionById(question.id, {na: !question.na, points: null});
        break;
      default:
        updateQuestionById(question.id, {points: label == question.points? null : label, na: false});
    }
  };

  const getChecked = (label, question) => {
    switch (label) {
      case 'N/A':
        return question.na;
      default:
        return question.points === label;
    }
  }

  return (
    <>
      <h1 className="px-10 py-5 font-bold">Audit durchführen</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <h2 className="px-10 py-5">{question.question_text}</h2>
          <FormGroup className="px-5 flex justify-center" row>
            {[0, 1, 2, 3, 4, 5, 'N/A'].map((label) => (
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
          <Textarea
            placeholder='Kommentar eingeben'
            value={question.comment}
            onChange={(event) => handleCommentInput(event, question.id)}
          />
        </div>
      ))}
      <Button 
        //ToDo: Add onClick Eventlistener
      >Speichern</Button>
    </>
  );
}

export default PerformAudit;