import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  // --- BILDEOPPLASTING ---
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleMenuClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // --- REDIGERBAR TEKST ---
  const [name, setName] = useState("Rasmus Renneflott Thorkildsen (24)");
  const [dob, setDob] = useState("23.02.2002");
  const [studentNum, setStudentNum] = useState("385392");
  const [school, setSchool] = useState("OsloMet - storbyuniversitetet");

  // --- DYNAMISK TID & DATO ---
  const [lastUpdated, setLastUpdated] = useState("");
  const [timeZone, setTimeZone] = useState("");

  // --- KONTROLL-ANIMASJON ---
  const [isChecking, setIsChecking] = useState(false);

  const handleKontrollClick = () => {
    if (isChecking) return; // Forhindrer at man kan trykke flere ganger mens den allerede blinker
    setIsChecking(true);
    
    // Slår av blinkingen igjen etter nøyaktig 4 sekunder
    setTimeout(() => {
      setIsChecking(false);
    }, 3000);
  };

  useEffect(() => {
    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const isSummerTime = now.getTimezoneOffset() < -60;
    const tzString = isSummerTime ? "CEST" : "CET";

    setLastUpdated(`${day}.${month}.${year} kl. ${hours}:${minutes} (${tzString})`);
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center font-sans pb-10 w-full">
        
        {/* Header */}
        <div className="sticky top-0 z-50 w-full bg-[#f4efff] border-b border-[#714dff] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center h-6 mt-2">
            <img 
              src="https://www.cessda.eu/Images/Service-provider-logos/392/image-thumb__392__serviceprovider/Sikt-Norwegian-Agency-for-Shared-Services-in-Education-and-Research.png" 
              alt="Sikt Logo" 
              className="h-full w-auto object-contain" 
            />
          </div>
          <div 
            className="text-[#714dff] font-bold tracking-widest text-xl mb-2 cursor-pointer p-2"
            onClick={handleMenuClick}
          >
            ⋮
          </div>
        </div>

        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />

        {/* Profilbilde */}
        <div className="mt-8 mb-6">
          <img 
            src={profileImage || "https://via.placeholder.com/150/d1d5db/d1d5db"} 
            alt="Profilbilde" 
            className="w-28 h-28 rounded-full object-cover bg-gray-300"
          />
        </div>

        {/* Info-kort */}
        <div className="w-11/12 max-w-md bg-[#efeaff] border border-[#714dff] rounded-2xl p-5 mb-4 shadow-sm flex flex-col">
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-[17px] font-medium text-black mb-4 bg-transparent outline-none w-full"
          />
          
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 text-[14px]">
              <svg className="w-5 h-5 text-gray-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span className="font-semibold text-black shrink-0">Fødselsdato:</span>
              <input 
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="text-gray-800 bg-transparent outline-none w-full"
              />
            </div>
            
            <div className="flex items-center gap-3 text-[14px]">
              <svg className="w-5 h-5 text-gray-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span className="font-semibold text-black shrink-0">Studentnummer:</span>
              <input 
                type="text"
                value={studentNum}
                onChange={(e) => setStudentNum(e.target.value)}
                className="text-gray-800 bg-transparent outline-none w-full"
              />
            </div>
            
            <div className="flex items-center gap-3 text-[14px]">
              <svg className="w-5 h-5 text-gray-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6"></path></svg>
              <span className="font-semibold text-black shrink-0">Studiested:</span>
              <input 
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="text-gray-800 bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Status-kort (Blinker når Kontroll trykkes) */}
        <div className={`w-11/12 max-w-md border border-[#1a5c38] rounded-2xl p-5 mb-6 text-center shadow-sm ${isChecking ? 'animate-status-flash' : 'bg-[#bbf0d4]'}`}>
          {/* Fjerner de faste tekstfargene midlertidig mens den sjekker, slik at den arver hvit tekst fra CSS-animasjonen */}
          <h3 className={`text-xl font-medium mb-1 ${!isChecking ? 'text-black' : ''}`}>Gyldig studentbevis</h3>
          <p className={`text-[14px] mb-1 ${!isChecking ? 'text-gray-800' : ''}`}>Vår 2026</p>
          <p className={`text-[14px] ${!isChecking ? 'text-gray-900' : ''}`}><span className="font-semibold">Utløper:</span> 31.08.2026</p>
        </div>

        {/* Kontroll-knapp */}
        <button 
          onClick={handleKontrollClick}
          className={`w-11/12 max-w-md rounded-full py-3.5 mb-3 font-medium text-[16px] transition-colors ${
            isChecking 
              ? 'bg-[#b4a6f4] text-white cursor-default' /* Lys lilla når den sjekker */
              : 'bg-[#714dff] hover:bg-[#5b3ce0] text-white' /* Vanlig lilla ellers */
          }`}
        >
          Kontroll
        </button>

        <button className="w-11/12 max-w-md bg-transparent border border-[#714dff] text-black rounded-full py-3.5 mb-8 font-medium text-[16px] flex items-center justify-center gap-2 hover:bg-[#efeaff] transition-colors">
          Europeisk studentbevis
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
        </button>

        {/* Dynamisk Footer */}
        <div className="flex flex-col items-center gap-3 text-[12px] text-gray-800">
          <p><span className="font-bold text-black">Sist oppdatert:</span> {lastUpdated}</p>
          <p><span className="font-bold text-black">Tidssone:</span> {timeZone}</p>
          <p><span className="font-bold text-black">Versjon:</span> 4.2.2</p>
        </div>

      </div>
    </>
  );
}

export default App;