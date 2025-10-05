// Main page for the OpenBD frontend

import { useState } from 'react';
// import { MDXProvider } from '@mdx-js/react';
// import StepFlow from '../components/ai-elements/StepFlow';
// import ReasoningPanel from '../components/ai-elements/ReasoningPanel';
// import BanglaExplain from '../components/ai-elements/BanglaExplain';
// import Quiz from '../components/ai-elements/Quiz';

// const components = {
//   StepFlow,
//   ReasoningPanel,
//   BanglaExplain,
//   Quiz,
// };

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('http://localhost:3001/api/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: 'beta',
        messages: newMessages,
      }),
    });

    const data = await response.json();
    setMessages([...newMessages, { role: 'assistant', content: data.answer }]);
  };

  return (
    <div>
      <h1>OpenBD Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {/* This is where MDX rendering would happen */}
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}