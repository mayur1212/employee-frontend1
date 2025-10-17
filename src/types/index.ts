// src/types.ts



export interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  department: {
    id: string;
    name: string;
    floor: number;
  };
}

export interface Department {
  id: string;
  name: string;
  floor: number;
}
