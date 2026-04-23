"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFillHeight(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="logo-water-container">
        <div className="logo-bw">
          <div className="logo-letter">D</div>
        </div>
        <div 
          className="logo-color" 
          style={{ clipPath: `inset(${100 - fillHeight}% 0 0 0)` }}
        >
          <div className="logo-letter">D</div>
        </div>
        <div className="water-drop" style={{ height: `${fillHeight}%` }}></div>
      </div>
      
      <div className="loading-info">
        <div className="loading-brand">Catalogue Design</div>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${fillHeight}%` }}></div>
        </div>
        <div className="loading-percent">{fillHeight}%</div>
      </div>

      <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #1e0f1c 0%, #2a1625 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .logo-water-container {
          position: relative;
          width: 150px;
          height: 150px;
          margin-bottom: 40px;
        }
        
        .logo-bw {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #333;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #555;
        }
        
        .logo-color {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ca3c66 0%, #7aa95c 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: clip-path 0.1s linear;
          border: 3px solid #ca3c66;
        }
        
        .logo-letter {
          font-family: 'Modak', cursive;
          font-size: 80px;
          color: #fcffee;
        }
        
        .water-drop {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(180deg, rgba(202,60,102,0.3) 0%, rgba(122,169,92,0.1) 100%);
          border-radius: 0 0 50% 50%;
          transition: height 0.05s linear;
          pointer-events: none;
        }
        
        .loading-info {
          text-align: center;
          width: 250px;
        }
        
        .loading-brand {
          font-family: 'Modak', cursive;
          font-size: 1.3rem;
          color: #ca3c66;
          letter-spacing: 3px;
          margin-bottom: 20px;
        }
        
        .loading-bar-container {
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        
        .loading-bar {
          height: 100%;
          background: linear-gradient(90deg, #ca3c66, #7aa95c);
          border-radius: 3px;
          transition: width 0.05s linear;
        }
        
        .loading-percent {
          font-family: 'Quicksand', sans-serif;
          font-size: 0.8rem;
          color: rgba(252,255,238,0.7);
        }
      `}</style>
    </div>
  );
}