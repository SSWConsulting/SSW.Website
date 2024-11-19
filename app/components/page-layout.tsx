type PageLayoutProps = {
  children: React.ReactNode;
  megaMenu: React.ReactNode;
  footer: React.ReactNode;
};
const PageLayout = ({ children, megaMenu, footer }: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="no-print">{megaMenu}</header>
      <main className="grow bg-white">{children}</main>
      {footer}
    </div>
  );
};

export default PageLayout;
