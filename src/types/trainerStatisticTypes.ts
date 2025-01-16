export interface TrainerStatisticGroup {
  _id: string;
  title: string;
  clientsLimit: number;
  trainingLevel: string;
  startTime: string;
  scheduleLength: number;
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
  addedAt: Date;
  clientId: string;
  groupTitle: string;
  lastName: string;
  name: string;
  status: string;
  subscribeEnd: Date;
}
