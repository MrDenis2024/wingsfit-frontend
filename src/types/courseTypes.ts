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
