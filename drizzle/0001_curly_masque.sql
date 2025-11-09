ALTER TABLE "checks" DROP CONSTRAINT "checks_domain_monitors_domain_fk";
--> statement-breakpoint
ALTER TABLE "checks" ADD CONSTRAINT "checks_domain_monitors_domain_fk" FOREIGN KEY ("domain") REFERENCES "public"."monitors"("domain") ON DELETE cascade ON UPDATE no action;