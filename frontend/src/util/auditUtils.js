export const updateQuestionById = (questions, id, newPartialQuestion) => {
    return questions.map(question =>
      id === question.id ? { ...question, ...newPartialQuestion } : question
    );
  };
  
  export const getChecked = (label, question) => {
    switch (label) {
      case 'N/A':
        return question.na;
      default:
        return question.points === label;
    }
  };
  