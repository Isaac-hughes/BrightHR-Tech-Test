import styles from "../../app/page.module.css";
import { File } from "../../data/documents";

interface FileItemProps {
  file: File;
}

export default function FileItem({ file }: FileItemProps) {
  return (
    <div className={styles.fileItem}>
      <img src={`/file-icons/${file.type}.png`} alt={file.type} />
      <div className={styles.fileDetails}>
        <span>
          <b>{file.name}</b>
        </span>
        <span>{file.added}</span>
        <span>{(file.size / 1024).toFixed(2)} KB</span>
      </div>
    </div>
  );
}
