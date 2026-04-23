"use client";

import { Megaphone, Share2, Image, Video, TrendingUp, Users, Camera, Layout, FileText, Download } from "lucide-react";
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
  description: string;
  details: string;
  icon: React.ReactNode;
}

const publiciteServices: Service[] = [
  { 
    name: "Affiche", 
    price: 10000, 
    isSingle: true, 
    description: "Affiche publicitaire percutante",
    details: "Design percutant et attractif\nFormat personnalisable\nPrêt pour impression\nFichier haute résolution\nLivraison sous 24h",
    icon: <Megaphone size={40} strokeWidth={1.5} />
  },
  { 
    name: "Flyer", 
    minPrice: 8000, 
    maxPrice: 12000, 
    description: "Flyer promotionnel pour vos événements",
    details: "Recto/verso personnalisé\nPlusieurs formats disponibles\nDesign moderne\nPrêt pour impression\nLivraison sous 2 jours",
    icon: <Share2 size={40} strokeWidth={1.5} />
  },
  { 
    name: "Poster", 
    minPrice: 10000, 
    maxPrice: 15000, 
    description: "Poster design pour vos murs",
    details: "Grand format (A1, A2)\nDesign artistique\nHaute résolution\nPrêt pour impression\nLivraison sous 2 jours",
    icon: <Image size={40} strokeWidth={1.5} />
  },
  { 
    name: "Kakemono", 
    minPrice: 20000, 
    maxPrice: 40000, 
    description: "Kakemono professionnel pour salons",
    details: "Format 80x180cm ou 85x200cm\nDesign impactant\nPrêt pour impression sur bâche\nPochette de transport incluse\nLivraison sous 2 jours",
    icon: <Users size={40} strokeWidth={1.5} />
  },
  { 
    name: "Pub réseaux sociaux", 
    minPrice: 10000, 
    maxPrice: 18000, 
    description: "Publicité optimisée pour les réseaux",
    details: "Formats adaptés (Facebook, Instagram)\nCall-to-action percutant\nVersion carrousel possible\nOptimisation mobile\nLivraison sous 2 jours",
    icon: <Video size={40} strokeWidth={1.5} />
  },
];

const reseauxSociauxServices: Service[] = [
  { 
    name: "Post", 
    minPrice: 8000, 
    maxPrice: 12000, 
    description: "Post attractif pour vos réseaux sociaux",
    details: "Design engageant\nTexte + visuel harmonisé\nFormats carré/paysage\nPrêt à poster\nLivraison sous 24h",
    icon: <Layout size={40} strokeWidth={1.5} />
  },
  { 
    name: "Story", 
    minPrice: 5000, 
    maxPrice: 10000, 
    description: "Story engageante pour Instagram/Facebook",
    details: "Format vertical 9:16\nÉléments interactifs possibles\nDesign dynamique\nMusique et animations\nLivraison sous 24h",
    icon: <Camera size={40} strokeWidth={1.5} />
  },
  { 
    name: "Carousel", 
    minPrice: 15000, 
    maxPrice: 30000, 
    description: "Carrousel interactif multi-pages",
    details: "3 à 10 slides\nStorytelling visuel\nDesign cohérent\nCall-to-action intégré\nLivraison sous 3 jours",
    icon: <Share2 size={40} strokeWidth={1.5} />
  },
  { 
    name: "Cover", 
    minPrice: 25000, 
    maxPrice: 30000, 
    description: "Bannière de couverture pour vos profils",
    details: "Format spécifique (Facebook, Twitter, LinkedIn)\nDesign professionnel\nIntégration logo\nVersion mobile optimisée\nLivraison sous 2 jours",
    icon: <Image size={40} strokeWidth={1.5} />
  },
  { 
    name: "Template", 
    minPrice: 15000, 
    maxPrice: 40000, 
    description: "Template personnalisable pour publications",
    details: "Pack de 5 à 10 templates\nFichiers modifiables (PSD)\nDesign cohérent avec votre marque\nFacile à utiliser\nLivraison sous 5 jours",
    icon: <FileText size={40} strokeWidth={1.5} />
  },
];

export default function MarketingCommunication({ showTitle = true }: Props) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getPriceDisplay = (service: Service) => {
    if (service.isSingle && service.price) {
      return `${service.price.toLocaleString()} Ar`;
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
      {/* {showTitle && <h2 className="section-title">Marketing & Communication</h2>} */}
      
      <h3 className="subsection-title">Publicité</h3>
      <div className="cards-grid">
        {publiciteServices.map((service, index) => (
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

      <h3 className="subsection-title">Réseaux sociaux</h3>
      <div className="cards-grid">
        {reseauxSociauxServices.map((service, index) => (
          <div key={index} className="card-flip" ref={(el) => { cardRefs.current[publiciteServices.length + index] = el; }}>
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
                  onClick={() => downloadBackCard(publiciteServices.length + index, service.name)}
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