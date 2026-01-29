import Header from './components/Header';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Portafolio from './components/Portafolio';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Proceso from './components/Proceso';
import Testimonios from './components/Testimonios';
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Servicios />
      <Portafolio />
      <Proceso />
      <Testimonios />
      <Contacto />
      <Footer />
    </main>
  );
}