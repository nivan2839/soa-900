// app/api/grade/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function POST(req: NextRequest) {
  const { studentName, answers, professorEmail, questions } = await req.json();
    const formattedPrompt = `
Provide only the correct answers to the following math questions. 
Return an array of answers. No addtional text.
${questions}
  `;
  try {
   const response = await fetch('http://host.docker.internal:1234/v1/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct-v0.3',
        prompt: formattedPrompt,
        stream: false,
      }),
    });
  const data = await response.json();
  console.log(data)
  // Extract just the answers (basic parsing)
  const answersFromAPI = JSON.parse(data.choices[0].text)
  let score = 0
    answersFromAPI.map((answersFro: number, i:number) =>{
      if(answersFro.toString().trim() === answers[i].trim()){
        score = score + 1
      }
    })
  return NextResponse.json({ score });
  } catch (error) {
    console.error('Ollama error:', error);
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
 
}
