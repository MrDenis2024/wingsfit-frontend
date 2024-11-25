export interface OneChat {
  _id: string;
  title: string;
  group?: string;
}

export interface Message {
  author: string;
  message: string;
  createdAt: string;
}
