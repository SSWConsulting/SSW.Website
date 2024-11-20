import { Footer } from "@/components/layout/footer/footer";

type PageLayoutProps = {
  children: React.ReactNode;
  megaMenu: React.ReactNode;
};
const PageLayout = ({ children, megaMenu }: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="no-print">{megaMenu}</header>
      <main className="grow bg-white">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
