export interface CourseMutation {
  title: string;
  courseType: string;
  description: string;
  format: string;
  schedule: string;
  scheduleLength: string;
  price: string;
  maxClients: string;
  image: string | null;
}

export interface CourseTypeFields {
  _id: string;
  name: string;
  description: string | null;
}

export interface ICourse {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
 };
  title: string;
  courseType: string;
  description: string;
  format: string;
  schedule: string;
  scheduleLength: string;
  price: number;
  maxClients: string;
  image: string | null;
}
