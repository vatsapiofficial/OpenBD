// Placeholder for the <StepFlow /> component

export default function StepFlow({ steps }) {
  return (
    <div className="step-flow">
      <h4>Step-by-Step Process:</h4>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}