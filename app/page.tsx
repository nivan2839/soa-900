'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';

const Home = () => {
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [student, setStudent] = useState('');
  const [score, setScore] = useState<number | string | null>(null);

  const generate = async () => {
    const res = await fetch('/api/gen', {
      method: 'POST',
      body: JSON.stringify({ grade, topic }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setQuestions(data.questions);
    setAnswers(Array(10).fill(''));
  };

  const submit = async () => {
    const res = await fetch('/api/grade', {
      method: 'POST',
      body: JSON.stringify({
        questions: questions,
        studentName: student,
        answers,
        professorEmail: email
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setScore(data.score);
  };

  return (
    <div className="p-8 space-y-4">
      <input placeholder="Grade" value={grade} onChange={e => setGrade(e.target.value)} />
      <input placeholder="Topic" value={topic} onChange={e => setTopic(e.target.value)} />
      <button onClick={generate}>Generate Questions</button>

      {questions.map((q, i) => (
        <div key={i}>
          <p>{q}</p>
          <input placeholder ="answer" value={answers[i] || ''} onChange={e => {
            const newA = [...answers];
            newA[i] = e.target.value;
            setAnswers(newA);
          }} />
        </div>
      ))}

      {questions.length > 0 && (
        <>
          <input placeholder="Your Name" value={student} onChange={e => setStudent(e.target.value)} required/>
          <input placeholder="Professor Email" value={email} onChange={e => setEmail(e.target.value)} required/>
          <button onClick={submit}>Submit Answers</button>
        </>
      )}

      {score !== null && <p>Your score is {score}/10! Scores will be emailed to professor!</p>}
    </div>
  );
}
export default Home;