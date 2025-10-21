# Part A — Calculator with User Login

## Description
Simple two-page web app with login page and calculator. Login validates Northeastern email and password, stores session in sessionStorage (or localStorage if "Remember Me").

## Features
- Email must end with @northeastern.edu
- Password minimum 8 chars
- Login button disabled until valid
- Session stored in sessionStorage or localStorage if Remember Me
- Calculator accepts negatives & decimals
- Single arrow function `calculate` handles add/subtract/multiply/divide
- Logout clears session and redirects
- Responsive and accessible design

## Technologies
HTML5, CSS3, JavaScript (ES6+), jQuery

## How to run
Open `login.html` in a browser (ensure folder structure is preserved). Use one of the hardcoded users in `js/login.js` (e.g., alice@northeastern.edu / password123).

## Notes
- No pop-up alerts used for validation
- Inline errors shown in red
