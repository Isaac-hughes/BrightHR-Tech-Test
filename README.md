# Document Manager App

This project is a simple **Document Manager** built with **Next.js** and **TypeScript**, allowing users to view and manage documents and folders. The app demonstrates filtering, sorting, and displaying hierarchical folder structures, along with unit tests using **Jest** and **React Testing Library**.

## Key Features

### 1. Document and Folder Display

- The app displays a list of documents and folders. Documents can be of different types (PDF, DOC, CSV, etc.), and folders can contain nested documents or other folders.
- The folder structure is dynamic, allowing for folders within folders.

### 2. Sorting and Filtering

- **Sorting**: Users can sort documents and folders by:
  - **Name**
  - **Date**
  - **Size (Ascending or Descending)**
- **Filtering**: Users can filter documents by name using the input box. The app supports filtering across all nested folders and files, making the search process seamless.

### 3. Recursive Folder Structure

- The `FolderItem` and `FileItem` components use a recursive approach to display nested folder contents. This allows for dynamically displaying folders within folders, making the app highly flexible for hierarchical data.

### Interesting Code Highlights

- **Dynamic Folder Structure**: The `FolderItem` component recursively renders folders, allowing for a tree-like structure.

- **Flattening and Sorting**: The Page component uses helper functions to flatten nested folder structures and sort them based on user input.

## Get started

After cloning the repo run npm install

Use npm run dev to run locally
Use npm run test to run unit tests
