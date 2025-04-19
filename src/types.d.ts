import { degreeValues, specialtyValues } from "./db/schema";

export interface Advocate {
  id: int;
  firstName: string;
  lastName: string;
  city: string;
  degree: (typeof degreeValues)[number];
  specialties: (typeof specialtyValues)[number][];
  yearsOfExperience: number;
  phoneNumber: string;
}
