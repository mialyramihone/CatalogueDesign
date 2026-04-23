"use client";

import { Image, Package, Crown, Trophy, Users, Star, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface Service {
  name: string;
  price: number;
  description: string;
  details: string;
  icon: React.ReactNode;
}

const mediaKitServices: Service[] = [
  { 
    name: "Affiche simple", 
    price: 8000, 
    description: "Design graphique standard",
    details: "Design personnalisé\nFormat A2/A3\nHaute résolution\nPrêt pour impression\nLivraison sous 24h",
    icon: <Image size={40} strokeWidth={1.5} />
  },
  { 
    name: "Pack Starter", 
    price: 21600, 
    description: "3 affiches",
    details: "3 designs uniques\nFormat A2/A3\nHaute résolution\nPrêt pour impression\nLivraison sous 2 jours",
    icon: <Package size={40} strokeWidth={1.5} />
  },
  { 
    name: "Pack Standard", 
    price: 36000, 
    description: "5 affiches",
    details: "5 designs uniques\nFormat A2/A3\nHaute résolution\nPrêt pour impression\nLivraison sous 4 jours",
    icon: <Package size={40} strokeWidth={1.5} />
  },
  { 
    name: "Pack Pro", 
    price: 68000, 
    description: "10 affiches",
    details: "10 designs uniques\nFormat A2/A3\nHaute résolution\nPrêt pour impression\nLivraison sous 8 jours",
    icon: <Crown size={40} strokeWidth={1.5} />
  },
  { 
    name: "Pack Business", 
    price: 128000, 
    description: "20 affiches",
    details: "20 designs uniques\nFormat A2/A3\nHaute résolution\nPrêt pour impression\nLivraison sous 14 jours",
    icon: <Star size={40} strokeWidth={1.5} />
  },
  { 
    name: "Pack Tournoi", 
    price: 25000, 
    description: "Affiche + bannière + player card",
    details: "1 affiche personnalisée\n1 bannière web\n1 player card\nDesigns coordonnés\nLivraison sous 2 jours",
    icon: <Trophy size={40} strokeWidth={1.5} />
  },
  { 
    name: "Pack Team", 
    price: 50000, 
    description: "Logo + bannière + 3 affiches",
    details: "1 logo personnalisé\n1 bannière web\n3 affiches\nIdentité visuelle complète\nLivraison sous 3 jours",
    icon: <Users size={40} strokeWidth={1.5} />
  },
];

export default function MediaKitSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const downloadBackCard = async (index: number, serviceName: string) => {
    const cardElement = cardRefs.current[index];
    if (!cardElement) return;

    try {
      const backElement = cardElement.querySelector('.card-back') as HTMLElement;
      
      if (backElement) {
        const originalTransform = backElement.style.transform;
        const originalTransition = backElement.style.transition;
        const downloadBtn = backElement.querySelector('.btn-download') as HTMLElement;
        
        backElement.style.transform = 'rotateY(0deg)';
        backElement.style.transition = 'none';
        
        if (downloadBtn) {
          downloadBtn.style.display = 'none';
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const canvas = await html2canvas(backElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          logging: false,
          allowTaint: false,
          windowWidth: backElement.scrollWidth,
          windowHeight: backElement.scrollHeight,
          onclone: (clonedDoc, element) => {
            const clonedBack = element.querySelector('.card-back') as HTMLElement;
            if (clonedBack) {
              clonedBack.style.transform = 'rotateY(0deg)';
              clonedBack.style.transition = 'none';
              const clonedBtn = clonedBack.querySelector('.btn-download') as HTMLElement;
              if (clonedBtn) {
                clonedBtn.style.display = 'none';
              }
            }
          }
        });
        
        if (downloadBtn) {
          downloadBtn.style.display = 'flex';
        }
        
        backElement.style.transform = originalTransform;
        backElement.style.transition = originalTransition;
        
        const link = document.createElement('a');
        const today = new Date();
        const dateStr = `${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}`;
        link.download = `${serviceName}_${dateStr}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du téléchargement');
    }
  };

  return (
    <section className="section" id="mediakit">
      <h2 className="section-title">Media Kit</h2>
      <div className="cards-grid">
        {mediaKitServices.map((service, index) => (
          <div key={index} className="card-flip" ref={(el) => { cardRefs.current[index] = el; }}>
            <div className="card-flip-inner">
              <div className="card-front">
                <div className="card-icon">{service.icon}</div>
                <h3 className="card-title">{service.name}</h3>
                <p className="card-description">{service.description}</p>
                <p className="card-price">{service.price.toLocaleString()} Ar</p>
                <span className="flip-hint">Survolez pour détails</span>
              </div>
              <div className="card-back">
                <h3 className="card-back-title">{service.name}</h3>
                <div className="card-details">
                  <p className="details-title">Ce que j'inclus :</p>
                  <div className="details-list">
                    {service.details.split('\n').map((item, i) => (
                      <div key={i} className="detail-item">• {item}</div>
                    ))}
                  </div>
                </div>
                <div className="card-back-price">
                  <span className="price-label">Tarif :</span>
                  <span className="price-value">{service.price.toLocaleString()} Ar</span>
                </div>
                <div className="watermark">
                  Dalia • {new Date().toLocaleDateString('fr-FR')}
                </div>
                <button 
                  className="btn-download" 
                  onClick={() => downloadBackCard(index, service.name)}
                >
                  <Download size={16} />
                  Télécharger la carte
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}