"use client";

import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggested = "Why did visit delivery change this month?";

type Answer = {
  answer: string;
  citations: string[];
  scope: string;
  dataAsOf: string;
  mode: string;
};

export function AskMuvePanel() {
  const [question, setQuestion] = useState(suggested);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "The investigation could not be completed.");
      setAnswer(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The investigation could not be completed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <div className="mb-3 grid size-10 place-items-center rounded-xl bg-violet-200 text-violet-950">
        <Sparkles className="size-5" aria-hidden="true" />
      </div>
      <h2 id="ask-heading" className="text-lg font-semibold tracking-tight">Ask Muve</h2>
      <p className="mt-1 text-sm leading-5 text-slate-500">Investigate approved metrics with cited evidence.</p>
      <form onSubmit={submit} className="mt-5">
        <label htmlFor="ask-question" className="text-sm font-semibold text-slate-950">Your question</label>
        <textarea
          id="ask-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={3}
          maxLength={500}
          className="mt-2 w-full resize-none rounded-xl border border-violet-200 bg-white p-3 text-sm leading-6 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        />
        <Button disabled={pending || question.trim().length < 3} className="mt-3 w-full bg-violet-700 hover:bg-violet-800">
          {pending ? "Investigating…" : "Run cited investigation"}
        </Button>
      </form>
      {error ? <p role="alert" className="mt-3 text-sm text-rose-700">{error}</p> : null}
      {answer ? (
        <div aria-live="polite" className="mt-4 rounded-xl border border-violet-200 bg-white p-4">
          <p className="text-sm leading-6 text-slate-700">{answer.answer}</p>
          <p className="mt-3 text-xs font-semibold text-slate-600">Citation</p>
          <ul className="mt-1 space-y-1 text-xs text-slate-500">
            {answer.citations.map((citation) => <li key={citation}>{citation}</li>)}
          </ul>
          <p className="mt-3 text-xs text-slate-500">{answer.scope} · As of {answer.dataAsOf} · {answer.mode}</p>
        </div>
      ) : null}
      <p className="mt-4 text-xs leading-5 text-slate-500">AI cannot submit notifications or change care records. Every factual claim must cite its source.</p>
    </div>
  );
}
