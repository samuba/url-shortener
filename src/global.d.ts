/// <reference types="@sveltejs/kit" />

export type Link = {
	id: string;
	url: string;
	shortUrl: string;
	description: string;
	userId: string;
};

export type NewLink = {
	url: string;
	description: string;
	userId: string;
};