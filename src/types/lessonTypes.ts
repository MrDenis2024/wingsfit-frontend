export interface Lesson {
  _id: string;
  group: {
    _id: string;
    title: string;
    course: {
      _id: string;
      title: string;
    };
  };
  createdAt: Date;
  notPresent: {
    _id: string;
    firstName: string;
    lastName: string;
  }[];
  arePresent: {
    _id: string;

    firstName: string;
    lastName: string;
  }[];
}
