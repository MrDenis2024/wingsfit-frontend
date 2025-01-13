export interface CourseMutation {
  title: string;
  courseType: string;
  description: string;
  format: string;
  schedule: string[];
  price: string;
  image: string | null;
}

export interface ICourseType {
  _id: string;
  name: string;
  isPublished: boolean;
  isBlocked: boolean;
}

export interface CourseTypeFields {
  name: string;
}

export interface CourseWaitList {
  _id: string;
  user:{
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt:string;
  favoriteGroup: string;
  status: string;
}

export interface ICourse {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    description: string | null;
  };
  title: string;
  courseType: {
    _id: string;
    name: string;
  };
  description: string;
  format: string;
  schedule: string[];
  price: number;
  waitList:CourseWaitList[];
  image: string | null;
}

export interface UpdateCourseArg {
  id: string;
  course: CourseMutation;
}

export interface JoinCourseArg {
  id: string;
  groupId: string;
}
export interface JoinApproveArgs{
  id: string;
  waitListId: string;
  subscribeEndDate:string;
}
export interface JoinDeclineArgs{
  id: string;
  waitListId: string;
}

export interface FetchSearchCourseArgs {
  courseTypes: string[];
  trainers: string[];
  format: string[];
  schedule: string[];
}
