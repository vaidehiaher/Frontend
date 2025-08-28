🚀 Overview

This project was built as part of an internship assignment.
It contains two reusable UI components built with:

⚛️ React

📘 TypeScript

🎨 TailwindCSS

📚 Storybook

The components are:

InputField – a flexible input component with different states, sizes, and variants.

DataTable – a data table with sorting, selection, loading, and empty states.

🎯 Features
✅ InputField

Label, placeholder, helper text, error message

States: disabled, invalid

Variants: filled, outlined, ghost

Sizes: small, medium, large

Optional: clear button, password toggle (not implemented – optional in spec)

✅ DataTable

Display tabular data

Column sorting (ascending/descending)

Row selection (multiple)

Loading state

Empty state

📂 Folder Structure
frontend-assignment/
├── src/
│   ├── components/
│   │   ├── InputField.tsx
│   │   ├── InputField.stories.tsx
│   │   ├── DataTable.tsx
│   │   ├── DataTable.stories.tsx
│   ├── App.tsx
│   ├── index.css
│   └── ...
├── .storybook/
├── package.json
└── README.md

🛠️ Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd frontend-assignment

2. Install dependencies
npm install

3. Run the app
npm start


App runs at 👉 http://localhost:3000

4. Run Storybook
npm run storybook


Storybook runs at 👉 http://localhost:6006

## Run project
npm start

## Run Storybook
npm run storybook

## Run tests
npm test
