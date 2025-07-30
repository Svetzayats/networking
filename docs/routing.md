# Routing

## Overview

This application utilizes SvelteKit's filesystem-based router for navigation and page management.

## Route Structure

### Main Routes

#### `/` - Main Dashboard

- **Purpose**: Primary landing page displaying all added networkers
- **Functionality**:
  - Display list/grid of all networkers
  - Search and filter capabilities
  - Quick actions (add new, edit, delete)
  - Sorting options (by name, date added, category, etc.)
  - Pagination for large lists
- **File**: `src/routes/+page.svelte`

#### `/{id}` - Networker Detail/Edit

- **Purpose**: View, create, or edit individual networker information
- **Functionality**:
  - **Create Mode** (`/new` or empty form): Add new networker
  - **View Mode** (`/{id}`): Display networker details in readonly format
  - **Edit Mode** (`/{id}?mode=edit`): Edit existing networker information
  - Form validation and error handling
  - Save/Cancel actions
  - Delete confirmation
- **File**: `src/routes/[id]/+page.svelte`
- **Dynamic Parameters**: `id` (string) - networker identifier

#### `/profile` - User Profile & Settings

- **Purpose**: User management, statistics, and application settings
- **Functionality**:
  - User profile information display and editing
  - Application statistics (total networkers, categories, etc.)
  - Settings configuration (theme, notifications, data export)
  - Data backup and restore options
- **Components**: ProfileForm, StatisticsPanel, SettingsPanel, AccountActions
- **File**: `src/routes/profile/+page.svelte`

## Route Parameters

### Dynamic Routes

- `[id]` - Networker identifier (UUID or slug)
  - Used in: `/{id}` route
  - Validation: Must be valid networker ID or "new" for creation

### Query Parameters

- `mode` - Information about mode (edit)
  - Used in: `/{id}?mode=edit`
- `search` - Search term for filtering
  - Used in: `/?search=term`
- `filter` - Filter criteria
  - Used in: `/?filter=category`
- `sort` - Sort order
  - Used in: `/?sort=name_asc`

## Navigation Flow

### Primary User Journeys

1. **Adding New Networker**:
   - `/` → `/new` (create mode) → `/{id}` (after save - view mode)

2. **Viewing Networker Details**:
   - `/` → `/{id}` (view mode)

3. **Editing Networker**:
   - `/` → `/{id}` → `/{id}?mode=edit` → `/` (after save)

4. **Managing Profile**:
   - `/` → `/profile`

## SEO & Meta Tags

### Dynamic Meta Tags

- **Main Page**: "Networking"
- **Networker Detail**: "{Networker Name} - Details"
- **Profile**: "Profile & Settings"
