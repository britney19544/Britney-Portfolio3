# Photography Portfolio

Static site, no build step. Open `index.html` in a browser.

```
portfolio/
├── index.html        page structure and content (name, bio, email, links)
├── css/style.css     all styling, light/dark theme variables at the top
├── js/main.js        slideshow, animations, work list (the W array)
└── assets/images/    put your photos here
```

## Customise
- Name and bio: edit `index.html`, and `NAME` in `js/main.js` for the big hero name.
- Photos: in `js/main.js`, replace each `g:` gradient with `"url(assets/images/photo.jpg) center/cover"`.
- Location and clock timezone: `index.html` (Jakarta, ID) and `tick()` in `js/main.js`.
- Colors: CSS variables at the top of `css/style.css`.
