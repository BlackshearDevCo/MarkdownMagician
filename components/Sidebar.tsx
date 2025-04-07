"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  FileText,
  Folder,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

type FileItem = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  expanded?: boolean;
};

const SAMPLE_DIRECTORIES: FileItem[] = [
  {
    id: "1",
    name: "My Documents",
    type: "folder",
    expanded: true,
    children: [
      { id: "2", name: "Getting Started.md", type: "file" },
      { id: "3", name: "Project Ideas.md", type: "file" },
      {
        id: "4",
        name: "Tutorials",
        type: "folder",
        children: [
          { id: "5", name: "Markdown Basics.md", type: "file" },
          { id: "6", name: "Advanced Formatting.md", type: "file" },
        ],
      },
    ],
  },
  {
    id: "7",
    name: "Templates",
    type: "folder",
    children: [
      { id: "8", name: "Blog Post.md", type: "file" },
      { id: "9", name: "Meeting Notes.md", type: "file" },
    ],
  },
];

export function Sidebar() {
  const [files, setFiles] = useState<FileItem[]>(SAMPLE_DIRECTORIES);
  const [selectedFile, setSelectedFile] = useState<string | null>("2");

  const toggleFolder = (id: string) => {
    setFiles((prevFiles) => {
      const updateExpanded = (items: FileItem[]): FileItem[] => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, expanded: !item.expanded };
          }
          if (item.children) {
            return { ...item, children: updateExpanded(item.children) };
          }
          return item;
        });
      };
      return updateExpanded(prevFiles);
    });
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} style={{ marginLeft: `${level * 12}px` }}>
        <div
          className={`flex items-center py-1 px-2 rounded-md my-1 ${
            selectedFile === item.id
              ? "bg-primary text-primary-foreground border-transparent hover:bg-sidebar-ring"
              : "hover:bg-muted"
          }`}
          onClick={() =>
            item.type === "folder"
              ? toggleFolder(item.id)
              : setSelectedFile(item.id)
          }
        >
          {item.type === "folder" ? (
            item.expanded ? (
              <FolderOpen className="h-4 w-4 mr-2 text-primary" />
            ) : (
              <Folder className="h-4 w-4 mr-2 text-primary" />
            )
          ) : (
            <FileText className="h-4 w-4 mr-2" />
          )}
          <span className="text-sm truncate flex-1">{item.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
              {item.type === "folder" && (
                <DropdownMenuItem>New File</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {item.type === "folder" && item.expanded && item.children && (
          <div>{renderFileTree(item.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <aside className="w-64 border-r border-border bg-muted/30 p-4 overflow-y-auto hidden md:block space-y-4">
      <section className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-1">Files</h3>

        <Button variant="ghost" size="icon">
          <Plus />
        </Button>
      </section>

      <div className="relative flex items-center">
        <Search className="absolute left-2 opacity-30 h-4 w-4" />
        <Input className="pl-8" placeholder="Search files" />
      </div>

      <ul className="flex flex-col gap-2">{renderFileTree(files)}</ul>
    </aside>
  );
}

// type SidebarFileProps = {
//   active?: boolean;
// };

// function SidebarFile({ active }: SidebarFileProps) {
//   return (
//     <li>
//       <Link
//         href="#"
//         className={cn(
//           "border border-border rounded-md flex gap-3 items-center px-4 py-2 hover:bg-border transition-colors",
//           {
//             "bg-primary text-primary-foreground border-transparent hover:bg-sidebar-ring":
//               active,
//           }
//         )}
//       >
//         <File className="h-4 w-4" />
//         <p>My File</p>
//       </Link>
//     </li>
//   );
// }
