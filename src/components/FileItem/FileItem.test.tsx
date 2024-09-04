import { render, screen } from "@testing-library/react";
import FileItem from "./FileItem";
import { File } from "../../data/documents";

const mockFile: File = {
  type: "pdf",
  name: "Sample Document",
  added: "2023-08-25",
  size: 2048,
};

describe("FileItem Component", () => {
  it("renders the FileItem component", () => {
    render(<FileItem file={mockFile} />);
    const fileNameElement = screen.getByText(/Sample Document/i);
    expect(fileNameElement).toBeInTheDocument();
  });

  it("displays the correct file name", () => {
    render(<FileItem file={mockFile} />);
    const fileNameElement = screen.getByText(/Sample Document/i);
    expect(fileNameElement).toBeInTheDocument();
    expect(fileNameElement).toHaveTextContent("Sample Document");
  });

  it("displays the correct file added date", () => {
    render(<FileItem file={mockFile} />);
    const fileAddedElement = screen.getByText(/2023-08-25/i);
    expect(fileAddedElement).toBeInTheDocument();
    expect(fileAddedElement).toHaveTextContent("2023-08-25");
  });

  it("displays the correct file size in KB", () => {
    render(<FileItem file={mockFile} />);
    const fileSizeElement = screen.getByText(/2.00 KB/i);
    expect(fileSizeElement).toBeInTheDocument();
    expect(fileSizeElement).toHaveTextContent("2.00 KB");
  });

  it("renders the correct image icon based on file type", () => {
    render(<FileItem file={mockFile} />);
    const imageElement = screen.getByAltText(/pdf/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/file-icons/pdf.png");
  });

  it("renders the correct alt text based on the file type", () => {
    render(<FileItem file={mockFile} />);
    const imageElement = screen.getByAltText(/pdf/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("alt", "pdf");
  });

  it("formats the file size correctly for smaller files", () => {
    const smallFile: File = {
      type: "doc",
      name: "Small Document",
      added: "2023-08-20",
      size: 512, // 0.5 KB
    };
    render(<FileItem file={smallFile} />);
    const fileSizeElement = screen.getByText(/0.50 KB/i);
    expect(fileSizeElement).toBeInTheDocument();
    expect(fileSizeElement).toHaveTextContent("0.50 KB");
  });

  it("formats the file size correctly for larger files", () => {
    const largeFile: File = {
      type: "mov",
      name: "Large Video",
      added: "2023-07-15",
      size: 5242880, // 5 MB
    };
    render(<FileItem file={largeFile} />);
    const fileSizeElement = screen.getByText(/5120.00 KB/i);
    expect(fileSizeElement).toBeInTheDocument();
    expect(fileSizeElement).toHaveTextContent("5120.00 KB");
  });

  it("renders correctly for different file types (doc)", () => {
    const docFile: File = {
      type: "doc",
      name: "Word Document",
      added: "2023-07-01",
      size: 1024,
    };
    render(<FileItem file={docFile} />);
    const imageElement = screen.getByAltText(/doc/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/file-icons/doc.png");
  });

  it("renders correctly for different file types (csv)", () => {
    const csvFile: File = {
      type: "csv",
      name: "Spreadsheet",
      added: "2023-06-10",
      size: 3072,
    };
    render(<FileItem file={csvFile} />);
    const imageElement = screen.getByAltText(/csv/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/file-icons/csv.png");
  });
});
