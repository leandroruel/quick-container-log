interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <nav></nav>
      <main className="w-11/12 m-auto text-slate-900 dark:text-slate-300">
        {children}
      </main>
    </>
  );
};

export default Layout;
