CREATE TABLE `assignedSong` (
	`playlist_id` int NOT NULL,
	`song_id` int NOT NULL,
	CONSTRAINT `assignedSong_playlist_id_song_id` PRIMARY KEY(`playlist_id`,`song_id`)
);
--> statement-breakpoint
CREATE TABLE `playlist` (
	`playlist_id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`playlist_name` text,
	`playlist_owner` int,
	`playlist_is_deletable` boolean
);
--> statement-breakpoint
CREATE TABLE `song` (
	`song_id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`song_drive_id` text,
	`song_name` text,
	`song_artist` text,
	`song_url` text,
	`song_cover` text,
	`song_length` text
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`username` text,
	`password` text,
	`email` text,
	`created_at` timestamp,
	`updated_at` timestamp
);
--> statement-breakpoint
ALTER TABLE `assignedSong` ADD CONSTRAINT `assignedSong_playlist_id_playlist_playlist_id_fk` FOREIGN KEY (`playlist_id`) REFERENCES `playlist`(`playlist_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assignedSong` ADD CONSTRAINT `assignedSong_song_id_song_song_id_fk` FOREIGN KEY (`song_id`) REFERENCES `song`(`song_id`) ON DELETE no action ON UPDATE no action;