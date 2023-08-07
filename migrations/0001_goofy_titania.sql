CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
