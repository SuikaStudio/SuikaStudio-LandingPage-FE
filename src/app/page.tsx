import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Statement } from '@/components/sections/Statement';
import { Products } from '@/components/sections/Products';
import { Features } from '@/components/sections/Features';
import { Faq } from '@/components/sections/Faq';
import { CommunityCta } from '@/components/sections/CommunityCta';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { AmbientBackgroundGlow } from '@/components/ui/AmbientBackgroundGlow';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-rose-500 selection:text-white">
      {/* Fixed Ambient Dot Grid Layer with 0% to 100% opacity mask */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-ambient" aria-hidden="true" />
      <AmbientBackgroundGlow />
      <CustomCursor />
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 w-full">
          <Hero />
          <Statement />
          <Products />
          <Features />
          <Faq />
          <CommunityCta />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
