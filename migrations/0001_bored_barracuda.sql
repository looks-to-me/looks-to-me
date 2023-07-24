CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `images_key_unique` ON `images` (`key`);