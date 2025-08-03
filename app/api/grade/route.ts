// app/api/grade/route.ts
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { studentName, answers, professorEmail, questions, screenshot  } = await req.json();

  const formattedPrompt = `
Provide only the correct answers to the following math questions. 
Return an array of answers. No additional text.
${questions}
  `;

  try {
    // Call your local model API

    const response = await fetch('http://localhost:1234/v1/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct-v0.3',
        prompt: formattedPrompt,
        stream: false,
      }),
    });

    const data = await response.json();
    console.log(data);

    // Extract just the answers (basic parsing)
    const answersFromAPI = JSON.parse(data.choices[0].text);
    let score = 0;

    answersFromAPI.forEach((answerFromAPI: number, i: number) => {
      if (answerFromAPI.toString().trim() === answers[i].trim()) {
        score += 1;
      }
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nivanhanjura2016@gmail.com',          // your Gmail address
        pass: 'jiml rifk axwr kmaf',  // your 16-digit App Password
      },
    });

    await transporter.sendMail({
      from: 'nivanhanjura2016@gmail,com',
      to: professorEmail,
      subject: `Math Quiz Score for ${studentName}`,
      text: `${studentName} scored ${score}/10 on the quiz.`,
      html: `<p><strong>${studentName}</strong> scored <strong>${score}/10</strong> on the quiz.</p> Below is his answer before submitting!`,
      attachments: [
    {
      filename: 'quiz-screenshot.png',
      content: screenshot.split("base64,")[1], // ✅ convert Base64 to raw for email
      encoding: 'base64',
    },
  ],
    });

    return NextResponse.json({ score });
  } catch (error) {
    console.error('Error grading or sending email:', error);
    return NextResponse.json({ error: 'Failed to process grade or send email' }, { status: 500 });
  }
}
