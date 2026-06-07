import WhoamiHero from "@/components/heroes/whoami";
import Image from "next/image";
import ExperienceChart from "@/components/partials/jobs/expChart";

export default async function Home() {
    return (
        <main>
            <WhoamiHero/>
            <section>
                <header>
                    <h2>I am Paulo Sánchez</h2>
                    <p>Fullstack Engineer with 2 years of experience building web-based systems</p>
                </header>
                <Image src={...} alt={...}/> {/* TODO: me portrait */}
            </section>
            <ExperienceChart/>
        </main>
    );
}
