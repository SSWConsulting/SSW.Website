import { Footer } from "@/components/layout/footer/footer";

type PageLayoutProps = {
  children: React.ReactNode;
  phishingBanner?: React.ReactNode;
  megaMenu: React.ReactNode;
};
const PageLayout = ({
  children,
  phishingBanner,
  megaMenu,
}: PageLayoutProps) => {
  return (
    <div className="flex h-screen min-h-screen flex-col">
      <header className="no-print z-1">
        {phishingBanner}
        {megaMenu}
      </header>
      <main className="z-0 grow bg-white">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
