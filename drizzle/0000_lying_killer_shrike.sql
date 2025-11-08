CREATE TABLE "checks" (
	"domain" text,
	"checked_at" timestamp DEFAULT now(),
	"is_up" boolean NOT NULL,
	CONSTRAINT "checks_domain_checked_at_pk" PRIMARY KEY("domain","checked_at")
);
--> statement-breakpoint
CREATE TABLE "monitors" (
	"domain" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "checks" ADD CONSTRAINT "checks_domain_monitors_domain_fk" FOREIGN KEY ("domain") REFERENCES "public"."monitors"("domain") ON DELETE no action ON UPDATE no action;