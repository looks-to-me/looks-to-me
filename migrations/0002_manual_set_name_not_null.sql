-- nameカラムにunique制約を追加するために手動で追加したSQL文
CREATE TABLE `users_tmp` AS SELECT * FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`display_name` text NOT NULL,
	`avatar_url` text NOT NULL
);--> statement-breakpoint
INSERT INTO `users` (`id`, `name`, `display_name`, `avatar_url`) SELECT `id`, `name`, 'default_name', 'default_url' FROM `users_tmp`;--> statement-breakpoint
DROP TABLE `users_tmp`;
