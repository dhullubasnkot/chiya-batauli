import Footer from "@/app/components/footer";
import GuffGaff from "../GuffGaff";

export default function GuffGaffPage() {
  return (
    <>
      <GuffGaff noSlice={false} noNavbar={false} />
      <Footer />
    </>
  );
}
