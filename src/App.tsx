import { useEffect, useState } from "react";
import Board from "./components/Board";
import { questions as semifinal_questions } from "./questions/semifinal";
import { questions as final_questions } from "./questions/final";
import { questions as audience_questions } from "./questions/audience";

function App() {
  const [mode, setMode] = useState("semifinal");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (mode === "final") {
      setQuestions(final_questions)
    } else if (mode === "semifinal") {
      setQuestions(semifinal_questions)
    } else if (mode === "audience") {
      setQuestions(audience_questions)
    }
  }, [mode])

  const [scores, setScores] = useState({
    brantford: 0,
    hamilton: 0,
    toronto: 0,
  });

  const awardPoint = (
    team: "brantford" | "hamilton" | "toronto"
  ) => {
    setScores((prev) => ({
      ...prev,
      [team]: prev[team] + 1,
    }));
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-900 p-4">
      <div className="flex justify-between items-center w-full gap-4 mb-6">

        {mode !== "audience" && <div className="flex items-center gap-6 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-slate-700">
              Brantford
            </span>
            <span className="min-w-[64px] text-center text-3xl font-bold text-slate-900">
              {scores.brantford}
            </span>
          </div>

          <div className="h-10 w-px bg-slate-200" />

          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-slate-700">
              Hamilton
            </span>
            <span className="min-w-[64px] text-center text-3xl font-bold text-slate-900">
              {scores.hamilton}
            </span>
          </div>

          <div className="h-10 w-px bg-slate-200" />

          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-slate-700">
              Hamilton 2
            </span>
            <span className="min-w-[64px] text-center text-3xl font-bold text-slate-900">
              {scores.toronto}
            </span>
          </div>
        </div>}


        <div className="flex items-center">
          {/* MAIN (Semifinal + Final) */}
          <div className="flex gap-3 mr-6">
            <button
              onClick={() => setMode("semifinal")}
              className={`px-5 py-2 rounded-xl font-semibold transition cursor-pointer ${mode === "semifinal"
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
            >
              Semi-final
            </button>

            <button
              onClick={() => setMode("final")}
              className={`px-5 py-2 rounded-xl font-semibold transition cursor-pointer ${mode === "final"
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
            >
              Final
            </button>
          </div>


          {/* AUDIENCE */}
          <button
            onClick={() => setMode("audience")}
            className={`px-6 py-2 rounded-xl font-semibold transition cursor-pointer ${mode === "audience"
              ? "bg-amber-500 text-white"
              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
              }`}
          >
            Audience
          </button>
        </div>


      </div>

      <Board questions={questions} key={mode} awardPoint={awardPoint} mode={mode} />

    </div>
  );
}

export default App