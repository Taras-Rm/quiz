export type QuizQuestion = {
    id: number;
    question: {
        ru: string;
        en: string;
    };
    answer: {
        ru: string;
        en: string;
    };
    verse: {
        ru: string;
        en: string;
    };
};