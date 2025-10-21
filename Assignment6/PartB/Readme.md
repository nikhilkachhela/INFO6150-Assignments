# Part B — Event Stopwatch with Session Logging

## Description
Single-page stopwatch to time events, associate them with a chosen date, and save sessions to localStorage. Includes filtering and statistics.

## Features
- Timer in HH:MM:SS format
- Date picker (defaults to today)
- Event name validation (3–100 chars, only letters/numbers/spaces/hyphen/apostrophe)
- Start, Pause/Resume, Stop & Save, Reset controls
- Sessions saved to localStorage
- History list (most recent first)
- Filter by date
- Statistics: total sessions and total time
- Uses async/await + Promises for saving sessions

## Technologies
HTML5, CSS3, JavaScript (ES6+), jQuery

## How to run
Open `stopwatch.html` in a browser.

## Notes
- While timer is running, the date and event name inputs are disabled
- No inline popups used for validation errors; they appear below fields
