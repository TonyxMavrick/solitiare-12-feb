# Online Solitaire - Pure HTML/CSS/JS Version

This is a complete conversion of the React-based Online Solitaire website into pure HTML, CSS, and JavaScript. The website is now fully functional using only vanilla web technologies with no dependencies or build tools required.

## Files Structure

```
public/
├── index.html       - Home page with playable Solitaire game
├── about.html       - About Us page
├── contact.html     - Contact Us page with form
├── terms.html       - Terms & Conditions page
├── privacy.html     - Privacy Policy page
├── styles.css       - Complete stylesheet for all pages
├── game.js          - Solitaire game logic and functionality
└── README.md        - This file
```

## Features

### Solitaire Game
- ✅ Fully playable Klondike Solitaire
- ✅ HTML5 drag and drop functionality
- ✅ Click to auto-move cards to foundations
- ✅ Win detection with celebration toast
- ✅ Score tracking
- ✅ Move counter
- ✅ Timer
- ✅ Undo functionality
- ✅ Hint system
- ✅ New game button
- ✅ Smooth CSS animations
- ✅ Responsive design (mobile & desktop)

### Website Pages
- ✅ Home page with hero section and game
- ✅ About Us page with mission and values
- ✅ Contact Us page with form and contact information
  - Phone: +1-365-435-4432
  - Email: play@onlinesolitaire.in
- ✅ Terms & Conditions page
- ✅ Privacy Policy page

### Design
- ✅ Clean, modern UI
- ✅ Responsive navigation
- ✅ Mobile-friendly layout
- ✅ Smooth transitions and animations
- ✅ Toast notifications
- ✅ SEO-optimized meta tags

## How to Deploy

### Option 1: Static File Hosting
Simply upload all files in the `public/` folder to any static web hosting service:

1. **Netlify**: Drag and drop the `public` folder
2. **Vercel**: Deploy the `public` folder
3. **GitHub Pages**: Push to a repository and enable GitHub Pages
4. **AWS S3**: Upload files to an S3 bucket configured for static website hosting
5. **Any Web Server**: Upload files via FTP/SFTP

### Option 2: Local Testing
1. Open `index.html` in a web browser directly
2. Or use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server package)
   npx http-server
   ```
3. Visit `http://localhost:8000` in your browser

## No Build Process Required

This is pure HTML/CSS/JavaScript - no build tools, no npm, no dependencies!

- No Node.js required
- No package installation
- No compilation or transpilation
- No bundling needed
- Works directly in any modern browser

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Key Technologies Used

- **HTML5**: Semantic markup, drag and drop API
- **CSS3**: Flexbox, Grid, animations, gradients
- **Vanilla JavaScript**: ES6+, DOM manipulation, event handling

## Game Rules

### Objective
Move all cards to the four foundation piles, starting with Ace and building up to King in the same suit.

### Rules
- Cards in the tableau must be arranged in descending order and alternating colors
- Only Kings can be moved to empty tableau columns
- Foundation piles must start with an Ace and build up in the same suit
- Draw cards from the stock when no moves are available
- You can move multiple cards together if they're properly sequenced

### Controls
- **Drag and drop** cards to move them
- **Click** on a card to auto-move it to a foundation (if possible)
- **Click the stock pile** to draw a card
- Use the **"Hint"** button if you're stuck
- Use **"Undo"** to reverse your last move
- Use **"New Game"** to start a fresh game

## Customization

### Styling
Edit `styles.css` to customize:
- Colors and gradients
- Card designs
- Layout spacing
- Animations
- Fonts

### Game Logic
Edit `game.js` to modify:
- Game rules
- Scoring system
- Animation speeds
- Toast messages
- Win conditions

## Performance

- Fast loading (no external dependencies)
- Smooth animations (CSS-based)
- Efficient drag and drop
- Lightweight (~50KB total for all pages)

## SEO Optimized

All pages include:
- Proper meta descriptions
- Keywords
- Semantic HTML
- Descriptive titles
- Accessible markup

## Contact Information

For questions or support:
- Email: play@onlinesolitaire.in
- Phone: +1-365-435-4432

## License

© 2026 Online Solitaire. All rights reserved.

---

**Enjoy playing Solitaire!** 🃏♠️♥️♣️♦️
