import { useEffect, useState } from "react";
import type { QuizQuestion } from "../types/quiz";

type BoardProps = {
    questions: QuizQuestion[]
}

const Board = ({ questions }: BoardProps) => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(null);
    const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

    useEffect(() => {
        setUsedQuestions([])
    }, [questions])

    const openQuestion = (question: QuizQuestion) => {
        setSelectedQuestion(question);
        setShowAnswer(false);

    };


    const closeQuestion = () => {
        if (
            selectedQuestion &&
            !usedQuestions.includes(selectedQuestion.id)
        ) {
            setUsedQuestions((prev) => [...prev, selectedQuestion.id]);
        }

        setSelectedQuestion(null);
        setShowAnswer(false);
    };

    return <>
        <div className="h-[calc(100vh-120px)] w-full">
            <div
                className="grid w-full h-full gap-2"
                style={{
                    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                    gridTemplateRows: `repeat(${Math.ceil(
                        questions.length / 6
                    )}, minmax(0, 1fr))`,
                }}
            >
                {questions.map((question, index) => {
                    const used = usedQuestions.includes(question.id);

                    return (
                        <button
                            key={question.id}
                            onClick={() => openQuestion(question)}
                            className={`w-full h-full flex items-center justify-center rounded-xl text-3xl font-bold cursor-pointer
                                transition-all duration-200 ease-out
                                
                                animate-[popIn_0.25s_ease-out]
                                active:scale-95 active:brightness-90
                                
                                ${used
                                    ? "bg-green-500 text-white scale-[0.98] opacity-80"
                                    : "bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.03] hover:-translate-y-0.5"
                                }
                                `}
                            style={{
                                animationDelay: `${index * 20}ms`,
                                animationFillMode: "both",
                            }}
                        >
                            {question.id}
                        </button>
                    );
                })}
            </div>
        </div>

        {selectedQuestion && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/90 p-6 animate-[fadeIn_0.2s_ease-out]">
                <div className="w-full max-w-6xl rounded-3xl bg-white p-12 shadow-2xl animate-[popIn_0.25s_ease-out] transition-transform duration-200">
                    {/* TITLE */}
                    <h2 className="text-center text-3xl font-bold text-slate-800 mb-10">
                        Question #{selectedQuestion.id}
                    </h2>

                    {/* QUESTION */}
                    <div className="text-center space-y-8">

                        <p className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
                            {selectedQuestion.question.uk}
                        </p>

                        <p className="text-3xl md:text-4xl font-semibold leading-tight text-slate-700">
                            {selectedQuestion.question.en}
                        </p>

                    </div>

                    {/* ANSWER */}
                    {showAnswer && (
                        <div className="mt-12 rounded-2xl bg-green-50 p-10 text-center animate-[fadeIn_0.25s_ease-out]">
                            <div className="text-3xl md:text-4xl font-bold text-green-800">
                                {selectedQuestion.answer.uk}
                            </div>

                            <div className="text-3xl md:text-4xl font-bold text-green-700 mt-4">
                                {selectedQuestion.answer.en}
                            </div>

                            <div className="text-base text-slate-500 mt-6 font-bold">
                                📖 {selectedQuestion.verse.uk} | {selectedQuestion.verse.en}
                            </div>

                        </div>
                    )}

                    {/* BUTTONS */}
                    <div className="mt-12 flex justify-center gap-6">

                        {!showAnswer ? (
                            <button
                                onClick={() => setShowAnswer(true)}
                                className="rounded-xl bg-blue-600 px-10 py-5 text-xl font-semibold text-white hover:bg-blue-700 cursor-pointer"
                            >
                                Show Answer
                            </button>
                        ) : (
                            <button
                                onClick={closeQuestion}
                                className="rounded-xl bg-green-600 px-10 py-5 text-xl font-semibold text-white hover:bg-green-700 cursor-pointer"
                            >
                                Close
                            </button>
                        )}

                    </div>

                </div>
            </div>
        )}</>
}

export default Board