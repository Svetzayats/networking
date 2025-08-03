import type { ISODateString } from '$lib/types/date';

export type InteractionHistoryId = string;
export type InteractionHistory = {
	id: InteractionHistoryId;
	date: ISODateString;
	description: string;
	type: Interaction;
};

export type CustomInteraction = string;

export type Interaction =
	| 'meeting'
	| 'call'
	| 'email'
	| 'linkedin'
	| 'interview'
	| 'meetup'
	| CustomInteraction;
