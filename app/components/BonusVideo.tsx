"use client";

import { Video, Play, Clock, TrendingUp, Download, Tv, Mic, Monitor, Camera } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface Service {
  name: string;
  price: number;
  duration: string;
  description: string;
  details: string;
  icon: React.ReactNode;
}

const bonusVideoServices: Service[] = [
  { 
    name: "Publicité Video", 
    price: 15000, 
    duration: "30 secondes",
    description: "Vidéo publicitaire professionnelle",
    details: "Montage vidéo\nHabillage graphique\nMusique libres de droits\nTransition dynamiques\nExport HD\nLivraison sous 5 jours",
    icon: <Video size={40} strokeWidth={1.5} />
  },
  { 
    name: "Montage Vidéo", 
    price: 25000, 
    duration: "1 minute",
    description: "Montage vidéo dynamique et professionnel",
    details: "Découpage des séquences\nAjout musique et effets sonores\nTransitions dynamiques\nTexte simple\nExport HD\nLivraison sous 3 jours",
    icon: <Monitor size={40} strokeWidth={1.5} />
  },
  { 
    name: "Pack Stream Starter", 
    price: 85000, 
    duration: "Pack complet",
    description: "Pack complet pour streameur débutant",
    details: "Overlay personnalisé\nÉcran d'entree\nÉcran d'attente\nÉcran de fin\nBannières réseaux sociaux\nLivraison sous 2 jours",
    icon: <Tv size={40} strokeWidth={1.5} />
  },
];

export default function BonusVideo() {
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
          scale: 3,
          backgroundColor: '#ffffff',
          useCORS: true,
          logging: false,
          allowTaint: false,
          windowWidth: backElement.scrollWidth + 100,
          windowHeight: backElement.scrollHeight + 100,
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
    <section className="section" id="bonus">
      <h2 className="section-title">Bonus Video & Stream</h2>
      <div className="cards-grid">
        {bonusVideoServices.map((service, index) => (
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
                <div className="card-back-prices">
                  <div className="card-back-price">
                    <span className="price-label">Durée :</span>
                    <span className="price-value">{service.duration}</span>
                  </div>
                  <div className="card-back-price">
                    <span className="price-label">Tarif :</span>
                    <span className="price-value">{service.price.toLocaleString()} Ar</span>
                  </div>
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
