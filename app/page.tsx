"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "./components/Footer";
import IdentiteBranding from "./components/IdentiteBranding";
import MarketingCommunication from "./components/MarketingCommunication";
import DesignDigital from "./components/DesignDigital";
import PrintProduit from "./components/PrintProduit";
import MediaKitSection from "./components/MediaKitSection";
import BonusVideo from "./components/BonusVideo";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("accueil");
  
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Animation de remplissage et disparition
  useEffect(() => {
    const interval = setInterval(() => {
      setFillHeight(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Détection des sections pour le menu actif
  useEffect(() => {
    if (!showLoading) {
      const sections = document.querySelectorAll("section, #mediakit, #bonus");
      const options = {
        threshold: 0.3,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "accueil") setActiveLink("accueil");
            else if (id === "services") setActiveLink("services");
            else if (id === "mediakit") setActiveLink("mediakit");
            else if (id === "bonus") setActiveLink("bonus");
          }
        });
      }, options);

      sections.forEach((section) => {
        if (section.id) {
          observer.observe(section);
        }
      });

      return () => observer.disconnect();
    }
  }, [showLoading]);

  const initObserver = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => {
      if (!el.classList.contains("active")) {
        observerRef.current?.observe(el);
      }
    });
  };

  useEffect(() => {
    if (!showLoading) {
      initObserver();
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [showLoading]); 

  useEffect(() => {
    if (!showLoading) {
      document.querySelectorAll(".reveal").forEach(el => {
        el.classList.remove("active");
      });
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      };

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observerRef.current?.unobserve(entry.target);
          }
        });
      }, observerOptions);

      setTimeout(() => {
        document.querySelectorAll(".reveal").forEach(el => {
          if (!el.classList.contains("active")) {
            observerRef.current?.observe(el);
          }
        });
      }, 50);
    }
  }, [activeCategory, showLoading]);

  const categories = [
    { id: "all", name: "Tous" },
    { id: "branding", name: "Identité & Branding" },
    { id: "marketing", name: "Marketing" },
    { id: "digital", name: "Design Digital" },
    { id: "print", name: "Print & Produit" },
  ];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsMenuOpen(false);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  
  
  
if (showLoading) {
  return (
    <div className="liq-container">
      <div className="liq-content">


        <div className="liq-logo-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <defs>
              <clipPath id="logoClip">
                <circle cx="70" cy="70" r="54"/>
              </clipPath>
              <clipPath id="liquidClip">
                <rect
                  x="16"
                  y={16 + 108 * (1 - fillHeight / 100)}
                  width="108"
                  height={108 * (fillHeight / 100)}
                />
              </clipPath>
              <linearGradient id="bwGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#aaa"/>
                <stop offset="100%" stopColor="#555"/>
              </linearGradient>
              <linearGradient id="colorGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ca3c66"/>
                <stop offset="100%" stopColor="#ca3c66"/>
              </linearGradient>
            </defs>

            <circle cx="70" cy="70" r="56" fill="none"
              stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

            <g clipPath="url(#logoClip)">
              
              <circle cx="70" cy="70" r="54" fill="url(#bwGrad)"/>


              <circle cx="70" cy="70" r="54"
                fill="url(#colorGrad)" clipPath="url(#liquidClip)"/>


              <image
                href="/4.ico"
                x="35" y="35" width="70" height="70"
                style={{ filter: 'grayscale(1)' }}
              />
              <image
                href="/4.ico"
                x="35" y="35" width="70" height="70"
                clipPath="url(#liquidClip)"
              />
            </g>


            <circle cx="70" cy="70" r="64" fill="none"
              stroke="#ca3c66" strokeWidth="1.5"
              strokeDasharray="50 350" strokeLinecap="round"
              style={{ animation: 'liqRotate 2s linear infinite', transformOrigin: '70px 70px' }}/>
            <circle cx="70" cy="70" r="60" fill="none"
              stroke="#ca3c66" strokeWidth="1"
              strokeDasharray="30 350" strokeLinecap="round"
              style={{ animation: 'liqRotateRev 3s linear infinite', transformOrigin: '70px 70px' }}/>
          </svg>
        </div>


        <div className="liq-text">
          <div className="liq-brand">Dalia</div>
        </div>
      </div>

      <style>{`
        .liq-container {
          position: fixed; top: 0; left: 0;
          width: 100%; height: 100vh;
          
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
        }
        .liq-content {
          text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 24px;
          padding: 40px;
          border-radius: 32px;
          
          backdrop-filter: blur(10px);
          animation: liqFadeIn 0.5s ease-out;
        }
        @keyframes liqFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .liq-logo-wrap { position: relative; }
        .liq-brand {
          font-family: 'Modak', cursive;
          font-size: 2rem;
          color: #ca3c66;
          letter-spacing: 4px;
        }
        @keyframes liqRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes liqRotateRev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}


  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <Image 
            src="/4.ico" 
            alt="Logo" 
            width={40} 
            height={40} 
            className="logo-image"
          />
          <div className="logo">DALIA</div>
        </div>
        
        <button 
          className={`burger-menu ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <a 
              href="#accueil" 
              className={activeLink === "accueil" ? "active" : ""}
              onClick={() => handleLinkClick("accueil")}
            >
              Accueil
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              className={activeLink === "services" ? "active" : ""}
              onClick={() => handleLinkClick("services")}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              href="#mediakit" 
              className={activeLink === "mediakit" ? "active" : ""}
              onClick={() => handleLinkClick("mediakit")}
            >
              Media Kit
            </a>
          </li>
          <li>
            <a 
              href="#bonus" 
              className={activeLink === "bonus" ? "active" : ""}
              onClick={() => handleLinkClick("bonus")}
            >
              Bonus Video
            </a>
          </li>
        </ul>
      </nav>

      <section id="accueil" className="hero">
        <div className="hero-content">
          <h1 className="reveal">Catalogue <span>Design</span></h1>
          <p className="reveal">
            Découvrez tous nos services de design graphique à des prix accessibles.
            Des créations professionnelles pour tous vos besoins.
          </p>
          <div className="hero-buttons reveal">
            <a href="#services" className="btn btn-primary">Voir les services</a>
            <a href="#bonus" className="btn btn-secondary">Voir les bonus</a>
          </div>
        </div>
      </section>

      <section id="services" className="section-padding">
        <div className="container">
          <h2 className="section-title reveal">Nos Services</h2>
          
          <div className="filter-buttons reveal">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {activeCategory === "all" && (
            <>
              <div className="reveal">
                <IdentiteBranding showTitle={false} />
              </div>
              <div className="reveal">
                <MarketingCommunication showTitle={false} />
              </div>
              <div className="reveal">
                <DesignDigital showTitle={false} />
              </div>
              <div className="reveal">
                <PrintProduit showTitle={false} />
              </div>
            </>
          )}

          {activeCategory === "branding" && (
            <div className="reveal">
              <IdentiteBranding showTitle={true} />
            </div>
          )}

          {activeCategory === "marketing" && (
            <div className="reveal">
              <MarketingCommunication showTitle={true} />
            </div>
          )}

          {activeCategory === "digital" && (
            <div className="reveal">
              <DesignDigital showTitle={true} />
            </div>
          )}

          {activeCategory === "print" && (
            <div className="reveal">
              <PrintProduit showTitle={true} />
            </div>
          )}
        </div>
      </section>

      <div id="mediakit">
        <MediaKitSection />
      </div>

      <div id="bonus">
        <BonusVideo />
      </div>

      <Footer />
    </>
  );
}