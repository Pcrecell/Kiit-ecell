
import EsummitNavbar from "../Navbar/EsummitNavbar";
import Footer from "../footer/Footer";
import { useEffect } from "react";

function ContactSection() {
  useEffect(() => {
    // Dynamically load leaflet CSS and JS
    const leafletCSS = document.createElement("link");
    leafletCSS.rel = "stylesheet";
    leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(leafletCSS);

    const leafletScript = document.createElement("script");
    leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    leafletScript.async = true;
    leafletScript.onload = () => {
      // Initialize map after leaflet loads
      const L = window.L;
      if (!L) return;
      const map = L.map("vintage-map", {
        zoomControl: true,
        attributionControl: false,
      });

      // Use real-world map tiles (OpenStreetMap) over parchment background
      // Set up map with default CRS (not Simple)
      map.setView([20.3534, 85.8195], 16);

      // Add parchment background as a custom div under the map tiles
      const mapContainer = document.getElementById("vintage-map");
      if (mapContainer) {
        // Use a brownish overlay instead of black
        mapContainer.style.backgroundImage =
          "linear-gradient(rgba(102, 51, 0, 0.35), rgba(102, 51, 0, 0.35)), url('https://i.ibb.co/8Dx532tD/grunge-paper-background-1-1.jpg')";
        mapContainer.style.backgroundSize = "cover";
        mapContainer.style.backgroundPosition = "center";
      }

      // Add semi-transparent map tiles for squiggles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.45,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Remove shopping mart and hospital overlays if present (for custom overlays, not OSM raster tiles)
      // OSM raster tiles cannot have POIs disabled, but if any custom overlays are present, remove them
      // Remove any markers with alt text containing hospital, pharmacy, shop, market, supermarket
      setTimeout(() => {
        const markerIcons = document.querySelectorAll('.leaflet-marker-icon');
        markerIcons.forEach(icon => {
          const alt = icon.getAttribute('alt') || '';
          if (/hospital|pharmacy|shop|market|supermarket/i.test(alt)) {
            icon.style.display = 'none';
          }
        });
      }, 500);

      // Example: Add a marker (custom icon for vintage look)
      const icon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616494.png", // vintage marker
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      L.marker([20.3534, 85.8195], { icon }).addTo(map)
        .bindPopup("You are here! 🏴‍☠️");

      // Pinpoint marker at specified coordinates
      const pinpointIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Pinpoint icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      L.marker([20.3534, 85.8195], { icon: pinpointIcon }).addTo(map)
        .bindPopup("Pinpoint Location!<br>20.3534, 85.8195");
    };
    document.body.appendChild(leafletScript);
    return () => {
      // Cleanup
      document.getElementById("vintage-map")?.remove();
      leafletCSS.remove();
      leafletScript.remove();
      // No style element to remove
    };
  }, []);

  return (
    <div className="contactus-root">
      <div id="vintage-map" className="contactus-map"></div>
      <div className="contactus-right">
        <div className="contactus-card">
          <h2 className="contactus-title">Contact with Us</h2>
          <form className="contactus-form">
            <div className="contactus-form-row">
              <div className="contactus-form-group">
                <label>Name</label>
                <input type="text" />
              </div>
              <div className="contactus-form-group">
                <label>Phone No.</label>
                <input type="text" />
              </div>
            </div>
            <div className="contactus-form-group">
              <label>Email address</label>
              <input type="email" />
            </div>
            <div className="contactus-form-group">
              <label>Message</label>
              <textarea rows={4} />
            </div>
          </form>
          <div className="contactus-info">
            <div className="contactus-info-title">CONTACT INFORMATION</div>
            <div className="contactus-info-list">
              <div className="contactus-info-item">
                <span className="contactus-info-icon"> <svg width="1.3em" height="1.3em" viewBox="0 0 24 24" fill="#e6c97b" style={{verticalAlign:'middle'}}><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"></path></svg></span>
                <span>+91-8543908909</span>
              </div>
              <div className="contactus-info-item">
                <span className="contactus-info-icon"><svg width="1.3em" height="1.3em" viewBox="0 0 24 24" fill="#e6c97b" style={{verticalAlign:'middle'}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg></span>
                <span>Kiit University,<br/>Patia, Bhubaneswar</span>
              </div>
              <div className="contactus-info-item">
                <span className="contactus-info-icon"><svg width="1.3em" height="1.3em" viewBox="0 0 24 24" fill="#e6c97b" style={{verticalAlign:'middle'}}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg></span>
                <span>pcr.ecell@kiit.ac.in</span>
              </div>
              <div className="contactus-info-item">
                <span className="contactus-info-icon"><svg width="1.3em" height="1.3em" viewBox="0 0 24 24" fill="#e6c97b" style={{verticalAlign:'middle'}}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16.5 8h-9A.5.5 0 0 0 7 8.5v7a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5zm-4.25 6.25h-1.5v-4.5h1.5v4.5zm2.25 0h-1.5v-4.5h1.5v4.5z" fill="#a67c52"/></svg></span>
                <span>KIIT E-Cell</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <>
      <EsummitNavbar />
      <ContactSection />
      <Footer />
    </>
  );
}

// Responsive styles for ContactUs page
const style = document.createElement('style');
style.innerHTML = `
.contactus-root {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background: #f5e6c4;
  overflow: hidden;
}
.contactus-map {
  width: 65vw;
  height: 100vh;
  border-right: 8px solid #a67c52;
  box-shadow: 0 0 40px #a67c52 inset;
  border-radius: 0 24px 24px 0;
  background: #f5e6c4;
  min-width: 300px;
}
.contactus-right {
  width: 35vw;
  min-width: 320px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5e6c4;
}
.contactus-card {
  width: 90%;
  background: #fbe2b7;
  border: 4px solid #a67c52;
  border-radius: 12px;
  padding: 2.5vw 2vw;
  box-shadow: 0 0 24px #a67c5233;
  font-family: serif;
  max-width: 500px;
}
.contactus-title {
  text-align: center;
  font-size: 2vw;
  font-weight: 600;
  margin-bottom: 2vw;
  color: #6b3f13;
  font-family: serif;
}
.contactus-form {
  width: 100%;
}
.contactus-form-row {
  display: flex;
  gap: 1vw;
  margin-bottom: 1vw;
  flex-wrap: wrap;
}
.contactus-form-group {
  flex: 1;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1vw;
}
.contactus-form-group label {
  color: #6b3f13;
  font-size: 1vw;
  margin-bottom: 0.2vw;
}
.contactus-form-group input,
.contactus-form-group textarea {
  width: 100%;
  border: 2px solid #a67c52;
  border-radius: 16px;
  padding: 0.5vw 1vw;
  font-size: 1vw;
  background: none;
  color: #6b3f13;
  margin-bottom: 0.5vw;
  resize: none;
}
.contactus-info {
  background: #a67c52;
  border-radius: 20px;
  border: 2px solid #6b3f13;
  padding: 2vw 2vw 1.5vw 2vw;
  margin-top: 2vw;
  color: #fff;
  font-size: 1vw;
  box-shadow: 0 2px 8px #a67c5233;
  width: 100%;
  max-width: 100%;
}
.contactus-info-title {
  font-weight: 600;
  margin-bottom: 1vw;
  font-size: 1.2vw;
  color: #fff;
  font-family: serif;
  letter-spacing: 0.5px;
}
.contactus-info-list {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}
.contactus-info-item {
  display: flex;
  align-items: center;
  color: #fbe2b7;
  font-family: serif;
  font-size: 1.1vw;
  gap: 0.7vw;
}
.contactus-info-icon {
  font-size: 1.3vw;
  margin-right: 0.7vw;
  display: flex;
  align-items: center;
}
@media (max-width: 900px) {
  .contactus-root {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  .contactus-map {
    width: 100vw;
    height: 40vh;
    border-radius: 0 0 24px 24px;
    border-right: none;
    border-bottom: 8px solid #a67c52;
    min-width: unset;
  }
  .contactus-right {
    width: 100vw;
    min-width: unset;
    height: auto;
    padding-bottom: 2vw;
  }
  .contactus-card {
    max-width: 98vw;
    padding: 4vw 2vw;
  }
  .contactus-title {
    font-size: 4vw;
  }
  .contactus-info-title {
    font-size: 2vw;
  }
  .contactus-info-item, .contactus-info {
    font-size: 2vw;
  }
  .contactus-form-group label, .contactus-form-group input, .contactus-form-group textarea {
    font-size: 2vw;
  }
}
@media (max-width: 600px) {
  .contactus-card {
    padding: 6vw 2vw;
  }
  .contactus-title {
    font-size: 6vw;
  }
  .contactus-info-title {
    font-size: 3vw;
  }
  .contactus-info-item, .contactus-info {
    font-size: 3vw;
  }
  .contactus-form-group label, .contactus-form-group input, .contactus-form-group textarea {
    font-size: 3vw;
  }
}
`;
if (!document.head.querySelector('style[data-contactus]')) {
  style.setAttribute('data-contactus', 'true');
  document.head.appendChild(style);
}

export default App;