# 🧮 MathBot – AI-Powered Math Question Generator

A microservice-based Next.js application where students can:
- Select their grade and topic
- Generate 10 math questions using a locally running LLM (LLaMA 3 via Ollama)
- Submit answers and get evaluated
- Notify the professor via email with the student's score

---

## 📦 Features

- ✨ Next.js frontend + API routes
- 🧠 LLaMA 3 (via [Ollama](https://ollama.com)) for generating questions & answers
- ✉️ Nodemailer for email notifications
- 🐳 Dockerized frontend with support for local Ollama
- 📄 Modular microservice structure

---

## ⚙️ Tech Stack

- Frontend/API: Next.js (App Router)
- AI model: LLaMA 3 via Ollama
- Email: Nodemailer (SMTP)
- Containerization: Docker & Docker Compose

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nivan2839/soa-900
cd soa-900

Prerequisites:
Download LM studio and get the model mistralai/mistral-7b-instruct-v0.3
Go to developer section and start the server


🧪 API Documentation
    POST /api/generate
    Generate 10 math questions for a given grade and topic.

    Request Body: json
    {
    "grade": "5",
    "topic": "algebra"
    }
    Response: json
{
  "questions": [
    "1. What is 5 + 3?",
    "2. Solve for x: x + 2 = 7",
    ...
  ]
}

    POST /api/grade
    Submit answers and get evaluated.
    Request Body: json
    {
    "studentName": "John Doe",
    "answers": "["8", "5", "10", "12", "15", "20", "4", "6", "3", "1"]",
    "professorEmail": "prof@example.com",
    "questions": [
        "1. What is 5 + 3?",
        "2. Solve for x: x + 2 = 7",
    ...
    ]
    }
    Response: json
    {
     "score": 9
    }
    Also sends an email to the professor:
    "Student John Doe scored 9/10"

Run:
npm install
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f hpa.yaml
kubectl apply -f test-client.yaml
kubectl apply -f stresspod.yaml
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install monitoring prometheus-community/kube-prometheus-stack
kubectl get pods
kubectl port-forward svc/monitoring-grafana 3001:80
npm run dev

