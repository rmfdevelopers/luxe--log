'use client';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-GRID
// Typography Personality: oversized

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Layers, Hammer, Mountain, Armchair, Users, MapPin, 
  Phone, Mail, Instagram, ArrowRight, Loader2, CheckCheck, 
  Menu, X, ImageOff 
} from 'lucide-react';

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1774551351897-c64cd76a7c22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjB3aXRoJTIwZGVzaWduZXIlMjBmdXJuaXR1cmV8ZW58MHwwfHx8MTc3ODQ4NDU5OXww&ixlib=rb-4.1.0&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1775757409538-c5fb3a925aaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjaGFyY29hbCUyMHZlbHZldCUyMHNvZmElMjBidXJudCUyMG9yYW5nZSUyMHBpcGluZyUyMG1vb2R5JTIwbGlnaHRpbmd8ZW58MHwwfHx8MTc3ODQ4NDU5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1670363251492-5aa4fc44e9de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMHNtb2tlZCUyMG9hayUyMGRpbmluZyUyMHRhYmxlJTIwaW5kdXN0cmlhbCUyMHN0ZWVsJTIwbGVncyUyMG1pbmltYWxpc3R8ZW58MHwwfHx8MTc3ODQ4NDYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1700322460147-68f4175770d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBuZXJvJTIwbWFyYmxlJTIwc2lkZWJvYXJkJTIwZGFyayUyMHdvb2QlMjBsdXh1cnklMjBpbnRlcmlvcnxlbnwwfDB8fHwxNzc4NDg0NjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1658108788201-fda6dbed931c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHx0YWxsJTIwbW9kZXJuJTIwYnJvbnplJTIwdG90ZW0lMjBmbG9vciUyMGxhbXAlMjB3YXJtJTIwbW9vZHklMjBsaWdodHxlbnwwfDB8fHwxNzc4NDg0NjAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1497366216548-37526070297c"
  ]
};

// --- HOOKS ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/60 to-[var(--secondary)]/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Divider = () => (
  <div className="py-10 border-y border-white/10">
    <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
      {['Quality', 'Speed', 'Craft', 'Trust', 'Vision'].map((word, i) => (
        <div key={i} className="flex items-center gap-3 text-white/40 text-sm font-mono tracking-widest uppercase">
          <div className="w-1 h-1 rounded-full bg-[var(--secondary)]" />
          {word}
        </div>
      ))}
    </div>
  </div>
);

// --- SECTIONS ---

export default function Page() {
  const brand = {
    name: "Luxe & Log",
    tagline: "Raw & Refined Living",
    description: "Lagos' premier destination for street-luxe furniture, where industrial grit meets high-end comfort.",
    industry: "real estate",
    region: "nigeria"
  };

  const contact = {
    whatsapp: "",
    instagram: "luxeandlog",
    email: "",
    address: "Lekki, Lagos, Nigeria"
  };

  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const typedText = useTypewriter(brand.tagline);

  // Section Reveal Hooks
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="bg-[var(--primary)] text-[var(--accent)]">
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[var(--primary)]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--secondary)] flex items-center justify-center font-heading font-black text-xl text-black">
              L
            </div>
            <span className="font-heading font-black text-2xl tracking-tighter uppercase hidden sm:block">Luxe & Log</span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {['The Collection', 'Our Story', 'Studio', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-bold uppercase tracking-widest hover:text-[var(--secondary)] transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--secondary)] text-black px-6 py-2.5 font-black text-sm uppercase tracking-tighter hover:brightness-110 transition-all">
              Explore Collection
            </a>
          </nav>

          <button onClick={() => setNavOpen(true)} className="md:hidden text-[var(--secondary)]">
            <Menu size={32} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[110] bg-[var(--primary)] transition-transform duration-500 ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <div className="w-10 h-10 bg-[var(--secondary)] flex items-center justify-center font-heading font-black text-xl text-black">L</div>
          <button onClick={() => setNavOpen(false)}><X size={32} /></button>
        </div>
        <div className="flex flex-col p-8 gap-8 mt-12">
          {['The Collection', 'Our Story', 'Studio', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setNavOpen(false)} className="text-4xl font-heading font-black uppercase">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setNavOpen(false)} className="bg-[var(--secondary)] text-black p-4 text-center font-black uppercase text-lg mt-8">
            Explore Collection
          </a>
        </div>
      </div>

      {/* HERO (HR-D) */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[9vw] font-black text-white leading-none tracking-tighter uppercase">
            {typedText}<span className="text-[var(--secondary)] animate-pulse">_</span>
          </h1>
          
          <div ref={heroReveal.ref} className={`mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-8 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-white/35 text-lg max-w-sm leading-relaxed font-medium">
              {brand.description}
            </p>
            <div className="flex flex-col items-start gap-4">
               <a href="#products" className="bg-[var(--secondary)] text-black px-12 py-5 font-black text-xl uppercase tracking-tighter
                shadow-[8px_8px_0px_rgba(255,255,255,0.15)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_rgba(255,255,255,0.15)]
                transition-all duration-200 shrink-0">
                Explore Collection
              </a>
              <span className="text-white/20 font-mono text-xs uppercase tracking-[0.3em]">Lagos, NG — {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* FEATURES (F-STICKY) */}
      <section ref={featuresReveal.ref} className="py-28 bg-[var(--secondary)]/5 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-16 tracking-tighter uppercase">The Luxe & Log Philosophy</h2>
          <div className="space-y-4">
            {[
              { title: "Bespoke Curation", description: "Each piece is tailored to the specific architectural flow of your space.", icon: Layers },
              { title: "Lekki Craftsmanship", description: "Hand-finished in our local Lagos studio by master artisans.", icon: Hammer },
              { title: "Raw Materials", description: "Sustainably sourced timber and industrial-grade steel alloys.", icon: Mountain }
            ].map((f, idx) => (
              <div key={idx} className="sticky group" style={{ top: `${120 + idx * 30}px` }}>
                <div className="bg-[#111] rounded-2xl p-10 border border-white/5 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 flex flex-col md:flex-row items-start gap-8">
                  <div className="w-16 h-16 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--secondary)] transition-colors duration-500">
                    <f.icon className="text-[var(--secondary)] group-hover:text-black transition-colors" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-3xl font-black text-white uppercase">{f.title}</h3>
                      <span className="text-[var(--secondary)] font-mono text-lg font-black">0{idx + 1}</span>
                    </div>
                    <p className="text-white/45 mt-4 text-lg leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS (P-STAGGER) */}
      <section id="thecollection" ref={productsReveal.ref} className="py-28 px-6 bg-[var(--primary)] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 text-center md:text-left">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">Signature<br/><span className="text-[var(--secondary)]">Pieces</span></h2>
            <p className="text-white/40 mt-6 text-xl max-w-xl">Limited run designs for the modern connoisseur.</p>
          </div>

          <div className="space-y-40">
            {[
              { name: "The Shadow Sofa", price: "₦1,450,000", desc: "Deep charcoal velvet with bespoke burnt orange piping details.", img: IMAGES.products[0] },
              { name: "Ember Oak Table", price: "₦2,100,000", desc: "Smoked oak top paired with brutalist industrial steel legs.", img: IMAGES.products[1] },
              { name: "Nero Sideboard", price: "₦1,850,000", desc: "Matte black marble with hand-charred timber accents.", img: IMAGES.products[2] },
              { name: "Bronze Totem", price: "₦450,000", desc: "Architectural floor lamp with a weathered bronze finish.", img: IMAGES.products[3] }
            ].map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-700 ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <div className="w-full md:w-1/2 relative">
                  <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group">
                    <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-2/3 h-2/3 bg-[var(--secondary)]/10 rounded-3xl -z-10 blur-3xl`} />
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-[var(--secondary)] text-sm font-black tracking-widest uppercase mb-4 block">Series 0{i + 1}</span>
                  <h3 className="font-heading text-5xl md:text-6xl font-black text-white leading-none uppercase">{p.name}</h3>
                  <p className="text-white/50 mt-6 text-xl leading-relaxed">{p.desc}</p>
                  <div className={`mt-10 flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                    <span className="text-4xl font-black text-white">{p.price}</span>
                    <a href="#contact" className="bg-white text-black px-10 py-4 font-black uppercase text-sm hover:bg-[var(--secondary)] transition-colors">
                      Commission Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT (A-SPLIT) */}
      <section id="ourstory" ref={aboutReveal.ref} className="min-h-screen grid md:grid-cols-2 bg-[var(--secondary)]/5 overflow-hidden border-y border-white/5">
        <div className={`p-8 md:p-20 flex flex-col justify-center transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-10">Raw &<br/><span className="text-[var(--secondary)]">Refined</span></h2>
          <p className="text-xl text-white/60 leading-relaxed max-w-lg mb-12">
            Founded in Lekki, Luxe & Log was born from a desire to bridge the gap between street-luxe aesthetics and traditional craftsmanship. We don't just build furniture; we create sculptural statements that define the contemporary Nigerian home.
          </p>
          <div className="grid grid-cols-2 gap-10">
            {[
              { number: "400+", label: "Signature Pieces" },
              { number: "12", label: "Master Craftsmen" },
              { number: "100%", label: "Lagos Owned" },
              { number: "24/7", label: "Client Support" }
            ].map((s, i) => (
              <div key={i} className="transition-all duration-1000" style={{ transitionDelay: `${i * 150}ms` }}>
                <p className="font-heading text-4xl md:text-5xl font-black text-white tracking-tighter">{s.number}</p>
                <p className="text-[var(--secondary)] text-xs uppercase tracking-widest font-black mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`relative min-h-[50vh] transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <SafeImage src={IMAGES.hero} alt="Studio Life" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-transparent to-transparent md:block hidden" />
        </div>
      </section>

      {/* GALLERY (G-MASONRY) */}
      <section id="studio" ref={galleryReveal.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="font-heading text-6xl font-black text-white tracking-tighter uppercase leading-none">Inside the<br/>Studio</h2>
            <p className="text-white/40 max-w-sm font-medium uppercase tracking-widest text-sm">Sharp delivery, nationwide. Crafted in the heart of Lekki.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((src, i) => (
              <div key={i} className={`break-inside-avoid group relative rounded-2xl overflow-hidden transition-all duration-700 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Studio View ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (T-SPOTLIGHT) */}
      <section ref={testimonialsReveal.ref} className="py-28 px-6 bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-black text-center mb-20 tracking-tighter uppercase leading-[0.85]">Vibe Check</h2>
          <div className="space-y-12">
            {[
              { name: "Temi Adeyemi", role: "Architect", text: "The Shadow Sofa transformed my penthouse. The contrast of the orange piping against the dark velvet is pure art." },
              { name: "Chidi Okafor", role: "Interior Designer", text: "Brutal honesty in design. The Ember Oak table is heavy, masculine, and absolutely stunning." },
              { name: "Zainab Bello", role: "Creative Director", text: "The only brand in Lagos that understands the street-luxe aesthetic without compromising on quality." }
            ].map((t, i) => (
              <div key={i} className={`relative py-12 px-10 rounded-3xl border border-black/10 bg-white/5 transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <span className="text-[var(--secondary)] text-3xl font-black leading-none mt-2">&ldquo;</span>
                </div>
                <p className="text-black text-2xl md:text-3xl font-bold leading-tight italic text-center">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-[var(--secondary)] font-black text-lg border border-black/20">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-black text-black uppercase tracking-tighter">{t.name}</p>
                    <p className="text-black/60 text-xs font-mono uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (C3) */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-[var(--primary)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--secondary)] font-mono text-xs tracking-[0.5em] uppercase mb-4 font-black">Commissioning</p>
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-none transition-all duration-700">Start Your<br/>Commission</h2>
          <p className="text-white/40 mb-16 text-xl max-w-lg mx-auto">{brand.description}</p>
          
          <div className="text-left">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-12 h-12 bg-[var(--secondary)] flex items-center justify-center font-heading font-black text-2xl text-black">L</div>
                <span className="font-heading font-black text-3xl tracking-tighter uppercase">Luxe & Log</span>
              </div>
              <p className="text-white/40 max-w-sm text-lg mb-8 leading-relaxed">
                Redefining the urban Nigerian living space through raw materials and refined industrial aesthetics.
              </p>
              <div className="flex gap-6">
                <a href={`https://instagram.com/${contact.instagram}`} className="text-white/40 hover:text-[var(--secondary)] transition-colors"><Instagram size={24} /></a>
                <a href="#" className="text-white/40 hover:text-[var(--secondary)] transition-colors"><Phone size={24} /></a>
                <a href="#" className="text-white/40 hover:text-[var(--secondary)] transition-colors"><Mail size={24} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-black text-white uppercase tracking-widest text-sm mb-8">Navigate</h4>
              <ul className="space-y-4">
                {['The Collection', 'Our Story', 'Studio', 'Contact'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-white/40 hover:text-[var(--secondary)] transition-colors font-medium">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-black text-white uppercase tracking-widest text-sm mb-8">Lagos HQ</h4>
              <address className="not-italic text-white/40 space-y-4 font-medium">
                <p>{contact.address}</p>
                <p>Monday — Saturday<br/>09:00 — 18:00</p>
              </address>
              <p className="mt-8 text-[var(--secondary)] font-black uppercase text-xs tracking-widest">Sharp delivery, nationwide.</p>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest">&copy; {new Date().getFullYear()} Luxe & Log Interior Design Ltd.</p>
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest">Crafted in Lagos by The Architect</p>
          </div>
        </div>
      </footer>

    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-[#0d0d0d] rounded-3xl border border-[var(--secondary)]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-[var(--secondary)]/20 flex items-center justify-center mb-8 border border-[var(--secondary)]/40 relative z-10">
          <CheckCheck size={40} className="text-[var(--secondary)]" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10 uppercase">Message Logged</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10">Our studio lead will review your commission request and respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#0d0d0d] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--secondary)]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(['name', 'email'] as const).map(field => (
            <div key={field} className="relative group">
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.toUpperCase()}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 text-sm font-bold tracking-widest outline-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] group-hover:border-white/20"
              />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <input
            type="text"
            placeholder="PHONE (OPTIONAL)"
            value={form.phone}
            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 text-sm font-bold tracking-widest outline-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--secondary)] group-hover:border-white/20"
          />
        </div>
        <div className="mt-6">
          <textarea
            rows={5}
            placeholder="TELL US ABOUT YOUR SPACE"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 text-sm font-bold tracking-widest outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--secondary)] group-hover:border-white/20"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-[var(--secondary)] text-black py-5 rounded-xl font-black text-lg uppercase tracking-tighter hover:brightness-110 hover:shadow-[0_0_30px_rgba(204,85,0,0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-4 group">
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              Submit Inquiry <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}