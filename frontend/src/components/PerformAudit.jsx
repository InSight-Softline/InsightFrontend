import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button, Alert } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import api from "../api.js";
import { useParams } from "react-router-dom";

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
 * Creates the perform audits site, which shows the questions, checkboxes for the rating and a comment section. 
 * 
 * @author [Anna Liepelt] https://gitlab.dit.htwk-leipzig.de/anna.liepelt
 */
function PerformAudit() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const { auditId } = useParams();
  const auditId = 1;

  /*fetching data from the backend*/
  useEffect(() => {
    api.get(`/v1/audits/${auditId}/ratings`)
        .then(response => {
            console.log(response);
            setQuestions(response.data);
            setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

  const updateQuestionById = (id, newPartialQuestion) => {
    const q = questions.map(question => id === question.id? {...question, ...newPartialQuestion} : question );
    setQuestions(q);
  }

  /*PATCH function for sending changes to the backend */
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
    updateQuestionById(id, {comment: newComment});
    patchQuestion(id, [{path: "/comment", value: newComment}]);
  };

  const handleCheckboxChange = (event, label, question) => {
    const isChecked = event.target.checked

    if(!isChecked) {
      const newQuestion = {na: null, points: null}
      updateQuestionById(question.id, newQuestion);
      patchQuestion(question.id, [{path: "/na", value: newQuestion.na}, {path: "/points", value: newQuestion.points}]);
      return
    }

    switch (label) {
      case 'N/A':
        updateQuestionById(question.id, {na: true, points: null});
        patchQuestion(question.id, [{path: "/na", value: true}, {path: "/points", value: null}]);
        break;
      default:
        updateQuestionById(question.id, {points: label, na: false});
        patchQuestion(question.id, [{path: "/na", value: false}, {path: "/points", value: label}]);
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

  const handleAlert = () => {
    setError(null); 
    window.location.reload();
  }

  return (
    <>
      <h1 className="px-10 py-5 font-bold">Audit durchführen</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <h2 className="px-10 py-5">{question.question}</h2>
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
            data-cy="commentTextarea"
            placeholder='Kommentar eingeben'
            value={question.comment}
            onChange={(event) => handleCommentInput(event, question.id)}
          />
        </div>
      ))}
      {error && (
        <div className="sticky fixed bottom-20 left-0 w-full z-50">
          <Alert
            severity="error"
            onClose={handleAlert}
          >
            Fehler: {error.message} | Bitte erneut versuchen.
          </Alert>
        </div>
      )}
      {loading && (
        <div className="sticky fixed bottom-20 left-0 w-full z-50">
          <Alert
            severity="info"
            onClose={() => setLoading(false)}
          >Laden... Bitte warten.</Alert>
        </div>
      )}
    </>
  );
}

export default PerformAudit;