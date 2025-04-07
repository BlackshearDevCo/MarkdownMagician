import { EditorLayout } from "@/components/EditorLayout";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <Sidebar />

      <div className="w-full h-full flex flex-col flex-1">
        <Header />

        <main className="flex-1">
          <EditorLayout />
        </main>
      </div>
    </div>
  );
}
