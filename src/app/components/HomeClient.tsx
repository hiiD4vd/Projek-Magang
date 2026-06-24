"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const formatIDR = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

export default function HomeClient({ wines }: { wines: any[] }) {
  const container = useRef<HTMLDivElement>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const totalSlides = wines.length * 2; // wines duplicated

  useGSAP(
    () => {
      // 1. Setup Smooth Scroll with Lenis
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0, 0);

      // 2. Main Hero Animation Timeline
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      heroTl.to(
        ".frame-wrapper",
        {
          width: "100vw",
          top: "0%",
          bottom: "0%",
          ease: "none",
        },
        0
      );

      heroTl.to(
        [".frame-gold-border", ".frame-gap", ".frame-image"],
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)",
          ease: "none",
        },
        0
      );

      heroTl.to(
        [".frame-gap", ".frame-image"],
        {
          inset: "0px",
          ease: "none",
        },
        0
      );

      heroTl.to(
        [".bg-wine-text", ".floating-text", "header", ".logo-main", "nav ul li a"],
        {
          color: "#ffffff",
          ease: "none",
        },
        0
      );

      // Trigger for Section Two (Light Background)
      ScrollTrigger.create({
        trigger: ".section-two",
        start: "top 15%",
        onEnter: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#1a1a1a", duration: 0.3 }),
        onLeaveBack: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#ffffff", duration: 0.3 }),
      });

      // Trigger for Section Collection (Dark Background)
      ScrollTrigger.create({
        trigger: ".section-collection",
        start: "top 15%",
        onEnter: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#ffffff", duration: 0.3 }),
        onLeaveBack: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#1a1a1a", duration: 0.3 }),
      });

      // Trigger for Section Finest (Light Background)
      ScrollTrigger.create({
        trigger: ".section-finest",
        start: "top 15%",
        onEnter: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#1a1a1a", duration: 0.3 }),
        onLeaveBack: () => gsap.to(["header", ".logo-main", "nav ul li a"], { color: "#ffffff", duration: 0.3 }),
      });

      heroTl.to(".bg-wine-text", { scale: 1.05, ease: "none" }, 0);
      heroTl.to(".circle-btn", { opacity: 0, y: 30, ease: "none" }, 0);
      heroTl.to(".bottle-img", { scale: 1.08, ease: "none" }, 0);

      // 3. Custom Cursor Logic
      if (cursorRef.current && swiperContainerRef.current) {
        const xTo = gsap.quickTo(cursorRef.current, "left", {
          duration: 0.3,
          ease: "power3",
        });
        const yTo = gsap.quickTo(cursorRef.current, "top", {
          duration: 0.3,
          ease: "power3",
        });

        const onMouseMove = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        const onMouseEnter = () => {
          if (cursorRef.current) {
            cursorRef.current.style.opacity = "1";
            cursorRef.current.style.transform = "translate(-50%, -50%) scale(1)";
          }
        };
        const onMouseLeave = () => {
          if (cursorRef.current) {
            cursorRef.current.style.opacity = "0";
            cursorRef.current.style.transform = "translate(-50%, -50%) scale(0.5)";
          }
        };

        const sc = swiperContainerRef.current;
        sc.addEventListener("mousemove", onMouseMove);
        sc.addEventListener("mouseenter", onMouseEnter);
        sc.addEventListener("mouseleave", onMouseLeave);

        return () => {
          sc.removeEventListener("mousemove", onMouseMove);
          sc.removeEventListener("mouseenter", onMouseEnter);
          sc.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    },
    { scope: container }
  );

  // We loop items to simulate looping
  const duplicatedWines = [...wines, ...wines];

  return (
    <div ref={container} className="relative w-full overflow-x-hidden">
      <header className="!fixed !inset-0 !bottom-auto !flex !flex-row !justify-between !items-center !px-6 md:!px-16 !py-6 md:!py-9 !z-[100] w-full">
        <div className="logo flex flex-col items-start gap-1">
          <span className="logo-main font-serif-swash text-[2.2rem] font-thin leading-none tracking-normal">Infinity Vines</span>
          <span className="logo-sub font-sans text-[0.6rem] tracking-[3.5px] text-gray-500 uppercase mt-[7px]">Vineyards</span>
        </div>
        
        <div className="flex md:hidden flex-col items-center gap-[5px] cursor-pointer z-[200] w-[34px]" onClick={() => setIsNavOpen(!isNavOpen)}>
          <span className={`bg-current h-[3px] rounded-full transition-all duration-300 ${isNavOpen ? 'opacity-0' : ''}`} style={{ width: isNavOpen ? '10px' : '12px' }}></span>
          <span className={`bg-current h-[3px] rounded-full transition-all duration-300 ${isNavOpen ? 'translate-y-[8px] rotate-45' : ''}`} style={{ width: isNavOpen ? '32px' : '12px' }}></span>
          <span className={`bg-current h-[3px] rounded-full transition-all duration-300 ${isNavOpen ? '-translate-y-[8px] -rotate-45' : ''}`} style={{ width: isNavOpen ? '32px' : '32px' }}></span>
          <span className={`bg-current h-[3px] rounded-full transition-all duration-300 ${isNavOpen ? 'opacity-0' : ''}`} style={{ width: isNavOpen ? '32px' : '32px' }}></span>
        </div>
        
        <nav className={`!absolute md:!static !top-[85px] !right-6 md:!right-0 !w-auto !h-auto !bg-[#f5f4ef]/95 md:!bg-transparent !backdrop-blur-md md:!backdrop-blur-none !z-[150] transition-all duration-300 !px-8 !py-6 md:!p-0 !rounded-3xl md:!rounded-none !shadow-2xl md:!shadow-none ${isNavOpen ? '!opacity-100 !scale-100 !pointer-events-auto' : '!opacity-0 !scale-95 !pointer-events-none md:!opacity-100 md:!scale-100 md:!pointer-events-auto'}`}>
          <ul className="!flex !flex-col md:!flex-row !items-end md:!items-center !gap-6 md:!gap-[2.8rem] list-none">
            <li><a href="#home" className="!text-[#1a1a1a] md:text-current !text-xl md:!text-[0.82rem] font-serif-formal md:font-sans font-medium tracking-wide md:tracking-[0.3px] hover:!text-[#d4a940] transition-colors" onClick={() => setIsNavOpen(false)}>Home</a></li>
            <li><a href="#about" className="!text-[#1a1a1a] md:text-current !text-xl md:!text-[0.82rem] font-serif-formal md:font-sans font-medium tracking-wide md:tracking-[0.3px] hover:!text-[#d4a940] transition-colors" onClick={() => setIsNavOpen(false)}>About us</a></li>
            <li><a href="#wineries" className="!text-[#1a1a1a] md:text-current !text-xl md:!text-[0.82rem] font-serif-formal md:font-sans font-medium tracking-wide md:tracking-[0.3px] hover:!text-[#d4a940] transition-colors" onClick={() => setIsNavOpen(false)}>Wineries</a></li>
            <li><a href="#products" className="!text-[#1a1a1a] md:text-current !text-xl md:!text-[0.82rem] font-serif-formal md:font-sans font-medium tracking-wide md:tracking-[0.3px] hover:!text-[#d4a940] transition-colors" onClick={() => setIsNavOpen(false)}>Products</a></li>
            <li><a href="#blog" className="!text-[#1a1a1a] md:text-current !text-xl md:!text-[0.82rem] font-serif-formal md:font-sans font-medium tracking-wide md:tracking-[0.3px] hover:!text-[#d4a940] transition-colors" onClick={() => setIsNavOpen(false)}>Blog</a></li>
            <li><a href="#contact" className="!text-[#1a1a1a] md:text-current !text-xl md:!text-[0.82rem] font-serif-formal md:font-sans font-medium tracking-wide md:tracking-[0.3px] hover:!text-[#d4a940] transition-colors" onClick={() => setIsNavOpen(false)}>Contact us</a></li>
          </ul>
        </nav>
      </header>

      <main className="hero" id="home">
        <div className="bg-wine-text !text-[22vw] md:!text-[23vw]" aria-hidden="true">WINE</div>
        <div className="floating-text text-memorable !top-[25%] !left-[5%] md:!top-[20%] md:!left-[8%] !text-[8vw] md:!text-[4vw]">TIMELESS</div>
        <div className="floating-text text-journeys !bottom-[25%] !right-[5%] md:!bottom-[18%] md:!right-[8%] !text-[8vw] md:!text-[4vw]">VINTAGES</div>

        <div className="frame-wrapper">
          <div className="frame-gold-border"></div>
          <div className="frame-gap"></div>
          <div className="frame-image"></div>
        </div>

        <div className="bottle-wrapper">
          <img src="/wine (1).png" alt="Wine Bottle" className="bottle-img" />
        </div>

        <div className="circle-btn" role="button" tabIndex={0}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
          <span className="btn-label">CHECK<br />TOURS</span>
        </div>
      </main>

      <section className="section-two" id="about">
        <h2 className="about-heading">UNVEILING THE<br />ESSENCE OF<br />WINE</h2>
        <div className="about-grid">
          <div className="about-text">
            Forged in the intense industrial heat of Cikarang, we utilize 'Limitless' fermentation techniques to create an expanding domain of flavor. Every sip is an engaging and powerful experience.
          </div>
          <div className="about-text">
            Our approach is a perfect blend of resilient Cikarang heritage and modern Jujutsu mastery. Together, they create an atmosphere where tasting our wine becomes an absolute domain expansion.
          </div>
        </div>
        <hr className="about-divider" />
        <div className="offering-grid">
          <div className="offering-subtitle">WE OFFERING</div>
          <div className="offering-title">UNIQUE<br />BLEND OF<br />EDUCATION.</div>
        </div>
      </section>

      <section className="section-collection" id="wineries">
        <div className="bg-exclusive" aria-hidden="true">exclusive</div>
        
        <div className="collection-header">
          <h2 className="collection-heading">Our Wine Collection</h2>
          <button className="view-all-btn">View All Wines</button>
        </div>

        <div className="custom-cursor" ref={cursorRef}>Drag</div>

        <div className="collection-swiper" ref={swiperContainerRef}>
          <Swiper
            centeredSlides={true}
            loop={true}
            spaceBetween={0}
            speed={1200}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              768: { slidesPerView: 3 }
            }}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.realIndex + 1);
            }}
            className="w-full"
          >
            {duplicatedWines.map((wine, idx) => (
              <SwiperSlide key={idx}>
                <img src={wine.imagePath} alt={wine.name} className="slide-bottle" />
                <div className="slide-details">
                  <h3 className="slide-title">{wine.name}</h3>
                  <p className="slide-desc whitespace-pre-line">{wine.description}</p>
                  <div className="slide-price">{formatIDR(wine.currentPrice)}</div>
                  <button className="slide-add-btn">Add to Cart</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="collection-footer">
          <div className="pagination-wrapper">
            <span className="current-slide">{currentSlide.toString().padStart(2, '0')}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentSlide / (totalSlides / 2)) * 100}%` }}
              ></div>
            </div>
            <span className="total-slides">{(totalSlides / 2).toString().padStart(2, '0')}</span>
          </div>
          <div className="glass-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 22h8" />
              <path d="M12 15v7" />
              <path d="M12 15a7.5 7.5 0 0 0 7.5-7.5V3a1 1 0 0 0-1-1H5.5a1 1 0 0 0-1 1v4.5A7.5 7.5 0 0 0 12 15z" />
              <path d="M4.5 7.5h15" />
            </svg>
          </div>
        </div>
      </section>

      <section className="section-finest" id="products">
        <div className="finest-header">
          <h2 className="finest-title">Finest Selection</h2>
          <div className="finest-subtitle">EXPLORE</div>
        </div>
        
        <div className="finest-grid">
          {wines.map((wine, idx) => (
            <div className="finest-card" key={idx}>
              <div className={`finest-tag ${wine.type === 'RED' ? 'tag-red' : wine.type === 'WHITE' ? 'tag-white' : 'tag-rose'}`}>{wine.type}</div>
              <img src={wine.imagePath} alt={wine.name} className="finest-img" />
              <div className="finest-info w-full">
                <h3 className="finest-name">{wine.name}</h3>
                <div className="finest-price">{formatIDR(wine.currentPrice)}</div>
                <div className="text-xs text-gray-500 mt-0.5 mb-2 line-through">{wine.oldPrice ? formatIDR(wine.oldPrice) : ""}</div>
                <div className="flex gap-2 justify-center mt-2 mb-4 text-base">{wine.icons}</div>
                <button className="w-full border border-gray-400 rounded-full py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-all">Buy now</button>
                <div className="text-[10px] text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Available for pickup at Lively Store
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secret Admin Footer */}
      <footer className="w-full py-8 text-center text-zinc-500 text-xs bg-zinc-50 font-sans border-t border-zinc-200">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a href="/login" className="hover:text-zinc-800 transition-colors">
            Infinity
          </a>{" "}
          Vines Cikarang. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
