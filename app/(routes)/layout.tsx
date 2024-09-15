import { Navbar } from "@/components/header/navbar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children
}: Props) => {
  return (
    <>
      <Navbar />
      <main className="relative h-[100vh] pt-[128px]">
        {children}
      </main>
    </>
  )
}

export default DashboardLayout;