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
  privateChat: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  message: string;
  createdAt: string;
  isRead: {
    _id: string;
    user: string;
    read: boolean;
  }
}

export interface SuccessLoginIncomingMessage {
  type: "LOGIN_SUCCESS",
  payload: { userName: string, userId: string },
}

export interface LatestMessagesIncomingMessage {
  type: "GET_LAST";
  payload: {
    latestMessages: Message[];
  };
}

export interface SendingMessageMessage {
  type: "SEND_MESSAGE";
  payload: {
    message: string;
  };
}

export interface NewMessageIncomingMessage {
  type: "NEW_MESSAGE";
  payload: Message;
}

export interface ErrorIncomingMessage {
  type: "ERROR";
  payload: string;
}

export type IncomingMessage =
  SuccessLoginIncomingMessage
  | LatestMessagesIncomingMessage
  | SendingMessageMessage
  | NewMessageIncomingMessage
  | ErrorIncomingMessage;
