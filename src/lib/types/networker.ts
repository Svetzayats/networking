import type { Company, CompanyId } from '$lib/types/company';
import type { ISODateString } from '$lib/types/date';
import type { InteractionHistoryId } from '$lib/types/interaction';
import type { LocactionId, Location } from '$lib/types/location';
import type { Tag, TagId } from '$lib/types/tag';

export type NetworkerId = string;
export type Networker = {
	id: NetworkerId;
	name: string;
	jobTitle: string[];
	company: CompanyId[];
	location: LocactionId[];
	email: string[];
	phoneNumber: string[];
	socialProfiles: string[];
	tags: TagId[];
	whereYouMet: string;
	generalNotes: string;
	personalTraits: string;
	interactionHistory: InteractionHistoryId[];
	lastUpdatedDate: ISODateString;
};

export type NetworkerDataView = Pick<Networker, 'id' | 'name' | 'jobTitle'> & {
	lastLocation: Location;
	lastCompany: Company;
	tags: Tag[];
};
