import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Pipeline from '../components/Pipeline';
import Projects from '../components/Projects';
import LatestPosts from '../components/LatestPosts';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Pipeline />
      <Projects />
      <LatestPosts />
      <Contact />
    </>
  );
}
