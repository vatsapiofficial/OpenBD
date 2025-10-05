// Placeholder for the <Quiz /> component

export default function Quiz({ questions }) {
  // TODO: Implement interactive quiz logic
  return (
    <div className="quiz">
      <h4>Test Your Knowledge:</h4>
      {questions.map((q, index) => (
        <div key={index} className="question">
          <p>{q.text}</p>
          {/* Options and answer logic would go here */}
        </div>
      ))}
    </div>
  );
}