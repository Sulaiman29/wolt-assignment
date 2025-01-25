# Delivery Price Calculator

## Overview
This project is a React-based application for calculating delivery prices based on user input. The application includes the following key features:
- Accepts user input for cart value, delivery location, and other parameters.
- Fetches venue-specific data for delivery calculations.
- Displays results dynamically in a `ResultsCard` component.

The project uses **Vitest** for testing, along with **React Testing Library** for DOM assertions.

---

## Features
- **Location Input**: Allows users to manually input latitude and longitude or use geolocation.
- **Dynamic Results Display**: Delivery price details are displayed dynamically after input submission.
- **Form Validation**: Ensures all user inputs are valid before calculating results.
- **Testing Framework**: Includes a comprehensive suite of unit and integration tests.

---

## Installation and Setup

### Prerequisites
Before running the application, ensure the following are installed:
- **Node.js** (v16 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** for package management.

---

### Steps to do testing
1. Clone or unzip the project folder.
2. Navigate to the project directory:
   ```bash
   cd your-project-folde
3. npm install
4. npx vitest to run all the tests

### Understanding the Tests
All tests are located in the __tests__ directory and follow the .test.tsx naming convention. The main tests include:

LocationInput.test.tsx:
Tests the functionality and validation of the LocationInput component.
Includes tests for geolocation, manual inputs, and error handling.
ResultsCard.test.tsx:
Verifies that the ResultsCard component correctly renders delivery details or error messages based on the state.
App.test.tsx:
Tests the integration of all components, including form submission and results display.
