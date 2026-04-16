# Netflix Authenticated Experience Plan

## Summary
The goal is to improve the post-sign-in experience so it closely mirrors Netflix's actual authenticated UI. Currently, the sign-out button is oddly placed, the search bar is static, and there is no Account Settings page. We will implement an authentic Profile Dropdown, an Expandable Search Bar, and a mock Account Settings page to make the clone feel complete.

## Current State vs. Netflix (Authenticated Experience)

| Feature | Our Clone | Official Netflix |
| :--- | :--- | :--- |
| **Top Navigation** | Static links, weirdly placed Sign Out button. | Sticky nav with Notifications bell, expandable Search, and a rich Profile Dropdown. |
| **Search Bar** | Always visible, static input field. | Search icon that expands into a text input on click. |
| **Profile Menu** | Just displays the current profile name. | Hover dropdown showing other profiles, "Manage Profiles", "Account", "Help Center", and "Sign out of Netflix". |
| **Account Settings**| Does not exist. | Detailed page showing Membership & Billing, Plan Details, and Profile Controls. |
| **Manage Profiles** | Button on `/profiles` does nothing. | Enters an "edit" mode to change avatars/names. |
| **Home & My List** | Basic navigation works. | Seamless filtering and dedicated pages (which we have mostly achieved). |

## Proposed Changes

### 1. Routing Updates
- **File**: `src/lib/router.ts`
- **Action**: Add a new `account` route (`/account`) to support navigating to the Account Settings page from the profile dropdown.

### 2. Implement Expandable Search Bar
- **File**: `src/pages/BrowsePage.tsx` & `src/App.css`
- **Action**: 
  - Update the `.browseSearch` markup so it initially shows just a magnifying glass icon.
  - Add state (`isSearchOpen`) to toggle an expanded class that reveals the input field with a smooth CSS transition.
  - Close the search bar if the user clicks outside or clears the input and blurs.

### 3. Implement Authentic Profile Dropdown
- **File**: `src/components/ProfileDropdown.tsx` (New) & `src/App.css`
- **Action**: 
  - Create a new component that renders the current profile avatar and a caret.
  - On hover, display a dropdown menu (using standard Netflix dark theme styling).
  - The dropdown will include:
    - A list of other available profiles (mocked or from state).
    - A link to `Manage Profiles` (redirects to `/profiles`).
    - A link to `Account` (redirects to `/account`).
    - A link to `Help Center` (dummy link).
    - The `Sign out of Netflix` button (calls `onSignOut`).

### 4. Create Account Settings Page
- **File**: `src/pages/AccountPage.tsx` (New) & `src/App.css`
- **Action**:
  - Build a new page mimicking the Netflix account screen (light gray/white background, classic Netflix settings layout).
  - Add sections for:
    - **Membership & Billing**: Mock email, password dots, phone number, and a "Cancel Membership" button.
    - **Plan Details**: Display "Premium Ultra HD".
    - **Profile & Parental Controls**: List the user's profiles with their avatars.
  - Include a simple header with the Netflix logo that links back to Home.

### 5. Clean up Profiles Page
- **File**: `src/pages/ProfilesPage.tsx`
- **Action**: Remove the top-right `Sign Out` button to match Netflix's actual "Who's watching?" screen, which relies purely on the logo for navigation and doesn't clutter the header.

## Checklist & Execution Steps

- [ ] Add `/account` to routing definitions.
- [ ] Create `ProfileDropdown` component and styles.
- [ ] Update `BrowsePage.tsx` to replace the static search and sign-out button with the Expandable Search and `ProfileDropdown`.
- [ ] Create `AccountPage.tsx` with dummy data and styles.
- [ ] Update `App.tsx` to render `AccountPage` when on the `/account` route.
- [ ] Remove the awkwardly placed Sign Out button from `ProfilesPage.tsx`.

## Verification Steps
1. Sign in to the application and select a profile.
2. Verify the Search icon expands smoothly when clicked and collapses when empty/blurred.
3. Hover over the Profile avatar in the top right; verify the dropdown appears.
4. Click "Account" in the dropdown and verify it navigates to the new Account Settings page.
5. Verify the "Sign out of Netflix" button in the dropdown successfully logs the user out.