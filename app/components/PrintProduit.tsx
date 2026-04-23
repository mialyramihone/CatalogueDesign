"use client";

import { BookOpen, Package, Ticket, Calendar, Box, Tag, Gift, Mail, MapPin, ClipboardList, Download } from "lucide-react";
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

const printServices: Service[] = [
  { 
    name: "Brochure", 
    minPrice: 30000, 
    maxPrice: 80000, 
    description: "Brochure professionnelle pour présenter vos services",
    details: "Triplié ou déplié\nDesign élégant\nPapier premium\nPrêt pour impression\nLivraison sous 7 jours",
    icon: <BookOpen size={40} strokeWidth={1.5} />
  },
  { 
    name: "Magazine", 
    minPrice: 80000, 
    maxPrice: 200000, 
    description: "Magazine complet avec mise en page soignée",
    details: "20 à 50 pages\nMise en page professionnelle\nCouverture personnalisée\nPrêt pour impression\nLivraison sous 14 jours",
    icon: <BookOpen size={40} strokeWidth={1.5} />
  },
  { 
    name: "Dépliant", 
    minPrice: 20000, 
    maxPrice: 50000, 
    description: "Dépliant pratique pour vos communications",
    details: "2 ou 3 volets\nDesign clair et aéré\nPapier recyclable\nPrêt pour impression\nLivraison sous 5 jours",
    icon: <ClipboardList size={40} strokeWidth={1.5} />
  },
  { 
    name: "Affiche", 
    price: 10000, 
    isSingle: true, 
    description: "Affiche grand format pour vos événements",
    details: "Format A2/A3/A1\nDesign impactant\nHaute résolution\nPrêt pour impression\nLivraison sous 3 jours",
    icon: <Calendar size={40} strokeWidth={1.5} />
  },
  { 
    name: "Catalogue", 
    minPrice: 80000, 
    maxPrice: 200000, 
    description: "Catalogue produit élégant et structuré",
    details: "Jusqu'à 100 produits\nPhotos et descriptions\nDesign épuré\nPrêt pour impression\nLivraison sous 15 jours",
    icon: <BookOpen size={40} strokeWidth={1.5} />
  },
  { 
    name: "Journal", 
    minPrice: 100000, 
    isPlus: true, 
    description: "Journal professionnel à grand tirage",
    details: "Format tabloïd\nMulti-pages possible\nDesign éditorial\nPrêt pour impression grand tirage\nLivraison sous 20 jours",
    icon: <ClipboardList size={40} strokeWidth={1.5} />
  },
];

const packagingServices: Service[] = [
  { 
    name: "Emballage", 
    minPrice: 40000, 
    maxPrice: 120000, 
    description: "Emballage personnalisé pour vos produits",
    details: "Design sur mesure\nPlusieurs matériaux\nPrototype inclus\nPrêt pour production\nLivraison sous 10 jours",
    icon: <Package size={40} strokeWidth={1.5} />
  },
  { 
    name: "Étiquette", 
    minPrice: 10000, 
    maxPrice: 25000, 
    description: "Étiquettes design pour vos conditionnements",
    details: "Pack de 10 à 100 étiquettes\nForme personnalisée\nDesign élégant\nPrêt pour impression\nLivraison sous 5 jours",
    icon: <Tag size={40} strokeWidth={1.5} />
  },
  { 
    name: "Boîte", 
    minPrice: 50000, 
    maxPrice: 150000, 
    description: "Boîte sur mesure pour un emballage premium",
    details: "Structure personnalisée\nDesign haut de gamme\nMatière noble\nPrototype inclus\nLivraison sous 15 jours",
    icon: <Box size={40} strokeWidth={1.5} />
  },
  { 
    name: "Mockup", 
    minPrice: 10000, 
    maxPrice: 20000, 
    description: "Mockup réaliste pour visualiser vos designs",
    details: "3 mockups inclus\nRésultat photoréaliste\nFichier PSD modifiable\nPrêt pour présentation client\nLivraison sous 3 jours",
    icon: <Gift size={40} strokeWidth={1.5} />
  },
  { 
    name: "Bouteille / sachet", 
    minPrice: 30000, 
    maxPrice: 100000, 
    description: "Design pour bouteilles et sachets personnalisés",
    details: "Design adapté à la forme\nÉtude d'ergonomie\nSimulation 3D\nPrêt pour production\nLivraison sous 10 jours",
    icon: <Package size={40} strokeWidth={1.5} />
  },
];

const eventServices: Service[] = [
  { 
    name: "Invitation", 
    minPrice: 8000, 
    maxPrice: 15000, 
    description: "Invitation élégante pour vos événements",
    details: "Recto/verso design\nPapier premium\nEnveloppe assortie\nPrêt pour impression\nLivraison sous 3 jours",
    icon: <Mail size={40} strokeWidth={1.5} />
  },
  { 
    name: "Ticket", 
    minPrice: 5000, 
    maxPrice: 10000, 
    description: "Ticket design pour vos entrées",
    details: "Format standard\nNumérotation possible\nCode QR intégré\nPrêt pour impression\nLivraison sous 3 jours",
    icon: <Ticket size={40} strokeWidth={1.5} />
  },
  { 
    name: "Badge", 
    minPrice: 5000, 
    maxPrice: 10000, 
    description: "Badge personnalisé pour vos participants",
    details: "Avec ou sans pince\nDesign personnalisé\nImpression recto/verso\nPrêt pour événement\nLivraison sous 2 jours",
    icon: <MapPin size={40} strokeWidth={1.5} />
  },
  { 
    name: "Affiche", 
    price: 10000, 
    isSingle: true, 
    description: "Affiche événementielle percutante",
    details: "Design dynamique\nInfos claires\nHaute résolution\nPrêt pour impression\nLivraison sous 24h",
    icon: <Calendar size={40} strokeWidth={1.5} />
  },
  { 
    name: "Programme", 
    minPrice: 10000, 
    maxPrice: 25000, 
    description: "Programme détaillé pour vos événements",
    details: "Planification horaire\nCarte interactive\nDesign épuré\nVersion imprimable\nLivraison sous 2 jours",
    icon: <ClipboardList size={40} strokeWidth={1.5} />
  },
];

export default function PrintProduit({ showTitle = true }: Props) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getPriceDisplay = (service: Service) => {
    if (service.isSingle && service.price) {
      return `${service.price.toLocaleString()} Ar`;
    }
    if (service.isPlus && service.minPrice) {
      return `${service.minPrice.toLocaleString()} Ar+`;
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
      {/* {showTitle && <h2 className="section-title">Print & Produit</h2>} */}
      
      <h3 className="subsection-title">Print</h3>
      <div className="cards-grid">
        {printServices.map((service, index) => (
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

      <h3 className="subsection-title">Packaging</h3>
      <div className="cards-grid">
        {packagingServices.map((service, index) => (
          <div key={index} className="card-flip" ref={(el) => { cardRefs.current[printServices.length + index] = el; }}>
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
                  onClick={() => downloadBackCard(printServices.length + index, service.name)}
                >
                  <Download size={16} />
                  Télécharger la carte
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="subsection-title">Événementiel</h3>
      <div className="cards-grid">
        {eventServices.map((service, index) => (
          <div key={index} className="card-flip" ref={(el) => { cardRefs.current[printServices.length + packagingServices.length + index] = el; }}>
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
                  onClick={() => downloadBackCard(printServices.length + packagingServices.length + index, service.name)}
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