/// <reference types="@sveltejs/kit" />

export type Link = {
	id: string;
	url: string;
	shortUrl: string;
	description: string;
	userId: string;
	createdAt: Date;
};

export type NewLink = {
	url: string;
	customSlug: string;
	description: string;
	userId: string;
};

export {};
