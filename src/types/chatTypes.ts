export type OneChat = PrivateChat | GroupChat;

export interface GroupChat {
  _id: string;
  group: string;
  title: string;
  type: "group";
  disabled: boolean;
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
  privateChat?: string;
  groupChat?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  message: string;
  createdAt: string;
  isRead: {
    user: string;
    read: boolean;
  };
  isTrainingUrl?: boolean;
}

export interface MessageNotification {
  _id: string;
  privateChat?: string;
  groupChat?: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  message: string;
  createdAt: string;
  isRead: {
    user: string;
    read: boolean;
  };
  isTrainingUrl?: boolean;
}

export interface ChatMessagesPayload {
  chatId: string;
  chatType: "group" | "private";
  latestMessages: Message[];
}

export type IncomingMessage =
  | {
      type: "LOGIN";
      payload: string;
    }
  | {
      type: "CHAT_MESSAGES";
      payload: ChatMessagesPayload;
    }
  | {
      type: "JOIN_CHAT";
      payload: { chatId: string; chatType: "group" | "private" };
    }
  | {
      type: "SEND_MESSAGE";
      payload: {
        chatId: string;
        chatType: "group" | "private";
        message: string;
      };
    }
  | {
      type: "NEW_MESSAGE";
      payload: Message;
    }
  | {
      type: "ERROR";
      payload: string;
    };
