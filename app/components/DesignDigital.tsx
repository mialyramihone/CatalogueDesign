"use client";

import { Gamepad2, Trophy, Users, Image as ImageIcon, Palette, Sparkles, Star, Heart, Zap, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface Props {
  showTitle?: boolean;
}

interface Service {
  name: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  isSingle?: boolean;
  isPlus?: boolean;
  description: string;
  details: string;
  icon: React.ReactNode;
}

const gamingServices: Service[] = [
  { 
    name: "Logo team", 
    minPrice: 15000, 
    maxPrice: 40000, 
    description: "Logo unique pour votre équipe esport",
    details: "Design moderne et agressif\n3 propositions uniques\nVersion mascotte possible\nFichiers vectoriels\nLivraison sous 5 jours",
    icon: <Gamepad2 size={40} strokeWidth={1.5} />
  },
  { 
    name: "Affiche tournoi", 
    price: 10000, 
    isSingle: true, 
    description: "Affiche promotionnelle pour vos tournois",
    details: "Design dynamique\nIntégration sponsors\nFormat imprimable\nVersion web incluse\nLivraison sous 24h",
    icon: <Trophy size={40} strokeWidth={1.5} />
  },
  { 
    name: "Bâche", 
    minPrice: 30000, 
    maxPrice: 80000, 
    description: "Bâche géante pour habiller vos événements",
    details: "Grande taille personnalisée\nDesign impactant\nPrêt pour impression\nFichier haute résolution\nLivraison sous 2 jours",
    icon: <Users size={40} strokeWidth={1.5} />
  },
  { 
    name: "Player card", 
    minPrice: 10000, 
    maxPrice: 20000, 
    description: "Carte personnalisée pour vos joueurs",
    details: "Template personnalisable\nStatistiques intégrées\nDesign unique par joueur\nPack de 5 à 20 cartes\nLivraison sous 2 jours",
    icon: <Star size={40} strokeWidth={1.5} />
  },
  { 
    name: "Thumbnail", 
    minPrice: 8000, 
    maxPrice: 15000, 
    description: "Miniature accrocheuse pour vos vidéos",
    details: "Format YouTube/Twitch\nTexte percutant\nDesign clickable\nVignette optimisée\nLivraison sous 24h",
    icon: <Zap size={40} strokeWidth={1.5} />
  },
];

const illustrationServices: Service[] = [
  { 
    name: "Illustration vectorielle", 
    minPrice: 20000, 
    maxPrice: 80000, 
    description: "Illustration vectorielle de haute qualité",
    details: "Style personnalisable\nInfographie vectorielle\nFichier AI/SVG/PNG\nModifiable à l'infini\nLivraison sous 7 jours",
    icon: <Palette size={40} strokeWidth={1.5} />
  },
  { 
    name: "Icônes", 
    minPrice: 5000, 
    maxPrice: 20000, 
    description: "Pack d'icônes personnalisées",
    details: "Pack de 10 à 50 icônes\nStyle uniforme\nFichier vectoriel\nUtilisation web et print\nLivraison sous 5 jours",
    icon: <Sparkles size={40} strokeWidth={1.5} />
  },
  { 
    name: "Portrait stylisé", 
    minPrice: 30000, 
    maxPrice: 100000, 
    description: "Portrait unique avec style artistique",
    details: "Style illustration ou réaliste\nPlusieurs versions\nFichier haute résolution\nFormat imprimable\nLivraison sous 10 jours",
    icon: <ImageIcon size={40} strokeWidth={1.5} />
  },
  { 
    name: "Sticker", 
    minPrice: 5000, 
    maxPrice: 15000, 
    description: "Stickers personnalisés imprimables",
    details: "Pack de 5 à 20 stickers\nDécoupe personnalisée\nFichier prêt pour impression\nVersion PNG/SVG\nLivraison sous 3 jours",
    icon: <Heart size={40} strokeWidth={1.5} />
  },
  { 
    name: "Art simple", 
    minPrice: 10000, 
    maxPrice: 40000, 
    description: "Illustration simple mais élégante",
    details: "Design minimaliste\nLigne claire\nCouleurs harmonieuses\nFichier haute résolution\nLivraison sous 5 jours",
    icon: <Zap size={40} strokeWidth={1.5} />
  },
];

export default function DesignDigital({ showTitle = true }: Props) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getPriceDisplay = (service: Service) => {
    if (service.isSingle && service.price) {
      return `${service.price.toLocaleString()} Ar`;
    }
    if (service.isPlus) {
      return `${service.minPrice?.toLocaleString()} Ar+`;
    }
    if (service.minPrice && service.maxPrice) {
      return `${service.minPrice.toLocaleString()} - ${service.maxPrice.toLocaleString()} Ar`;
    }
    return "Sur devis";
  };

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
          backgroundColor: '#fffef7',
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
    <section className="section">
      {/* {showTitle && <h2 className="section-title">Design Digital & Spécialisé</h2>} */}
      
      <h3 className="subsection-title">Gaming / Esport</h3>
      <div className="cards-grid">
        {gamingServices.map((service, index) => (
          <div key={index} className="card-flip" ref={(el) => { cardRefs.current[index] = el; }}>
            <div className="card-flip-inner">
              <div className="card-front">
                <div className="card-icon">{service.icon}</div>
                <h3 className="card-title">{service.name}</h3>
                <p className="card-description">{service.description}</p>
                <p className="card-price">{getPriceDisplay(service)}</p>
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
                  <span className="price-value">{getPriceDisplay(service)}</span>
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

      <h3 className="subsection-title">Illustration</h3>
      <div className="cards-grid">
        {illustrationServices.map((service, index) => (
          <div key={index} className="card-flip" ref={(el) => { cardRefs.current[gamingServices.length + index] = el; }}>
            <div className="card-flip-inner">
              <div className="card-front">
                <div className="card-icon">{service.icon}</div>
                <h3 className="card-title">{service.name}</h3>
                <p className="card-description">{service.description}</p>
                <p className="card-price">
                  {service.minPrice?.toLocaleString()} - {service.maxPrice?.toLocaleString()} Ar
                </p>
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
                  <span className="price-value">{service.minPrice?.toLocaleString()} - {service.maxPrice?.toLocaleString()} Ar</span>
                </div>
                <div className="watermark">
                  Dalia • {new Date().toLocaleDateString('fr-FR')}
                </div>
                <button 
                  className="btn-download" 
                  onClick={() => downloadBackCard(gamingServices.length + index, service.name)}
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