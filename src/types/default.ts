import { JsonValue } from "@prisma/client/runtime/library";

export interface user {
  id: number;
  userId: string;
  password: string;
  name: string;
  group: string;
  phone: string;
  birth: Date;
  gender: string;
  rank: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface application {
  id: number;
  surveyData: JsonValue;
  attended: boolean;
  feePaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  retreatId: number;
}