export type QuizQuestion = {
    id: number;
    question: {
        uk: string;
        en: string;
    };
    answer: {
        uk: string;
        en: string;
    };
    verse: {
        uk: string;
        en: string;
    };
};