import React from "react";
import { Input } from "@/components/ui/Input";
import { File, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="border-r border-border w-60">
      <div className="border-b border-border p-2 pb-4 mb-4">
        <h3 className="text-xl font-medium mb-1">Files</h3>

        <div className="relative flex items-center">
          <Search className="absolute left-2 opacity-30 h-4 w-4" />
          <Input className="pl-8" placeholder="Search files" />
        </div>
      </div>

      <div className="p-2">
        <ul className="flex flex-col gap-2">
          <SidebarFile active />
          <SidebarFile />
          <SidebarFile />
          <SidebarFile />
        </ul>
      </div>
    </aside>
  );
}

type SidebarFileProps = {
  active?: boolean;
};

function SidebarFile({ active }: SidebarFileProps) {
  return (
    <li>
      <Link
        href="#"
        className={cn(
          "border border-border rounded-md flex gap-3 items-center px-4 py-2 hover:bg-border transition-colors",
          {
            "bg-primary border-transparent hover:bg-sidebar-ring": active,
          }
        )}
      >
        <File className="h-4 w-4" />
        <p>My File</p>
      </Link>
    </li>
  );
}
