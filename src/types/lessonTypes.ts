
export interface Lesson {
  _id: string;
  group: {
    _id: string;
    title: string;
    course: {
      _id: string;
      title: string;
    }
  };
  createdAt: Date;
  notPresent: {
    firstName: string;
    lastName: string;
  }[],
  arePresent: {
    firstName: string;
    lastName: string;
  }[],
}
