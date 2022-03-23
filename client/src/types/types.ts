export interface USER {
  id: string;
  room: string;
  username: string;
  team: string;
  highestNumber?: number;
  type: "author" | "user";
}

export interface POINT {
  id: string;
  userId: string;
  room: string;
  username: string;
  team: string;
  point: string;
  color: string;
  icon: string;
}

type R = Omit<POINT, "id" | "userId" | "username" | "point">;

export interface REVEAL extends R {
  reveal: boolean;
  totalPoints: number;
  ticket: string;
}

export interface TICKET {
  name: string;
  id: string;
  team: string;
  room: string;
  author: string;
  revealed: boolean;
}

export interface PILL {
  number: number;
  icon: string;
  color: string;
}

export interface NOTIFICATION {
  message: string;
  show: boolean;
}

export type KEY = "diamond" | "clubs" | "spades" | "hearts";

export interface FIBONACCI {
  icon: string;
  number: number;
  color: string;
}

export type ROOM = {
  team: string;
  fibonacci: FIBONACCI[];
  room: string;
  author: string;
  highestNumber: number;
};

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
