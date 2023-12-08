CREATE TABLE `mute_users` (
	`user_id` text NOT NULL,
	`mute_user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mute_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mute_users_mute_user_id_user_id_unique` ON `mute_users` (`mute_user_id`,`user_id`);