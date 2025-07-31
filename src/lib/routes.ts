// Route constants and types
export const ROUTES = {
	HOME: '/',
	NEW_NETWORKER: '/new',
	PROFILE: '/profile'
} as const;

export const QUERY_PARAMS = {
	MODE: 'mode',
	SEARCH: 'search',
	FILTER: 'filter',
	SORT: 'sort'
} as const;

export const MODES = {
	VIEW: 'view',
	EDIT: 'edit'
} as const;

export const SORT_OPTIONS = {
	NAME_ASC: 'name_asc',
	NAME_DESC: 'name_desc',
	DATE_ADDED_ASC: 'date_added_asc',
	DATE_ADDED_DESC: 'date_added_desc'
} as const;

// Type definitions
export type RouteId = string | 'new';
export type Mode = (typeof MODES)[keyof typeof MODES];
export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
export type QueryParams = {
	mode?: Mode;
	search?: string;
	filter?: string;
	sort?: SortOption;
};

// Route generation functions
export function getNetworkerRoute(id: RouteId): string {
	return `/${id}`;
}

export function getNetworkerEditRoute(id: string): string {
	return `${getNetworkerRoute(id)}?${QUERY_PARAMS.MODE}=${MODES.EDIT}`;
}

export function getHomeRoute(params?: Partial<QueryParams>): string {
	if (!params || Object.keys(params).length === 0) {
		return ROUTES.HOME;
	}

	const searchParams = new URLSearchParams();

	if (params.search) {
		searchParams.set(QUERY_PARAMS.SEARCH, params.search);
	}

	if (params.filter) {
		searchParams.set(QUERY_PARAMS.FILTER, params.filter);
	}

	if (params.sort) {
		searchParams.set(QUERY_PARAMS.SORT, params.sort);
	}

	const queryString = searchParams.toString();
	return queryString ? `${ROUTES.HOME}?${queryString}` : ROUTES.HOME;
}

export function getProfileRoute(): string {
	return ROUTES.PROFILE;
}

// URL parameter parsing and validation
export function parseQueryParams(url: URL): QueryParams {
	const params: QueryParams = {};

	const mode = url.searchParams.get(QUERY_PARAMS.MODE);
	if (mode && Object.values(MODES).includes(mode as Mode)) {
		params.mode = mode as Mode;
	}

	const search = url.searchParams.get(QUERY_PARAMS.SEARCH);
	if (search) {
		params.search = search;
	}

	const filter = url.searchParams.get(QUERY_PARAMS.FILTER);
	if (filter) {
		params.filter = filter;
	}

	const sort = url.searchParams.get(QUERY_PARAMS.SORT);
	if (sort && Object.values(SORT_OPTIONS).includes(sort as SortOption)) {
		params.sort = sort as SortOption;
	}

	return params;
}

export function isValidNetworkerId(id: string): boolean {
	// UUID validation or custom ID format validation
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(id) || id === 'new';
}

export function validateRouteId(id: string): RouteId {
	if (isValidNetworkerId(id)) {
		return id as RouteId;
	}
	throw new Error(`Invalid networker ID: ${id}`);
}

// Navigation helpers
export function createNetworkerUrl(id: RouteId, mode?: Mode): string {
	const baseUrl = getNetworkerRoute(id);

	if (mode && mode !== MODES.VIEW) {
		return `${baseUrl}?${QUERY_PARAMS.MODE}=${mode}`;
	}

	return baseUrl;
}

export function createHomeUrl(params?: Partial<QueryParams>): string {
	return getHomeRoute(params);
}

// SEO and meta helpers
export function generatePageTitle(route: string, params?: Record<string, string>): string {
	if (route === ROUTES.HOME) {
		return 'Networking';
	}

	if (route === ROUTES.PROFILE) {
		return 'Profile & Settings';
	}

	if (route.startsWith('/') && route !== ROUTES.HOME && route !== ROUTES.PROFILE) {
		const id = route.substring(1);
		if (id === 'new') {
			return 'Add New Networker';
		}
		// For existing networkers, you might want to fetch the name
		// For now, return a generic title
		return 'Networker Details';
	}

	return 'Networking';
}

// Route matching and validation
export function isNetworkerRoute(pathname: string): boolean {
	const segments = pathname.split('/').filter(Boolean);
	return segments.length === 1 && (segments[0] === 'new' || isValidNetworkerId(segments[0]));
}

export function isHomeRoute(pathname: string): boolean {
	return pathname === ROUTES.HOME;
}

export function isProfileRoute(pathname: string): boolean {
	return pathname === ROUTES.PROFILE;
}

// Utility functions for common navigation patterns
export function getNextRouteAfterSave(id: string, mode?: Mode): string {
	if (mode === MODES.EDIT) {
		return getNetworkerRoute(id);
	}
	return ROUTES.HOME;
}

export function getPreviousRoute(id: string, mode?: Mode): string {
	if (mode === MODES.EDIT) {
		return getNetworkerRoute(id);
	}
	return ROUTES.HOME;
}

// Export all constants for easy access
export {
	ROUTES as routes,
	QUERY_PARAMS as queryParams,
	MODES as modes,
	SORT_OPTIONS as sortOptions
};
