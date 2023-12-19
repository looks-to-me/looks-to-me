CREATE TABLE `post_copies` (
	`post_id` text NOT NULL,
	`ip_address` text NOT NULL,
	`copied_at` integer NOT NULL,
	PRIMARY KEY(`copied_at`, `post_id`, `ip_address`),-- NOTE: A bug in the Drizzle ORM prevented the composite primary key from being ordered as intended, so it was rewritten manually
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
