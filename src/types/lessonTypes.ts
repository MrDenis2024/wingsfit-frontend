export interface Lesson{
    course: string;
    title: string;
    timeZone: string;
    groupLevel: number;
    quantityClients: number;
    ageLimit: number | null;
    description: string | null;
    participants: string[] | null;
    presentUser: string[] | null;
}
