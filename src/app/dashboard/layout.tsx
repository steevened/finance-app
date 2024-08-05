import Aside from "./components/aside";
import Header from "./components/header";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sticky top-0 z-40 lg:hidden bg-background">
        <Header />
      </div>

      <div className="grid grid-cols-12 min-h-screen">
        <div className="sticky top-0 hidden lg:block lg:col-span-3 xl:col-span-2 h-screen">
          <Aside />
        </div>
        <main className="p-6 lg:col-span-9 xl:col-span-10 col-span-12 bg-muted/20 m-3 lg:ml-0 border rounded-lg">
          {children}
        </main>
      </div>
    </div>
  );
}
