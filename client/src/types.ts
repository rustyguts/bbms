interface Position {
  latitude: number;
  longitude: number;
}

export interface Port {
  id: string;
  name: string;
  position: Position;
}

export interface Ship {
  id: string;
  name: string;
  position: Position;
}
