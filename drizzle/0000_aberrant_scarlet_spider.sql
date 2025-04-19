DO $$ BEGIN
 CREATE TYPE "public"."degree" AS ENUM('MD', 'PhD', 'MSW');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" "degree" NOT NULL,
	"specialties" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
