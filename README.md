# ✨ jenn's wardrobe

a cute closet organization app built with React, TypeScript, and styled-components. organize your wardrobe items by category with a beautiful pastel interface and track how often you wear each item.

visit the app: [https://jennwang.github.io/wardrobe](https://jennwang.github.io/wardrobe) ✨

## 🌸 features

- upload and display wardrobe items by category
- categorize items into tops, bottoms, shoes, and accessories
- track how many times each item has been worn
- modern, responsive grid layout
- cute pastel pink and purple theme
- montserrat font with lowercase styling
- hover effects and smooth transitions
- collapsible sidebar navigation
- client-side data persistence with IndexedDB
- custom styled form elements
- create and manage today's outfit selections

## 🎀 tech stack

- react
- typescript
- styled-components
- react-router-dom
- indexeddb for data storage
- google fonts (montserrat)

## 📁 project structure

```
src/
├── components/
│   ├── CategorySection.tsx   # category section component
│   ├── Navigation.tsx       # sidebar navigation component
│   ├── WardrobeItem.tsx     # individual item card component
│   ├── TodaysOutfit.tsx    # outfit selection component
│   ├── UploadForm.tsx       # form for adding new items
│   └── styles.ts            # styled components and theme
├── context/
│   └── SidebarContext.tsx   # sidebar state management
├── services/
│   ├── api.ts              # api service layer
│   └── db.ts               # indexeddb service
├── types/
│   └── index.ts            # typescript interfaces and types
├── App.tsx                  # main application component
└── index.css               # global styles
```

## 🗄️ data structure

The app uses IndexedDB to store the following information for each wardrobe item:
```typescript
interface WardrobeItem {
  id: number;
  item_name: string;
  type: 'tops' | 'bottoms' | 'shoes' | 'accessories';
  image_url: string;
  times_worn: number;
  created_at: string;
}
```

## 🚀 getting started

### local development

1. clone the repository
2. install dependencies:
   ```bash
   npm install
   ```
3. start the development server:
   ```bash
   npm start
   ```
4. open [http://localhost:3000](http://localhost:3000) in your browser

### deployment

to deploy the app to GitHub Pages:

1. update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   {
     "homepage": "https://yourusername.github.io/wardrobe"
   }
   ```

2. deploy the app:
   ```bash
   npm run deploy
   ```

3. visit your GitHub Pages URL to see the live app!

note: the app uses client-side storage (IndexedDB), so your data is stored locally in your browser.

## 📝 changelog

### version 1.0.0
- initial release with basic wardrobe management functionality
- implemented file upload system
- created responsive grid layout

### version 1.1.0
- added styled-components for styling
- implemented pastel pink and purple theme
- added hover effects and transitions

### version 1.2.0
- integrated montserrat font
- converted all text to lowercase
- added sparkle favicon and updated page title
- improved visual hierarchy with different font weights

### version 1.3.0
- added collapsible sidebar navigation
- improved responsive layout
- centered content with dynamic width

### version 1.4.0
- integrated IndexedDB for data persistence
- added "times worn" tracking
- implemented "i wore this today" button
- added data persistence
- items now sorted by creation date

### version 1.5.0
- added "today's outfit" feature
- implemented item selection functionality
- added outfit preview panel
- enhanced grid layout for better item display

## 🎨 color palette

- light pink: `#ffd1dc` (buttons, borders)
- light purple: `#d4a5d6` (category titles, hover states)
- muted purple: `#9b6b9d` (text, accents)
- background gradient: `#faf0f5` to `#f3e5f5`

## 💭 future improvements

- add item deletion functionality
- implement drag-and-drop for organizing items
- add custom categories
- add search and filter functionality
- add wear history with dates
- add outfit combinations tracking
- implement sorting options (most/least worn, newest/oldest)
- add outfit saving and history

## 📱 responsive design

the app is fully responsive and works on:
- desktop screens (max-width: 1400px)
- tablets (max-width: 1200px)
- mobile devices (max-width: 768px)

features:
- collapsible sidebar for space efficiency
- responsive grid layout
- adaptive content width
- mobile-friendly buttons and forms

## 🤝 contributing

feel free to contribute to this project by:
1. forking the repository
2. creating your feature branch
3. committing your changes
4. pushing to the branch
5. creating a pull request

## 📄 license

this project is licensed under the MIT License.
