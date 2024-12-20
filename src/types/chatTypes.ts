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

export interface FetchMessagesParams {
  chatId: string;
  page: number;
  limit: number;
}

export interface PrivateChatMessage {
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
  };
}

export interface GroupChatMessage {
  _id: string;
  groupChat: string;
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
  };
}

export interface ChatMessages {
  [chatId: string]: {
    messages: (GroupChatMessage | PrivateChatMessage)[];
    hasMore: boolean;
    error: string | null;
  };
}

export interface SuccessLoginIncomingMessage {
  type: "LOGIN_SUCCESS";
  payload: { userName: string; userId: string };
}

export interface LatestMessagesIncomingMessage {
  type: "GET_LAST";
  payload: {
    latestMessages: (GroupChatMessage | PrivateChatMessage)[];
  };
}

export interface SendingMessageIncomingMessage {
  type: "SEND_MESSAGE";
  payload: {
    message: string;
  };
}

export interface NewMessageIncomingMessage {
  type: "NEW_MESSAGE";
  payload: GroupChatMessage | PrivateChatMessage;
}

export interface ErrorIncomingMessage {
  type: "ERROR";
  payload: string;
}

export type IncomingMessage =
  | SuccessLoginIncomingMessage
  | LatestMessagesIncomingMessage
  | SendingMessageIncomingMessage
  | NewMessageIncomingMessage
  | ErrorIncomingMessage;
