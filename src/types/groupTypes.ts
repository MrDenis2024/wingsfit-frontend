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
    image: string | null;
    price: number;
  };
  clients: {
    _id: string;
    client: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    addedAt: Date;
    subscribeEnd: Date;
  }[];
  maxClients: number;
  scheduleLength: number;
  startTime: string;
  trainingLevel: string;
}

export interface IMatchingGroup {
  _id: string;
  title: string;
  course: {
    _id: string;
    title: string;
    schedule: string[];
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    courseType: {
      _id: string;
      name: string;
    };
    image: string;
    description: string;
    price: number;
    format: string;
  };
  clients: {
    _id: string;
    client: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    addedAt: Date;
    subscribeEnd: Date;
  }[];
  maxClients: number;
  scheduleLength: number;
  startTime: string;
  trainingLevel: string;
}

export interface UpdateGroupArg {
  id: string;
  group: GroupMutation;
}
