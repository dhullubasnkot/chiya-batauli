import Navbar from "./components/navbar";
import FirstPage from "./pages/home";
import BestChiyaPage from "./pages/Bestchiya";
import ChiyaReviewsPage from "./pages/customerreview";
import BestNastaPage from "./pages/BestNasta";
import Footer from "./components/footer";
import GuffGaffMain from "./pages/GuffGaff";

export default function Home() {
  return (
    <>
      <Navbar />
      <FirstPage />
      <BestChiyaPage />
      <ChiyaReviewsPage />
      <BestNastaPage />
      <GuffGaffMain />
      <Footer />
    </>
  );
}
