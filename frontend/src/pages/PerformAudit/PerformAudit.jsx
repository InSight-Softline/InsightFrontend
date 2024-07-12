// src/pages/PerformAudit.js
import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Textarea from '../../components/StyledTextarea';
import { updateQuestionById, getChecked } from '../../util/auditUtils';
import useFetchAuditData from '../../hooks/useFetchAuditData';
import './PerformAudit.css'; // Import the styles

function PerformAudit() {
  const { questions, loading, error, setQuestions, setLoading, setError } = useFetchAuditData();
  const navigate = useNavigate();

  const patchQuestion = async (ratingId, newRatings) => {
    const patchData = newRatings.map((destination) => ({
      op: "replace",
      path: `${destination.path}`,
      value: destination.value,
    }));
    console.log(patchData);
    api.patch(`/v1/ratings/${ratingId}`, patchData)
      .then(response => {
        console.log(response);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  };

  const handleCommentInput = (event, id) => {
    const newComment = event.target.value;
    setQuestions(questions => updateQuestionById(questions, id, { comment: newComment }));
    patchQuestion(id, [{ path: "/comment", value: newComment }]);
  };

  const handleCheckboxChange = (event, label, question) => {
    const isChecked = event.target.checked;

    if (!isChecked) {
      const newQuestion = { na: null, points: null }
      setQuestions(questions => updateQuestionById(questions, question.id, newQuestion));
      patchQuestion(question.id, [{ path: "/na", value: newQuestion.na }, { path: "/points", value: newQuestion.points }]);
      return;
    }

    switch (label) {
      case 'N/A':
        setQuestions(questions => updateQuestionById(questions, question.id, { na: true, points: null }));
        patchQuestion(question.id, [{ path: "/na", value: true }, { path: "/points", value: null }]);
        break;
      default:
        setQuestions(questions => updateQuestionById(questions, question.id, { points: label, na: false }));
        patchQuestion(question.id, [{ path: "/na", value: false }, { path: "/points", value: label }]);
    }
  };

  const handleAlert = () => {
    setError(null);
    window.location.reload();
  }

  return (
    <div className="page-container">
      <h1 className="audit-header">Audit durchführen</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <h2 className="question-text" data-cy="question_text">{question.question}</h2>
          <FormGroup className="checkbox-group" row>
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
            className="comment-textarea"
            data-cy="commentTextarea"
            placeholder='Kommentar eingeben'
            value={question.comment}
            onChange={(event) => handleCommentInput(event, question.id)}
          />
        </div>
      ))}
      {error && (
        <div className="alert-container">
          <Alert
            severity="error"
            onClose={handleAlert}
          >
            Fehler: {error.message} | Bitte erneut versuchen.
          </Alert>
        </div>
      )}
      {loading && (
        <div className="alert-container">
          <Alert
            severity="info"
            onClose={() => setLoading(false)}
          >Laden... Bitte warten.</Alert>
        </div>
      )}
      <div className="content-container">
        <div className="button-container">
          <button
            onClick={() => navigate(`/evaluation/${auditId}`)}
            className="navigate-button">
            Bewertung anzeigen
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerformAudit;
