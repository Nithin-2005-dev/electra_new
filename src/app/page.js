import Hero from "../components/Hero";
import "./globals.css";
import About from "../components/About";
import ElectraPillars from "../components/Pillars";
import ElectraEnergyTimeline from "../components/Events";
import SponsorsSection from "../components/Sponsors";
import AlumniSection from "../components/Alumni";
export default function Page() {
  return (
    <main>
      <Hero/>
      <About/>
      <ElectraPillars/>
      <ElectraEnergyTimeline/>
      <SponsorsSection/>
      <AlumniSection/>
    </main>
  );
}
