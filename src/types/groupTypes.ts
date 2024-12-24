export interface GroupMutation {
  title: string;
  course: string;
  startTime: string;
  trainingLevel: string;
  maxClients: string;
  scheduleLength: string;
}

export interface IGroup {
  _id: string;
  title: string;
  course: {
    _id: string;
    title: string;
    schedule: string[];
    user: string;
  };
  clients: {
    _id: string;
    firstName: string;
    lastName: string;
  }[];
  maxClients: number;
  scheduleLength: number;
  startTime: string;
  trainingLevel: string;
}
