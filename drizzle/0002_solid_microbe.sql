CREATE TYPE "public"."alert_type" AS ENUM('EMAIL', 'SMS', 'WEBHOOK');--> statement-breakpoint
CREATE TABLE "alerts" (
	"id" text PRIMARY KEY NOT NULL,
	"domain" text,
	"type" "alert_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_alerts" (
	"id" text,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sms_alerts" (
	"id" text,
	"phone_number" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webhook_alerts" (
	"id" text,
	"url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_domain_monitors_domain_fk" FOREIGN KEY ("domain") REFERENCES "public"."monitors"("domain") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_alerts" ADD CONSTRAINT "email_alerts_id_alerts_id_fk" FOREIGN KEY ("id") REFERENCES "public"."alerts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sms_alerts" ADD CONSTRAINT "sms_alerts_id_alerts_id_fk" FOREIGN KEY ("id") REFERENCES "public"."alerts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "webhook_alerts" ADD CONSTRAINT "webhook_alerts_id_alerts_id_fk" FOREIGN KEY ("id") REFERENCES "public"."alerts"("id") ON DELETE cascade ON UPDATE no action;