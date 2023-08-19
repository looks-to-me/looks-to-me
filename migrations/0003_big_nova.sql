CREATE TABLE `post_tags` (
	`post_id` text NOT NULL,
	`tag_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`name` text PRIMARY KEY NOT NULL,
	`posted_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `post_tags_post_id_tag_name_unique` ON `post_tags` (`post_id`,`tag_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);