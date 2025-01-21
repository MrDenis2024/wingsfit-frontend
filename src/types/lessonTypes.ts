export interface LessonCreatingSArgs {
  groupId: string;
  lessonUrl: string;
}

export interface Lesson {
  _id: string;
  lessonURL: string;
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
