import { render, screen, fireEvent } from "@testing-library/react";
import FolderItem from "./FolderItem";
import { Folder } from "../../data/documents";

const mockFolder: Folder = {
  type: "folder",
  name: "Sample Folder",
  added: "2023-08-01",
  size: 4096,
  files: [
    {
      type: "pdf",
      name: "Document 1",
      added: "2023-07-01",
      size: 1024,
    },
    {
      type: "doc",
      name: "Document 2",
      added: "2023-07-02",
      size: 2048,
    },
  ],
};

describe("FolderItem Component", () => {
  it("renders the FolderItem", () => {
    render(<FolderItem folder={mockFolder} />);
    const folderNameElement = screen.getByText(/Sample Folder/i);
    expect(folderNameElement).toBeInTheDocument();
  });

  it("displays the correct folder name, added date, and size", () => {
    render(<FolderItem folder={mockFolder} />);
    expect(screen.getByText("Sample Folder")).toBeInTheDocument();
    expect(screen.getByText("2023-08-01")).toBeInTheDocument();
    expect(screen.getByText("4.00 KB")).toBeInTheDocument();
  });

  it("renders folder icon with correct alt text", () => {
    render(<FolderItem folder={mockFolder} />);
    const folderIcon = screen.getByAltText(/folder/i);
    expect(folderIcon).toBeInTheDocument();
    expect(folderIcon).toHaveAttribute("src", "/folder-icon.png");
  });

  it("does not render files when the folder is closed", () => {
    render(<FolderItem folder={mockFolder} />);
    expect(screen.queryByText(/Document 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Document 2/i)).not.toBeInTheDocument();
  });

  it("renders files when the folder is opened", () => {
    render(<FolderItem folder={mockFolder} />);
    const folderHeader = screen.getByText(/Sample Folder/i);
    fireEvent.click(folderHeader);

    expect(screen.getByText(/Document 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Document 2/i)).toBeInTheDocument();
  });

  it("toggles folder contents on click", () => {
    render(<FolderItem folder={mockFolder} />);
    const folderHeader = screen.getByText(/Sample Folder/i);

    fireEvent.click(folderHeader);
    expect(screen.getByText(/Document 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Document 2/i)).toBeInTheDocument();

    fireEvent.click(folderHeader);
    expect(screen.queryByText(/Document 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Document 2/i)).not.toBeInTheDocument();
  });

  it("correctly renders nested folders", () => {
    const nestedFolder: Folder = {
      type: "folder",
      name: "Main Folder",
      added: "2023-09-01",
      size: 8192,
      files: [
        mockFolder, // Nested folder
        {
          type: "doc",
          name: "Document 3",
          added: "2023-09-02",
          size: 1024,
        },
      ],
    };

    render(<FolderItem folder={nestedFolder} />);
    const mainFolderHeader = screen.getByText(/Main Folder/i);
    fireEvent.click(mainFolderHeader); // Open main folder

    expect(screen.getByText(/Sample Folder/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Sample Folder/i)); // Open nested folder

    expect(screen.getByText(/Document 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Document 2/i)).toBeInTheDocument();
  });

  it("displays the correct file sizes within a folder", () => {
    render(<FolderItem folder={mockFolder} />);
    const folderHeader = screen.getByText(/Sample Folder/i);
    fireEvent.click(folderHeader);

    expect(screen.getByText(/1.00 KB/i)).toBeInTheDocument();
    expect(screen.getByText(/2.00 KB/i)).toBeInTheDocument();
  });
});
