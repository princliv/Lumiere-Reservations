# Restaurant Website
## Admin Content Management & Multi-Tenant CMS Plan

### 1. Overview

The restaurant website will be converted from a static frontend-driven website into a **dynamic, admin-managed restaurant website platform**.

The primary objective is to allow restaurant owners/managers to log into an **Admin Panel** and manage the content of their website without requiring any technical knowledge or developer assistance.

The admin will be able to:

- Manage website branding
- Edit text/content
- Change images and videos
- Manage the homepage sections
- Rearrange homepage sections
- Manage restaurant menu items
- Add, edit and delete menu items
- Mark menu items as unavailable
- Manage item offers/discounts
- Manage add-ons
- Manage categories
- Manage website-wide settings
- Publish/unpublish changes

However, the administrator **will not be allowed to change the actual design/layout/structure of predefined website sections**.

This ensures that every restaurant website maintains a consistent, professional and responsive design while still allowing complete content control.

---

# 2. Core Product Concept

The system will consist of two major parts:

### A. Restaurant Website

The customer-facing website that visitors see.

Example:

```text
restaurant.com
```

The website will dynamically load its content from the backend instead of having restaurant-specific content hardcoded in the frontend.

### B. Restaurant Admin Panel

A private dashboard where restaurant owners can manage their website.

Example:

```text
admin.restaurant-platform.com
```

or:

```text
restaurant.com/admin
```

Each restaurant receives its own login credentials.

After login, the restaurant administrator can only access and modify the data belonging to their restaurant.

---

# 3. Multi-Tenant Architecture

The backend will be shared across all restaurants.

For example:

```text
                    Common Backend
                          |
          ---------------------------------
          |               |               |
     Restaurant A    Restaurant B    Restaurant C
          |               |               |
      Website A        Website B        Website C
      Admin A          Admin B          Admin C
```

There should be **one backend and one database**, with restaurant-specific data separated logically.

Every major database record should contain a:

```text
restaurantId
```

Example:

```text
Menu Item
---------
id
restaurantId
categoryId
name
description
price
image
isAvailable
...
```

This ensures Restaurant A cannot access Restaurant B's menu, images or website content.

---

# 4. Admin Authentication

The admin panel will require authentication.

### Login

Admin should be able to log in using:

- Email
- Password

Optional future additions:

- OTP login
- Google login
- Two-factor authentication
- Password reset
- Email verification

### Admin Roles

The system should support roles from the beginning.

#### Super Admin

Platform owner/developer.

Can:

- Create restaurants
- Delete restaurants
- Manage restaurant accounts
- Create admin users
- View all restaurants
- Configure platform settings
- Access all restaurant data

#### Restaurant Owner

Can:

- Manage website content
- Manage menu
- Manage branding
- Manage media
- Manage offers
- Manage add-ons
- Manage website settings

#### Restaurant Staff

Optional role.

Can have restricted permissions such as:

- Menu management
- Order/menu availability management

but cannot change branding or website configuration.

---

# 5. Admin Dashboard

After login, the restaurant should see a dashboard.

### Dashboard Overview

Possible dashboard cards:

```text
------------------------------------------------
| Menu Items | Categories | Offers | Add-ons   |
------------------------------------------------

------------------------------------------------
| Website Status                              |
| ● Published                                |
------------------------------------------------

------------------------------------------------
| Quick Actions                              |
| Edit Website | Manage Menu | Add Item      |
------------------------------------------------
```

### Dashboard Information

The dashboard can display:

- Total menu items
- Available items
- Unavailable items
- Total categories
- Active offers
- Total add-ons
- Website status
- Last published time
- Recent changes

---

# 6. Website Content Management

The main principle of the CMS is:

> **Admins can modify content, but cannot modify the predefined section structure/design.**

For example, suppose the homepage has:

```text
Header
Hero
About Restaurant
Featured Menu
Gallery
Special Offers
Testimonials
Location
Footer
```

The admin can change the content inside these sections.

They cannot:

- Add random columns
- Change grid structure
- Change component layout
- Resize cards
- Modify CSS
- Change section structure
- Add arbitrary UI components

This protects the visual quality of the website.

---

# 7. Homepage Management

The admin panel should contain:

```text
Website
 └── Homepage
```

Inside the Homepage manager, all available sections should be displayed.

Example:

```text
Homepage Sections

☰ Header
☰ Hero
☰ About
☰ Featured Menu
☰ Offers
☰ Gallery
☰ Testimonials
☰ Location
☰ Footer
```

The drag handle allows the admin to rearrange sections.

Example:

```text
Before

Hero
About
Menu
Gallery
Offers

After

Hero
Offers
Menu
About
Gallery
```

The frontend automatically renders the sections in the selected order.

---

# 8. Section Visibility

Every supported section should have:

```text
Visible / Hidden
```

Example:

```text
About Restaurant
[✓] Visible
```

The admin can hide a section without deleting its content.

This is preferable to allowing admins to delete sections because the predefined website structure remains intact.

---

# 9. Header Management

The Header section should provide controls for:

### Logo

Admin can:

- Upload logo
- Replace logo
- Remove logo
- Preview logo

Supported formats:

- PNG
- JPG/JPEG
- WebP
- SVG where supported

### Brand Name

Example:

```text
Restaurant Name:
[ The Royal Kitchen ]
```

### Header Color

Admin can select:

- Primary brand color
- Header background color
- Text color
- Button color where applicable

Preferably provide:

```text
Color Picker
HEX
RGB
```

### Header Font

Admin can select from a controlled list of supported fonts.

Example:

```text
Font Family

Inter
Poppins
Montserrat
Playfair Display
Roboto
Lato
DM Sans
```

The platform should not allow arbitrary CSS/font code.

---

# 10. Global Typography Management

The restaurant can customize the website's typography while staying within predefined design constraints.

Possible settings:

### Primary Font

Used for:

- Navigation
- Buttons
- Body text

### Heading Font

Used for:

- Hero heading
- Section titles
- Menu headings

### Optional Font Weight

Controlled options:

```text
Light
Regular
Medium
Semi Bold
Bold
```

The system should apply these values through the website theme.

---

# 11. Global Brand Settings

Create a central:

```text
Brand Settings
```

module.

It can contain:

### Branding

- Restaurant name
- Logo
- Favicon
- Brand colors
- Secondary colors

### Typography

- Primary font
- Heading font

### Social Media

- Instagram
- Facebook
- YouTube
- X
- WhatsApp

### Contact

- Phone
- Email
- Address

### Business Information

- Restaurant description
- Opening hours
- Closing hours
- Cuisine type

This information can then be reused across different website sections.

---

# 12. Hero Section Management

The hero section remains structurally fixed.

The admin can edit:

- Heading
- Subtitle
- Description
- Button text
- Button link
- Background image
- Background video if supported
- Overlay settings within predefined limits

Example:

```text
Hero Content

Heading:
[ Authentic Taste, Modern Experience ]

Description:
[ Experience handcrafted dishes... ]

Button:
[ View Menu ]

Button Link:
[ /menu ]

Background:
[ Upload Image ]
```

The layout itself cannot be changed.

---

# 13. Other Website Sections

Every existing website section should receive its own content editor.

For example:

### About Section

Editable:

- Heading
- Description
- Image
- Button text
- Button link

Not editable:

- Number of columns
- Layout
- Image position
- Card structure
- Section design

---

### Featured Menu Section

Editable:

- Section heading
- Description
- Selected menu items

The menu items themselves should come from the central Menu Management system.

This means an admin doesn't need to edit the same menu item in multiple places.

---

### Gallery

Admin can:

- Upload images
- Replace images
- Delete images
- Change image ordering
- Add captions where supported

The gallery layout remains fixed.

---

### Testimonials

Admin can:

- Add testimonial
- Edit testimonial
- Delete testimonial
- Change customer name
- Add customer image if supported
- Change testimonial order

The testimonial card design remains fixed.

---

### Offers / Promotions

Admin can manage:

- Offer title
- Description
- Image
- Discount
- Validity
- CTA
- Linked menu item/category

---

### Location Section

Admin can edit:

- Address
- Google Maps location/link
- Phone number
- Opening hours

The map/layout structure remains fixed.

---

# 14. Media Management

A centralized Media Library should be implemented.

Example:

```text
Media Library

Images
Videos
Logos
```

Admin can:

- Upload media
- Preview media
- Search media
- Delete unused media
- Reuse previously uploaded media

Supported image formats:

- JPG
- JPEG
- PNG
- WebP

Supported video formats can include:

- MP4
- WebM

The actual files should preferably be stored in cloud storage such as an object storage service rather than directly inside the database.

The database should store:

```text
mediaId
restaurantId
fileUrl
fileType
fileName
altText
createdAt
```

---

# 15. Menu Management

Menu management is one of the most important parts of the Admin Panel.

Navigation:

```text
Admin
 └── Menu
```

The menu system should support:

```text
Categories
Menu Items
Add-ons
Offers
Availability
```

---

# 16. Menu Categories

Admin can:

- Create category
- Edit category
- Delete category
- Reorder categories
- Hide category

Example:

```text
Starters
Main Course
Pizza
Burgers
Desserts
Beverages
```

Each category can have:

```text
id
restaurantId
name
description
image
displayOrder
isVisible
```

---

# 17. Menu Item Management

Each menu item should support:

```text
Item Name
Description
Price
Image
Category
Availability
Featured
Vegetarian / Non-Vegetarian
Tags
Offers
Add-ons
```

Example:

```text
------------------------------------------------
Butter Chicken

₹349

Creamy tomato-based chicken curry.

[Image]

Category:
Main Course

Availability:
● Available

Featured:
✓

Add-ons:
+ Extra Butter
+ Extra Cheese
------------------------------------------------
```

---

# 18. Add New Menu Item

Admin should have an:

```text
+ Add Menu Item
```

button.

Form:

```text
Item Name *
Description
Price *
Category *
Image
Food Type
Preparation Time
Tags
Availability
Featured
Add-ons
Offer
```

The admin saves the item and it immediately becomes available in the appropriate website/menu interface after publishing or based on the platform's configured publishing model.

---

# 19. Edit Menu Item

Admin can edit every content field of an existing item.

Example:

```text
Edit Item

Name
Price
Description
Image
Category
Availability
Offers
Add-ons
```

---

# 20. Delete Menu Item

Admin should be able to delete menu items.

However, preferably use **soft deletion**.

Instead of permanently deleting:

```text
deletedAt
```

can be stored.

This helps prevent accidental data loss and maintains historical references.

---

# 21. Item Availability

Each menu item should have an availability toggle.

Example:

```text
Butter Chicken

● Available
```

If temporarily unavailable:

```text
○ Unavailable
```

The website should automatically display:

```text
Unavailable
```

or disable ordering for that item according to the website's existing design.

The admin should not need to delete the item just because it is temporarily unavailable.

---

# 22. Featured Menu Items

Admin can mark items as:

```text
Featured
```

Featured items can automatically appear in the homepage's Featured Menu section.

Example:

```text
Butter Chicken       ✓ Featured
Paneer Tikka         ✓ Featured
Veg Biryani          ✗
```

---

# 23. Menu Item Offers

Each menu item can have an offer.

Possible offer types:

### Percentage Discount

```text
20% OFF
```

### Fixed Discount

```text
₹50 OFF
```

### Special Price

```text
Original: ₹399
Offer: ₹299
```

### Buy One Get One

```text
Buy 1 Get 1
```

Offer configuration:

```text
Offer Name
Offer Type
Discount Value
Start Date
End Date
Active / Inactive
```

---

# 24. Add-on Management

Add-ons should be managed separately.

Example:

```text
Add-ons

Extra Cheese       ₹50
Extra Sauce        ₹20
Extra Paneer       ₹80
Extra Chicken      ₹120
```

Admin can:

- Add add-on
- Edit add-on
- Delete add-on
- Set price
- Set availability

---

# 25. Assign Add-ons to Menu Items

An add-on can be associated with one or multiple menu items.

Example:

```text
Pizza
 ├── Extra Cheese ₹50
 ├── Extra Olives ₹40
 └── Extra Paneer ₹80
```

The admin should be able to select:

```text
Available Add-ons
☑ Extra Cheese
☑ Extra Olives
☐ Extra Chicken
```

This avoids creating duplicate add-on records.

---

# 26. Menu Item Variants

If required, the system should support variants.

Example:

```text
Pizza

Small    ₹199
Medium   ₹299
Large    ₹399
```

or:

```text
Coffee

Regular   ₹120
Large     ₹160
```

This should be implemented as a structured menu-item variant system rather than manually creating separate items.

---

# 27. Menu Ordering

Admin should be able to drag and reorder:

```text
Categories
Menu Items
```

Example:

```text
☰ Paneer Tikka
☰ Chicken Tikka
☰ Butter Chicken
☰ Biryani
```

The order should be stored in the database.

---

# 28. Website Section Configuration

Each homepage section should have a predefined schema.

Example:

```text
HeroSection

{
  title,
  description,
  image,
  buttonText,
  buttonLink
}
```

Another example:

```text
AboutSection

{
  title,
  description,
  image,
  buttonText
}
```

The frontend component remains fixed.

Only the data changes.

This architecture is important because it prevents the admin from accidentally breaking the website design.

---

# 29. Recommended Frontend Architecture

Instead of:

```text
Hardcoded Restaurant Content
        ↓
React Components
        ↓
Website
```

Move toward:

```text
Database
    ↓
API
    ↓
Restaurant Website Frontend
    ↓
Dynamic Components
```

The admin panel becomes:

```text
Admin Panel
    ↓
API
    ↓
Database
```

Both applications use the same backend.

---

# 30. Dynamic Section Rendering

The homepage can be represented as:

```text
sections = [
  {
    type: "hero",
    order: 1,
    visible: true
  },
  {
    type: "about",
    order: 2,
    visible: true
  },
  {
    type: "featured_menu",
    order: 3,
    visible: true
  }
]
```

The frontend then renders the predefined component associated with each section type.

Example:

```text
type = hero
      ↓
HeroSection component

type = about
      ↓
AboutSection component

type = featured_menu
      ↓
FeaturedMenuSection component
```

This allows reordering without allowing the admin to modify the structure.

---

# 31. API Structure

The backend should expose restaurant-scoped APIs.

Example:

```text
Authentication
POST   /auth/login
POST   /auth/logout
POST   /auth/forgot-password
```

### Website

```text
GET    /restaurants/:id/website
PUT    /restaurants/:id/website
```

### Homepage

```text
GET    /restaurants/:id/homepage
PUT    /restaurants/:id/homepage
PUT    /restaurants/:id/homepage/sections/order
PUT    /restaurants/:id/homepage/sections/:section
```

### Media

```text
GET    /restaurants/:id/media
POST   /restaurants/:id/media
DELETE /restaurants/:id/media/:mediaId
```

### Menu

```text
GET    /restaurants/:id/menu
POST   /restaurants/:id/menu/items
PUT    /restaurants/:id/menu/items/:itemId
DELETE /restaurants/:id/menu/items/:itemId
```

### Categories

```text
POST   /restaurants/:id/menu/categories
PUT    /restaurants/:id/menu/categories/:categoryId
DELETE /restaurants/:id/menu/categories/:categoryId
```

### Add-ons

```text
GET    /restaurants/:id/addons
POST   /restaurants/:id/addons
PUT    /restaurants/:id/addons/:addonId
DELETE /restaurants/:id/addons/:addonId
```

### Offers

```text
GET    /restaurants/:id/offers
POST   /restaurants/:id/offers
PUT    /restaurants/:id/offers/:offerId
DELETE /restaurants/:id/offers/:offerId
```

---

# 32. Database Structure

A recommended initial database structure:

```text
users
restaurants
user_restaurants
roles
permissions

website_settings
brand_settings
homepage_sections

media

menu_categories
menu_items
menu_item_variants

addons
menu_item_addons

offers
menu_item_offers

social_links
business_hours

audit_logs
```

---

# 33. Important Restaurant Relationship

A user should never directly control another restaurant's data.

For example:

```text
User A
  ↓
Restaurant A
  ↓
Restaurant A Menu
  ↓
Restaurant A Website
```

Backend authorization must verify:

```text
authenticatedUser.restaurantId
==
requestedResource.restaurantId
```

This validation must happen on the backend.

It should **never rely only on frontend restrictions**.

---

# 34. Draft and Publish System

A professional CMS should ideally have a draft/publish workflow.

When the admin changes content:

```text
Admin edits content
       ↓
Save Draft
       ↓
Preview
       ↓
Publish
       ↓
Live Website
```

This prevents incomplete changes from immediately appearing on the live website.

Buttons:

```text
Save Draft
Preview
Publish Changes
```

---

# 35. Preview Mode

The admin should be able to preview changes before publishing.

Example:

```text
[ Save Draft ] [ Preview ] [ Publish ]
```

Preview should show the actual restaurant website with the latest draft content.

---

# 36. Change History

For important changes, maintain an audit log.

Example:

```text
Activity

Ankit changed:
Butter Chicken price
₹299 → ₹349

2 minutes ago
```

This is useful for:

- Troubleshooting
- Accountability
- Recovering accidental changes
- Understanding who changed content

---

# 37. Admin Navigation

Recommended Admin Panel structure:

```text
Dashboard

Website
 ├── Homepage
 ├── Header
 ├── Sections
 ├── Branding
 ├── Media Library

Menu
 ├── Categories
 ├── Menu Items
 ├── Add-ons
 ├── Offers

Restaurant
 ├── Information
 ├── Contact
 ├── Opening Hours
 └── Social Media

Settings
 ├── Account
 ├── Users
 ├── Permissions
 └── Security
```

---

# 38. Website Editor UX

The editor should be simple enough for a restaurant owner who has no technical background.

Avoid exposing:

- HTML
- CSS
- JSON
- Database IDs
- API information
- Component names
- Technical configuration

Instead use familiar controls:

```text
Heading
Description
Upload Image
Choose Color
Select Font
Add Item
Delete
Hide
Reorder
Save
Publish
```

---

# 39. Image Management UX

Whenever an image is editable, provide:

```text
Current Image

[ Image Preview ]

[ Replace Image ]
[ Remove ]
```

When uploading:

```text
Upload Image
       ↓
Preview
       ↓
Save
```

Optional:

- Image compression
- WebP conversion
- Automatic resizing
- Alt text
- Image optimization

---

# 40. Video Management

Where the existing website uses videos, the admin should be able to manage them similarly.

Admin can:

- Upload video
- Replace video
- Remove video
- Preview video

For large videos, use object/cloud storage and preferably CDN delivery.

Do not store video binary data directly inside the database.

---

# 41. Responsive Design Protection

The admin must never be able to break the responsive layout.

For example, don't provide controls such as:

```text
Desktop width
Mobile width
Custom margin
Custom padding
Grid columns
Font pixel size
```

Instead use predefined design tokens.

For example:

```text
Heading Size:
Small
Medium
Large
```

This keeps the website responsive.

---

# 42. Theme System

The website should have a controlled theme system.

Example:

```text
Theme
 ├── Primary Color
 ├── Secondary Color
 ├── Accent Color
 ├── Heading Font
 ├── Body Font
 ├── Button Style
 └── Border Radius
```

However, only safe predefined values should be exposed.

The restaurant should be able to personalize the brand without changing the actual website design.

---

# 43. Restaurant Onboarding

When a new restaurant becomes a client:

### Step 1

Super Admin creates restaurant.

```text
Restaurant Name
Restaurant Slug
Admin Email
```

### Step 2

Create restaurant admin.

### Step 3

Assign website template.

### Step 4

Configure initial branding.

### Step 5

Add/import menu.

### Step 6

Configure restaurant information.

### Step 7

Publish website.

The same backend can then support hundreds or thousands of restaurants.

---

# 44. Restaurant Identification

Each restaurant should have a unique identifier.

For example:

```text
restaurantId:
8f91...
```

and potentially:

```text
slug:
the-royal-kitchen
```

The public website can identify the restaurant through:

```text
domain
subdomain
slug
```

Examples:

```text
theroyalkitchen.com
```

or:

```text
theroyalkitchen.yourplatform.com
```

or:

```text
yourplatform.com/theroyalkitchen
```

For a SaaS-style product, custom domains can be added later.

---

# 45. Security Requirements

Because this is a multi-tenant platform, security is critical.

Implement:

- JWT/session authentication
- Password hashing
- Role-based authorization
- Restaurant-level authorization
- Input validation
- API rate limiting
- Secure file upload validation
- File type validation
- Maximum upload size
- Audit logs
- HTTPS
- Secure cookies where applicable
- CSRF protection where relevant
- Database constraints

Never trust:

```text
restaurantId
```

sent from the frontend.

The backend should derive/verify the restaurant context from the authenticated user/session.

---

# 46. Content Validation

Every editable field should have validation.

Example:

```text
Restaurant Name
Required
Maximum 100 characters
```

Price:

```text
Number
Minimum 0
```

Image:

```text
Allowed file types
Maximum file size
```

Description:

```text
Maximum character count
```

This prevents bad content from breaking the frontend.

---

# 47. Delete Confirmation

Destructive actions should require confirmation.

Example:

```text
Delete Menu Item?

Butter Chicken will be removed from
your menu.

[Cancel] [Delete]
```

For important content, soft deletion is recommended.

---

# 48. Success and Error Feedback

Every action should provide clear feedback.

Example:

```text
✓ Menu item updated successfully.
```

or:

```text
✓ Website changes published.
```

Errors should be understandable:

```text
Unable to upload image.
Please try again.
```

Avoid technical error messages.

---

# 49. Recommended Development Phases

## Phase 1 – Backend Foundation

Build:

- Authentication
- Users
- Restaurants
- Roles
- Restaurant authorization
- Database structure
- Basic API architecture

---

## Phase 2 – Convert Static Website to Dynamic

Replace hardcoded content with:

```text
API → Database → Frontend
```

Build:

- Website settings
- Homepage sections
- Dynamic content
- Section ordering
- Section visibility

---

## Phase 3 – Branding CMS

Build:

- Logo management
- Restaurant name
- Colors
- Fonts
- Favicon
- Social links
- Contact details

---

## Phase 4 – Media Library

Build:

- Image upload
- Video upload
- Media library
- Image replacement
- Media deletion
- Cloud storage integration

---

## Phase 5 – Menu CMS

Build:

- Categories
- Menu items
- Item images
- Prices
- Availability
- Featured items
- Reordering

---

## Phase 6 – Add-ons & Offers

Build:

- Add-ons
- Item/add-on relationships
- Offers
- Discounts
- Offer validity
- Item variants

---

## Phase 7 – Preview & Publishing

Build:

- Draft system
- Preview
- Publish
- Version/history
- Audit logs

---

## Phase 8 – Multi-Restaurant Management

Build Super Admin:

```text
Restaurants
Admins
Websites
Subscriptions
Status
```

Allow the platform owner to create and manage multiple restaurant websites.

---

# 50. Recommended Admin MVP

The first production version should prioritize:

### Authentication

✓ Login  
✓ Logout  
✓ Password reset  

### Website

✓ Homepage content  
✓ Section editing  
✓ Section ordering  
✓ Section visibility  
✓ Header management  
✓ Branding  
✓ Images  
✓ Videos  

### Menu

✓ Categories  
✓ Add item  
✓ Edit item  
✓ Delete item  
✓ Availability  
✓ Price  
✓ Image  
✓ Offers  
✓ Add-ons  
✓ Reordering  

### Platform

✓ Multi-restaurant architecture  
✓ Restaurant-level permissions  
✓ Admin roles  
✓ Database separation  
✓ Media storage  

---

# 51. Future Features

The architecture should leave room for future functionality such as:

### Restaurant Operations

- Online orders
- Order management
- Table reservations
- QR menu
- Table ordering
- Kitchen display system
- Delivery integration

### Marketing

- Coupons
- Loyalty programs
- Customer reviews
- Push notifications
- Email campaigns
- WhatsApp campaigns

### Analytics

- Website visitors
- Most viewed menu items
- Most ordered items
- Offer performance
- Conversion analytics

### AI

- AI-generated menu descriptions
- AI image enhancement
- AI SEO content
- AI offer generation
- AI recommendations

### Platform

- Subscription management
- Billing
- Custom domains
- Multiple branches
- Multiple admin users
- White-label support

---

# 52. Final User Experience

The restaurant owner's experience should ultimately be:

```text
LOGIN
  ↓
DASHBOARD
  ↓
┌─────────────────────────────┐
│ Manage Website              │
│                             │
│ • Edit Homepage             │
│ • Edit Header               │
│ • Change Branding           │
│ • Manage Images/Videos      │
│ • Reorder Sections          │
└─────────────────────────────┘

  ↓

┌─────────────────────────────┐
│ Manage Menu                 │
│                             │
│ • Categories                │
│ • Menu Items                │
│ • Add Item                  │
│ • Edit Item                 │
│ • Delete Item               │
│ • Availability              │
│ • Offers                    │
│ • Add-ons                   │
└─────────────────────────────┘

  ↓

SAVE
  ↓
PREVIEW
  ↓
PUBLISH
  ↓
LIVE RESTAURANT WEBSITE
```

---

# 53. Core Design Principle

The most important architectural principle for this platform is:

> **Content should be dynamic. Design should remain controlled.**

The restaurant owner gets complete control over their business content while the platform controls the visual system.

### Admin controls:

✓ Text  
✓ Images  
✓ Videos  
✓ Logo  
✓ Brand name  
✓ Colors  
✓ Fonts  
✓ Menu  
✓ Prices  
✓ Categories  
✓ Availability  
✓ Offers  
✓ Add-ons  
✓ Section visibility  
✓ Section ordering  
✓ Restaurant information  

### Admin does NOT control:

✗ HTML  
✗ CSS  
✗ Component structure  
✗ Grid structure  
✗ Section layout  
✗ Responsive breakpoints  
✗ Arbitrary spacing  
✗ Arbitrary design changes  

This approach gives restaurant owners flexibility while ensuring every website remains professional, responsive, maintainable and visually consistent.

---

# 54. Final Architecture

The final system should be designed as a reusable platform:

```text
                     SUPER ADMIN
                          |
                          ↓
                  ┌───────────────┐
                  │ Shared Backend│
                  │      API      │
                  └───────┬───────┘
                          |
                    Shared Database
                          |
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
 Restaurant A       Restaurant B       Restaurant C
        |                 |                 |
    Admin A            Admin B            Admin C
        |                 |                 |
    Website A          Website B          Website C
```

All restaurants use the same:

- Backend
- Database infrastructure
- Authentication system
- Admin application
- Website component system
- Media infrastructure

But each restaurant has its own:

- Content
- Branding
- Menu
- Images
- Videos
- Offers
- Add-ons
- Admin users
- Website configuration

This creates a scalable **multi-tenant Restaurant Website CMS/SaaS platform** where creating a new restaurant website becomes primarily a matter of configuration and content setup rather than developing a new backend for every client.