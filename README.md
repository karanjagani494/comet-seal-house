# Comet Seal House

React 19 / TypeScript / Vite frontend.

## Run locally

From `client`, run `npm install` if dependencies are missing, then `npm run dev`.

- `/`: homepage
- `/products`: searchable catalogue with category filters, sorting, and product details
- `/about-us`: About Us page
- `/contact-us`: contact details and email-draft form

The original separate visual preview remains in `previews/comet-concept`. Its approved design is now implemented in the React client; it is not loaded in an iframe.

## Content and enquiries

The eight products in `client/src/lib/catalogue.ts` are fictional demonstration data. Dimensions, material selections, and generated imagery are illustrative and must be replaced or verified before use as a real product catalogue. Product illustration source and prompt are documented in `previews/comet-concept/README.md`.

Product-detail enquiries pass the selected model to `/contact-us?product=MODEL`. The contact form prepares an email draft for review in the visitor's email app. It does not send or store messages. There is no implemented server API.

## Checks

From `client`, run `npm run lint` and `npm run build`. The production output is `client/dist`. Configure the host to serve `index.html` for client-side routes.
