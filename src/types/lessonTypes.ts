export interface Lesson{
    _id: string;
    course: string;
    title: string;
    timeZone: string;
    groupLevel: number;
    quantityClients: number;
    ageLimit: number;
    description: string;
    participants: string[];
    presentUser: string[];
}

export type LessonMutation = Omit<Lesson, '_id'>