import { useState } from "react";
import FileItem from "../FileItem/FileItem";
import styles from "../../app/page.module.css";
import { Folder } from "../../data/documents";

interface FolderItemProps {
  folder: Folder;
}

export default function FolderItem({ folder }: FolderItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.folderItem}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.folderHeader}>
        <img src="/folder-icon.png" alt="folder" />
        <div className={styles.folderDetails}>
          <h4>{folder.name}</h4>
          <span>{folder.added}</span>
          <span>{(folder.size / 1024).toFixed(2)} KB</span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.folderContents}>
          {folder.files.map((file, index) =>
            file.type === "folder" ? (
              <FolderItem key={index} folder={file as Folder} />
            ) : (
              <FileItem key={index} file={file} />
            )
          )}
        </div>
      )}
    </div>
  );
}
