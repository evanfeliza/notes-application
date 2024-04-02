import LandingPageSection from "@/components/pages/landing-page-section";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default async function Index() {

    return (
        <div className="relative min-h-screen h-screen max-h-screen">
            <Navbar />
            <div className="mx-auto h-full">
                <LandingPageSection />
            </div>
            <Footer />
        </div >
    );
}
