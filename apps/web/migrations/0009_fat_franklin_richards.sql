CREATE TABLE `mute_users` (
	`user_id` text NOT NULL,
	`mute_user_id` text NOT NULL,
	PRIMARY KEY(`mute_user_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mute_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
