export interface File {
  type: string;
  name: string;
  added: string;
  size: number;
}

export interface Folder extends File {
  files: (File | Folder)[];
}

const documents: (File | Folder)[] = [
  {
    type: "pdf",
    name: "Company Overview",
    added: "2023-08-15",
    size: 10240,
  },
  {
    type: "doc",
    name: "HR Policies",
    added: "2023-06-20",
    size: 20480,
  },
  {
    type: "folder",
    name: "Projects",
    added: "2023-07-10",
    size: 97280,
    files: [
      {
        type: "pdf",
        name: "Project Alpha Report",
        added: "2023-07-11",
        size: 51200,
      },
      {
        type: "doc",
        name: "Project Alpha Documentation",
        added: "2023-07-12",
        size: 30720,
      },
      {
        type: "folder",
        name: "Project Beta",
        added: "2023-07-13",
        size: 15360,
        files: [
          {
            type: "pdf",
            name: "Project Beta Proposal",
            added: "2023-07-14",
            size: 10240,
          },
          {
            type: "doc",
            name: "Project Beta Specifications",
            added: "2023-07-15",
            size: 5120,
          },
        ],
      },
    ],
  },
  {
    type: "csv",
    name: "Employee List",
    added: "2023-01-10",
    size: 5120,
  },
  {
    type: "folder",
    name: "Miscellaneous",
    added: "2023-03-05",
    size: 61440,
    files: [
      {
        type: "doc",
        name: "Office Layout",
        added: "2023-03-06",
        size: 10240,
      },
      {
        type: "mov",
        name: "Company Event Video",
        added: "2023-02-20",
        size: 51200,
      },
    ],
  },
];

export default documents;
