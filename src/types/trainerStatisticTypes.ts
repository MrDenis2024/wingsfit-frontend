export interface TrainerStatisticGroup {
  _id: string;
  title: string;
  clientsLimit: number;
  trainingLevel: string;
  startTime: string;
  clients: {
    _id: string;
    client: string;
    addedAt: Date;
    status: string;
    subscribeEnd: Date;
  }[];
  maxClients: number;
  course: {
    _id: string;
    title: string;
    schedule: string;
    scheduleLength: string;
  };
}

export interface TrainerStatisticClient {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  groups: string[];
  courses: string[];
}
