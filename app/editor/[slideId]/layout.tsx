import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full">
      <SidebarProvider open={false}>
        <Sidebar collapsible="offcanvas" />
        {children}
      </SidebarProvider>
    </main>
  );
}
