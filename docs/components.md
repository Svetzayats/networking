# Component Development Specification

## Overview

This document outlines the standards and best practices for developing components in the Networking project using Svelte 5 and Tailwind CSS 4.

## Technology Stack

- **Svelte 5**: Use runes mode exclusively, not legacy mode
- **Tailwind CSS 4**: Latest version with new features and improvements
- **Storybook**: Parallel story creation for each component
- **TypeScript**: Full type safety for all components
- **Skeleton**: Library of components

## Component Naming Convention

All components must follow the naming pattern:

```
Networking[ComponentName]
```

Do not use "barrel" file: index.ts.

```
src/components/
├── NetworkingButton/
│   ├── NetworkingButton.svelte
│   ├── NetworkingButton.stories.ts
```

## Svelte 5 Runes Mode Requirements

### State Management

Use Svelte 5 runes for state management:

```svelte
<script lang="ts">
	let count = $state(0);
	let name = $state('');

	function increment() {
		count++;
	}
</script>
```

### Props Definition

Define props using the new runes syntax:

```svelte
<script lang="ts">
	interface Props {
		variant?: 'primary' | 'secondary' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
	}

	let { variant = 'primary', size = 'md', disabled = false }: Props = $props();
</script>
```

### Computed Values

Use `$derived` for computed values:

```svelte
<script lang="ts">
	let firstName = $state('');
	let lastName = $state('');

	let fullName = $derived(`${firstName} ${lastName}`.trim());
</script>
```

## Tailwind CSS 4 Styling Guidelines

### Utility-First Approach

- Use Tailwind 4 utility classes for styling
- Leverage new Tailwind 4 features like arbitrary values and improved responsive design
- Avoid custom CSS when possible

### Responsive Design

```svelte
<div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
	<!-- Component content -->
</div>
```

### Dark Mode Support

```svelte
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
	<!-- Component content -->
</div>
```

### Custom Variants

Use Tailwind 4's enhanced variant system:

```svelte
<button class="btn-primary hover:btn-primary-hover focus:btn-primary-focus"> Click me </button>
```

## Component Best Practices

### 1. Minimal and Focused

- Write only the code that's absolutely necessary
- Each component should have a single responsibility
- Avoid over-engineering

### 2. TypeScript Integration

```svelte
<script lang="ts">
	interface ComponentProps {
		// Define all props with proper types
	}

	let props: ComponentProps = $props();
</script>
```

### 3. Accessibility

- Include proper ARIA attributes
- Ensure keyboard navigation support
- Maintain proper semantic HTML structure
- Test with screen readers

### 4. Performance

- Use `$effect` sparingly and only when necessary
- Avoid unnecessary re-renders
- Implement proper cleanup in effects

### 5. Error Handling

```svelte
<script lang="ts">
	let error = $state<string | null>(null);

	function handleAction() {
		try {
			// Component logic
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unknown error';
		}
	}
</script>
```

## Storybook Integration

### Story Creation

```svelte
<!-- NetworkingButton.stories.svelte -->
<script lang="ts">
	import type { Meta, StoryObj } from '@storybook/svelte';
	import NetworkingButton from './NetworkingButton.svelte';

	const meta: Meta<NetworkingButton> = {
		title: 'Components/NetworkingButton',
		component: NetworkingButton,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'outline']
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg']
			}
		}
	};

	export default meta;
	type Story = StoryObj<typeof meta>;

	export const Primary: Story = {
		args: {
			variant: 'primary',
			children: 'Primary Button'
		}
	};

	export const Secondary: Story = {
		args: {
			variant: 'secondary',
			children: 'Secondary Button'
		}
	};
</script>
```

### Story Requirements

- Include all component variants
- Provide interactive controls for all props
- Include accessibility testing
- Add documentation and usage examples

## Component Template

```svelte
<script lang="ts">
	interface Props {
		// Define your props here
	}

	let props: Props = $props();

	// Component logic here
</script>

<!-- Component template -->
<div class="component-base-classes">
	<!-- Component content -->
</div>

<style>
	/* Only use custom CSS when Tailwind utilities are insufficient */
</style>
```

## Testing Guidelines

### Unit Tests

- Test component behavior and interactions
- Mock external dependencies
- Test accessibility features
- Verify prop validation

### Integration Tests

- Test component integration with other components
- Verify data flow and state management
- Test responsive behavior

### Code Review Checklist

- [ ] Follows naming convention
- [ ] Uses Svelte 5 runes mode
- [ ] Implements Tailwind 4 styling
- [ ] Includes TypeScript types
- [ ] Has corresponding Storybook story
- [ ] Passes accessibility tests
- [ ] Includes proper error handling
- [ ] Follows performance best practices
