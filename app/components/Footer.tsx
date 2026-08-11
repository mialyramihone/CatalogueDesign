"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import {  Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Catalogue Design</h3>
            <p className="footer-description">
              Des créations professionnelles pour tous vos besoins en design graphique.
              Qualité, créativité et prix accessibles.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/Lyami.Nehomira" className="social-icon" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://github.com/mialyramihone" className="social-icon" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
            </div>
          </div>


          <div className="footer-section">
            <h4 className="footer-title">Liens rapides</h4>
            <ul className="footer-links">
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#mediakit">Media Kit</a></li>
              <li><a href="#bonus">Bonus Video</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={16} />
                <a href="mailto:contact@ramihonemialy@gmail.com?subject=Demande%20de%20renseignement">
                  ramihonemialyy@gmail.com
                </a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+261342823133">
                  +261 34 28 231 33
                </a>
              </li>
              <li>
                <MapPin size={16} />
                <span>301 Fianarantsoa, Madagascar</span>
              </li>
            </ul>
          </div>


        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Dalia - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
