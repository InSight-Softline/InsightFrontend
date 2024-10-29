import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button, Alert, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import api from "../api.js";
import { useParams, useNavigate } from "react-router-dom";

// Styled Textarea component using MUI's system styling
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => ({
    boxSizing: 'border-box',
    width: '95%',
    margin: '2.5%',
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    padding: '12px',
    borderRadius: '12px 12px 0 12px',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
    border: `1px solid ${theme.palette.mode === 'dark' ? '#555' : '#ddd'}`,
    '&:hover': {
      borderColor: '#3399FF',
    },
    '&:focus': {
      outline: 0,
      borderColor: '#3399FF',
      boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.25)',
    },
  })
);

function PerformAudit() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auditId } = useParams();

  useEffect(() => {
    api.get(`/v1/audits/${auditId}/ratings`)
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [auditId]);

  const updateQuestionById = (id, newPartialQuestion) => {
    setQuestions(questions.map(question => 
      id === question.id ? { ...question, ...newPartialQuestion } : question
    ));
  };

  const patchQuestion = (ratingId, newRatings) => {
    const patchData = newRatings.map(destination => ({
      op: "replace",
      path: `${destination.path}`,
      value: destination.value,
    }));
    api.patch(`/v1/ratings/${ratingId}`, patchData).catch(err => setError(err));
  };

  const handleCommentInput = (event, id) => {
    const newComment = event.target.value;
    updateQuestionById(id, { comment: newComment });
  };

  const handleCheckboxChange = (event, label, question) => {
    const isChecked = event.target.checked;
    const newQuestion = label === 'N/A' 
      ? { nA: isChecked, points: null } 
      : { nA: false, points: isChecked ? label : null };

    updateQuestionById(question.id, newQuestion);
    patchQuestion(question.id, [
      { path: "/na", value: newQuestion.nA },
      { path: "/points", value: newQuestion.points }
    ]);
  };

  const getChecked = (label, question) => label === 'N/A' ? question.nA : question.points === label;

  const handleAlert = () => {
    setError(null); 
    window.location.reload();
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <h1 className="px-10 py-5 font-bold">Audit durchführen</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <h2 className="px-10 py-5" data-cy="question_text">{question.question}</h2>
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
          <StyledTextarea
            data-cy="commentTextarea"
            placeholder="Kommentar eingeben"
            value={question.comment || ''}
            minRows={3}
            onChange={(event) => handleCommentInput(event, question.id)}
            onBlur={(event) => patchQuestion(question.id, [{ path: "/comment", value: event.target.value }])}
          />
        </div>
      ))}
      {error && (
        <Alert severity="error" onClose={handleAlert}>
          Fehler: {error.message} | Bitte erneut versuchen.
        </Alert>
      )}
      {loading && (
        <Alert severity="info">Laden... Bitte warten.</Alert>
      )}
      <div style={{ paddingBottom: '100px' }}>
        <Button 
          onClick={() => navigate(`/evaluation/${auditId}`)}
          variant="contained" 
          color="primary"
          className="mt-10">
          Bewertung anzeigen
        </Button>
      </div>
    </div>
  );
}

export default PerformAudit;