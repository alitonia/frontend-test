# Introduction

This project is a Next.js application that provides a search functionality.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

- Node.js (v22 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   git clone https://github.com/alitonia/frontend-test
   cd singgov-frontend

2. Install the dependencies:
   npm install

### Running the Application

To start the development server:
npm run dev

The application will be available at `http://localhost:3000/search`.

## Running the Tests

This project uses Cypress for end-to-end testing.

### Opening Cypress Test Runner

To open the Cypress Test Runner:
npm run cypress:open

This will open the Cypress Test Runner. Click on "E2E Testing" and then select your browser. You can then click on the
`search.cy.js` file to run the tests.

### Running Cypress Tests Headlessly

To run the Cypress tests in headless mode (useful for CI/CD):
npm run cypress:run

## Project Structure

- `src/`: Contains the source code for the application
    - `app/`: Next.js app directory
    - `components/`: React components
    - `hooks/`: Custom React hooks
    - `utils/`: Utility functions
- `cypress/`: Contains Cypress test files
    - `e2e/`: End-to-end test specifications
    - `support/`: Support files for Cypress tests

## Built With

- [Next.js](https://nextjs.org/) - The React framework used
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Cypress](https://www.cypress.io/) - End-to-end testing framework

## Contributing

_Coming soon..._
# frontend-test
