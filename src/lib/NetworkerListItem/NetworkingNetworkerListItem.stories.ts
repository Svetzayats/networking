import type { Meta, StoryObj } from '@storybook/svelte';
import NetworkingListItem from './NetworkingNetworkerListItem.svelte';
import type { NetworkerDataView } from '$lib/types/networker';
import '../../app.css';

const meta = {
	title: 'NetworkingListItem',
	component: NetworkingListItem,
	tags: ['autodocs'],
	excludeStories: /.*Data$/
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleNetworker: NetworkerDataView = {
	id: '1',
	name: 'John Doe',
	jobTitle: ['Senior Developer'],
	lastCompany: {
		id: '1',
		name: 'Tech Corp',
		comments: 'Great company to work with'
	},
	lastLocation: {
		id: '1',
		name: 'San Francisco, CA'
	},
	tags: [
		{ id: '1', name: 'JavaScript', color: '#f7df1e' },
		{ id: '2', name: 'React', color: '#61dafb' },
		{ id: '3', name: 'Node.js', color: '#339933' }
	]
};

export const Default: Story = {
	render: (args) => ({
		Component: NetworkingListItem,
		props: {
			networker: sampleNetworker,
			...args
		}
	})
};

export const WithClickHandler: Story = {
	render: (args) => ({
		Component: NetworkingListItem,
		props: {
			networker: sampleNetworker,
			onClick: (networker: NetworkerDataView) => {
				console.log('Clicked on networker:', networker.name);
			},
			...args
		}
	})
};
