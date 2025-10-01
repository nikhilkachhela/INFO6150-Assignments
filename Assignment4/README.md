# Assignment 4 – Web Form with Validations & AI Assistant

## Overview
This project implements a feedback form with **live validations, dynamic elements, and an AI Assistant chatbot**.  
It satisfies all requirements listed in Assignment 4, including regex-based validation, input masking, dynamic UI elements, a results table, and a simple FAQ chatbot.

---

## Features Implemented

### 1. Form Fields & Validations
- **First Name / Last Name**  
  - Must be 2–30 characters.  
  - Alphanumeric only (no special characters).  
  - Validated on key events.  

- **Email**  
  - Must end with `@northeastern.edu`.  
  - Regex validation applied.  

- **Phone Number**  
  - Must follow `(XXX) XXX-XXXX` format.  
  - Input masking formats dynamically as user types.  
  - Regex validation on input.  

- **Zip Code**  
  - Must be exactly **5 digits**.  
  - Regex validation applied.  

- **Street Address 1**  
  - Mandatory, cannot be empty.  

- **Street Address 2**  
  - Optional.  
  - Includes a **live character counter** (e.g., `7/20`).  

- **Dropdown: "How did you hear about us?"**  
  - Single-select list with 5 options (Google, Facebook, Friend, Advertisement, Other).  
  - Mandatory selection required.  

### 2. Dynamic Elements
- On selecting a dropdown option, a **checkbox** appears below.  
- If checkbox is **checked**, a new text field is displayed and marked as **mandatory**.  
- If unchecked, the field disappears.  

### 3. Submit & Reset
- **Submit button disabled** until all validations pass.  
- On submit:  
  - Captures data and appends it to a results table below the form.  
  - Preserves all previously submitted rows.  
  - Clears the form fields, resets counter, errors, and dynamic fields.  
- On reset:  
  - Clears all form inputs, counters, dynamic fields, and error messages.  

---

## Additional Features
1. **Dynamic Error Highlighting**  
   - Red error messages appear under each field on invalid input.  
   - Errors disappear once corrected.

2. **Phone Input Masking**  
   - User types numbers, and format is automatically applied as `(XXX) XXX-XXXX`.

3. **AI Assistant (FAQ Chatbot)**  
   - Floating button `🤖 AI Assistant` opens a chat window.  
   - Chat persists until closed.  
   - Predefined FAQs respond to keywords:
     - **email** → Must use Northeastern email.  
     - **phone** → Format must be `(XXX) XXX-XXXX`.  
     - **zip** → Zip code must be 5 digits.  
     - **required** → All fields except Street Address 2 are mandatory.  
     - **address** → Street Address 2 is optional.  
   - If no match is found, chatbot replies:  
     *“Sorry, I don’t know that yet. Please check the instructions.”*  

---

## Files
- `form.html` – Main HTML file with form and results table.  
- `style.css` – CSS for form layout, error highlighting, and chatbot styling.  
- `script.js` – JavaScript for validation, dynamic UI behavior, table population, and chatbot logic.  

---

## How to Run
1. Clone or download the project.  
2. Open `form.html` in any modern web browser.  
3. Fill out the form:  
   - Use a valid Northeastern email.  
   - Enter phone in `(123) 456-7890` format.  
   - Enter a 5-digit zip.  
   - Fill all mandatory fields.  
4. Try selecting different dropdown options and check/uncheck the checkbox to test dynamic field behavior.  
5. Submit → Data appears in the results table.  
6. Use the `Reset` button to clear everything.  
7. Try out the `🤖 AI Assistant` to test FAQs.  

---

## Validation Test Cases
✅ First Name = `John` → Pass  
❌ First Name = `J` → Fail (too short)  
✅ Email = `abc@northeastern.edu` → Pass  
❌ Email = `abc@gmail.com` → Fail (wrong domain)  
✅ Phone = `(123) 456-7890` → Pass  
❌ Phone = `1234567890` → Fail (wrong format)  
✅ Zip = `02120` → Pass  
❌ Zip = `2120` → Fail (not 5 digits)  
✅ Street Address 2 left empty → Pass (blank allowed in table)  

---

## Submission
- Push project to **private GitHub repo** using your Northeastern account.  
- Submit **zip file** to Canvas.  
- Provide GitHub URL on Canvas as required.  

---
