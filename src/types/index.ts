export interface USER {
  id: string;
  room: string;
  username: string;
  team: string;
  type: "author" | "user";
  avatar?: string;
  highestNumber?: number;
}
export interface ROOMS {
  [roomId: string]: ROOM;
}

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

export interface POINT {
  id: string;
  userId: string;
  room: string;
  username: string;
  team: string;
  point: number;
  icon: string;
  color: string;
}

export interface TICKETNAME {
  id: string;
  room: string;
  name: string;
}



export interface REVEAL extends POINT {
  reveal: boolean;
  totalPoints: number;
}

export interface TICKET {
  team: string;
  name: string;
  room: string;
  author: string;
  winningPoint: POINT[]
  totalPoints: number;
  revealed: Boolean;
}
