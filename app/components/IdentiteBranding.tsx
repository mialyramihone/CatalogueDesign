"use client";

import { Palette, Brush, CreditCard, FileText, Sparkles, RefreshCw, Info, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface Props {
  showTitle?: boolean;
}

interface Service {
  name: string;
  minPrice: number;
  maxPrice: number;
  description: string;
  details: string;
  icon: React.ReactNode;
}

const identiteServices: Service[] = [
  { 
    name: "Logo", 
    minPrice: 15000, 
    maxPrice: 40000, 
    description: "Création de logo unique et personnalisé pour votre marque",
    details: "Recherche d'inspiration\n3 propositions uniques\n2 versions (couleur + noir/blanc)\nFichiers vectoriels (AI, EPS, PNG)\nLivraison sous 2-4 jours",
    icon: <Brush size={40} strokeWidth={1.5} />
  },
  { 
    name: "Charte graphique", 
    minPrice: 50000, 
    maxPrice: 120000, 
    description: "Ensemble complet des règles graphiques de votre identité",
    details: "Palette de couleurs\nTypographies\nUsages des logos\nTemplates\nGuide complet PDF",
    icon: <Palette size={40} strokeWidth={1.5} />
  },
  { 
    name: "Carte de visite", 
    minPrice: 10000, 
    maxPrice: 20000, 
    description: "Design élégant et professionnel pour vos cartes",
    details: "Recto/verso personnalisé\nFini mat ou brillant\nFormat classique ou original\nPrêt pour impression\nLivraison sous 2 jours",
    icon: <CreditCard size={40} strokeWidth={1.5} />
  },
  { 
    name: "Papier en-tête", 
    minPrice: 10000, 
    maxPrice: 15000, 
    description: "Papier à en-tête personnalisé pour vos documents officiels",
    details: "Design épuré et professionnel\nIntégration logo\nFormat A4 standard\nFichier Word/PDF\nLivraison sous 2 jours",
    icon: <FileText size={40} strokeWidth={1.5} />
  },
  { 
    name: "Identité de marque", 
    minPrice: 80000, 
    maxPrice: 200000, 
    description: "Identité visuelle complète de A à Z",
    details: "Logo + charte\nPapeterie complète\nRéseaux sociaux\nTemplates email\nGuide de marque complet\nLivraison sous 5 jours",
    icon: <Sparkles size={40} strokeWidth={1.5} />
  },
  { 
    name: "Rebranding", 
    minPrice: 60000, 
    maxPrice: 150000, 
    description: "Modernisation et refonte de votre image de marque",
    details: "Audit de l'existant\nProposition nouvelle direction\nRefonte logo\nNouvelle charte\nMigration complète\nLivraison sous 7 jours",
    icon: <RefreshCw size={40} strokeWidth={1.5} />
  },
];

export default function IdentiteBranding({ showTitle = true }: Props) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const downloadBackCard = async (index: number) => {
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
        link.download = `${identiteServices[index].name}_${dateStr}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    }
  };

  return (
    <section className="section">
      {/* {showTitle && <h2 className="section-title">Identité & Branding</h2>} */}

      <h3 className="subsection-title">Identité & Branding</h3>
      <div className="cards-grid">
        {identiteServices.map((service, index) => (
          <div key={index} className="card-flip" ref={(el) => { cardRefs.current[index] = el; }}>
            <div className="card-flip-inner">
              <div className="card-front">
                <div className="card-icon">{service.icon}</div>
                <h3 className="card-title">{service.name}</h3>
                <p className="card-description">{service.description}</p>
                <p className="card-price">
                  {service.minPrice.toLocaleString()} - {service.maxPrice.toLocaleString()} Ar
                </p>
                <span className="flip-hint">Survolez pour détails</span>
              </div>
              <div className="card-back">
                <div className="card-back-icon">
                  <Info size={32} strokeWidth={1.5} />
                </div>
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
                  <span className="price-value">{service.minPrice.toLocaleString()} - {service.maxPrice.toLocaleString()} Ar</span>
                </div>
                <div className="watermark">
                  Dalia • {new Date().toLocaleDateString('fr-FR')}
                </div>
                <button 
                  className="btn-download" 
                  onClick={() => downloadBackCard(index)}
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