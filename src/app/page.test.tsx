import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";

jest.mock("../data/documents", () => [
  {
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
  },
  {
    type: "doc",
    name: "HR Policy",
    added: "2022-06-15",
    size: 5120,
  },
  {
    type: "pdf",
    name: "Employee Handbook",
    added: "2021-12-01",
    size: 8192,
  },
]);

describe("Page Component", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(screen.getByText(/Document Manager/i)).toBeInTheDocument();
  });

  it("displays the correct number of documents initially", () => {
    render(<Page />);
    const folderItem = screen.getByText("Sample Folder");
    expect(folderItem).toBeInTheDocument();

    const fileItem1 = screen.getByText("HR Policy");
    const fileItem2 = screen.getByText("Employee Handbook");
    expect(fileItem1).toBeInTheDocument();
    expect(fileItem2).toBeInTheDocument();
  });

  it("filters the documents based on the input value", async () => {
    render(<Page />);
    const input = screen.getByPlaceholderText("Filter by name");

    fireEvent.change(input, { target: { value: "Employee" } });

    expect(screen.getByText("Employee Handbook")).toBeInTheDocument();
    expect(screen.queryByText("HR Policy")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Folder")).not.toBeInTheDocument();
  });

  it("renders the correct components based on document type", () => {
    render(<Page />);
    const folderItem = screen.getByText("Sample Folder");
    const fileItem = screen.getByText("HR Policy");

    expect(folderItem).toBeInTheDocument();
    expect(fileItem).toBeInTheDocument();
  });
});
