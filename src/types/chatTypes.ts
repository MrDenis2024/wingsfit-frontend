export type OneChat = PrivateChat | GroupChat;

export interface GroupChat {
  _id: string;
  groupId: string;
  title: string;
  type: "group";
}

export interface PrivateChat {
  _id: string;
  type: "private";
  firstPerson: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  secondPerson: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

export interface Message {
  _id: string;
  chatId: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  message: string;
  createdAt: string;
}