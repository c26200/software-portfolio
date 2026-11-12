import { Suspense, type ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import PageMeta from './components/PageMeta';
import LanguageSync from './components/LanguageSync';

export interface PageComponents {
  Home: ComponentType;
  Sobre: ComponentType;
  Blog: ComponentType;
  BlogPost: ComponentType;
  CaseStudy: ComponentType;
  NotFound: ComponentType;
}

export default function App({ pages }: { pages: PageComponents }) {
  const { Home, Sobre, Blog, BlogPost, CaseStudy, NotFound } = pages;

  return (
    <>
      <LanguageSync />
      <PageMeta />
      <CustomCursor />
      <Header />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/en" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/en/sobre" element={<Sobre />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/en/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/en/blog/:slug" element={<BlogPost />} />
            <Route path="/proyectos/:slug" element={<CaseStudy />} />
            <Route path="/en/proyectos/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
