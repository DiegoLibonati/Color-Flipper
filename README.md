# Color Flipper

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Color Flipper** is a minimalist web application that generates random hex colors on demand. Every time you click the **Flip** button, the app picks a new color by randomly combining characters from the hexadecimal alphabet (`0–9`, `A–F`) to form a 6-character hex code. The generated color is instantly applied as the full-page background, giving you an immediate and immersive visual preview. At the same time, the hex value (e.g. `#A3F5C1`) is displayed on screen and its own text color is updated to match, creating a self-referential color label that stays legible against any background.

The use case is straightforward: designers, developers, or anyone working with color can use Color Flipper as a quick inspiration tool to discover color combinations, test how a hue looks at full saturation across the entire viewport, or simply grab a hex code to paste into a stylesheet, design file, or color picker. There are no inputs to fill out, no palettes to configure, and no extra steps — one click is all it takes.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.14.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/color-flipper`](https://www.diegolibonati.com.ar/#/project/color-flipper)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
