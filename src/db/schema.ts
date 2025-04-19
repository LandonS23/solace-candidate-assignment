import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

const degreeEnum = pgEnum("degree", ["MD", "PhD", "MSW"]);
const degreeValues = degreeEnum.enumValues;

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: degreeEnum("degree").$type<(typeof degreeValues)[number]>().notNull(),
  specialties: jsonb("specialties").$type<string[]>().default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export { degreeEnum, degreeValues, advocates };
