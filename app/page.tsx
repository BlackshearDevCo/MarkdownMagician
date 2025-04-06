import { EditorLayout } from "@/components/EditorLayout";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Header />

      <div className="w-full h-full flex">
        <Sidebar />

        <main className="flex-1">
          <EditorLayout />
        </main>
      </div>
    </div>
  );
}
