import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

//http://localhost:4000/questions

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check if data is fetched correctly
        setQuestions(data);
      });
  }, []);

  console.log(questions);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }


  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        // Remove the question from the state
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== id)
        );
      })
      .catch((err) => console.error(err));
  }
  
  
  function handleUpdateCorrectAnswer(id, newCorrectIndex) {
    const updatedQuestions = questions.map((q) => {
      if (q.id === id) {
        return { ...q, correctIndex: newCorrectIndex };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  }
  

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          data={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
