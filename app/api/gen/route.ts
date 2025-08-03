import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { grade, topic } = body ?? {};

  if (!grade || !topic) {
    return NextResponse.json({ error: 'Missing grade or topic' }, { status: 400 });
  }

  const prompt = `Generate 10 ${topic} math questions for Grade ${grade}. Only provide the questions. Do NOT include answers.`;

  try {
    const response = await fetch('http://localhost:1234/v1/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct-v0.3',
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    if(!data?.choices){
      return NextResponse.json({ error: 'Math tutor app is down!' }, { status: 404 });
    }
    const questions = data.choices[0].text
      .split('\n')
      .filter((line: string) => line.trim().length > 0);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Ollama error:', error);
    return NextResponse.json({ error: 'Ollama request failed' }, { status: 500 });
  }
}
