export interface GroupMutation {
  title: string;
  course: string;
  startTime: string;
}

export interface IGroup {
  _id: string;
  title: string;
  course: {
    _id: string;
    title: string;
  };
  clients: {
    _id: string,
    firstName: string,
    lastName: string,
  }[];
  clientsLimit: number;
  startTime: string;
  trainingLevel: string;
}
