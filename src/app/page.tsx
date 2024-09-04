"use client";
import { useState, useMemo } from "react";
import documents, { File, Folder } from "../data/documents";
import FileItem from "../components/FileItem/FileItem";
import FolderItem from "../components/FolderItem/FolderItem";
import styles from "./page.module.css";

// Helper function to flatten the document structure
const flattenDocuments = (data: (File | Folder)[]): (File | Folder)[] => {
  return data.reduce<(File | Folder)[]>((accumulator, item) => {
    accumulator.push(item);
    if ("files" in item && item.type === "folder") {
      accumulator.push(...flattenDocuments(item.files));
    }
    return accumulator;
  }, []);
};

// Helper function to apply sorting
const applySorting = (
  data: (File | Folder)[],
  sortType: "name" | "date" | "sizeAsc" | "sizeDesc"
): (File | Folder)[] => {
  return [...data].sort((a, b) => {
    switch (sortType) {
      case "name":
        return a.name.localeCompare(b.name);
      case "date":
        return new Date(a.added).getTime() - new Date(b.added).getTime();
      case "sizeAsc":
        return a.size - b.size;
      case "sizeDesc":
        return b.size - a.size;
      default:
        return 0;
    }
  });
};

// Main Page component
export default function Page() {
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState<
    "name" | "date" | "sizeAsc" | "sizeDesc"
  >("name");

  const flattenedData = useMemo(() => flattenDocuments(documents), []);

  // Filter and sort the data based on the current filter and sort type
  const filteredData = useMemo(() => {
    const dataToSort = filter
      ? flattenedData.filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
      : documents;

    return applySorting(dataToSort, sortType);
  }, [filter, sortType, flattenedData]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Document Manager</h1>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.inputField}
        />
        <select
          value={sortType}
          onChange={(e) =>
            setSortType(
              e.target.value as "name" | "date" | "sizeAsc" | "sizeDesc"
            )
          }
          className={styles.inputField}
          data-testid="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
          <option value="sizeAsc">Sort by Size (Ascending)</option>
          <option value="sizeDesc">Sort by Size (Descending)</option>
        </select>
      </div>

      <div className={styles.documentList}>
        {filteredData.map((item, index) =>
          item.type === "folder" ? (
            <FolderItem key={index} folder={item as Folder} />
          ) : (
            <FileItem key={index} file={item as File} />
          )
        )}
      </div>
    </div>
  );
}
