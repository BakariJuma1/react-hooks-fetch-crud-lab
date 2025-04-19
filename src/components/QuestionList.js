function QuestionList({ data, onDeleteQuestion, onUpdateCorrectAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {data.length > 0 ? (
          data.map((question) => (
            <li key={question.id ?? question.prompt}>
              <p>{question.prompt}</p>

              {/* Add dropdown for changing correct answer */}
              <label>
                Correct Answer:
                <select
                  aria-label="Correct Answer"
                  value={question.correctIndex}
                  onChange={(e) =>
                    onUpdateCorrectAnswer(question.id, parseInt(e.target.value))
                  }
                >
                  {question.answers.map((answer, index) => (
                    <option key={index} value={index}>
                      {answer}
                    </option>
                  ))}
                </select>
              </label>

              <button onClick={() => onDeleteQuestion(question.id)}>
                Delete Question
              </button>
            </li>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </ul>
    </section>
  );
}
export default QuestionList;