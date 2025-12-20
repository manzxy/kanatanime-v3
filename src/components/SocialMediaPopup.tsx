import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebook, faGithub, faThreads } from '@fortawesome/free-brands-svg-icons';
import Button from './Button';

const SocialMediaPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const shouldHide = localStorage.getItem('kanata_hide_social_popup');
    if (!shouldHide) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('kanata_hide_social_popup', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#FFCC00] border-8 border-black p-6 md:p-10 max-w-lg w-full shadow-[16px_16px_0px_0px_#FF3B30] transform rotate-1 animate-in zoom-in-95 duration-300">

        {/* Decorative Header */}
        <div className="absolute -top-6 -left-6 bg-white border-4 border-black px-4 py-2 transform -rotate-3 shadow-[4px_4px_0px_0px_black] z-10">
          <span className="font-black text-black oswald text-xl">NOTICE!</span>
        </div>

        <div className="space-y-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black oswald uppercase leading-[0.9]">
            Join The<br />
            <span className="text-white text-stroke-black">Squad</span>
          </h2>

          <p className="font-bold text-black border-4 border-black bg-white p-4 text-sm md:text-base transform -rotate-1 shadow-[4px_4px_0px_0px_black]">
            Don't miss out on updates! Follow our social media channels to stay ahead of the update.
          </p>

          <div className="flex justify-center text-black gap-3 flex-wrap py-4">
            {[
              { icon: faWhatsapp, href: "https://whatsapp.com/channel/0029VagADOLLSmbaxFNswH1m", color: "bg-[#25D366]" },
              { icon: faInstagram, href: "https://instagram.com/kang.potokopi", color: "bg-[#E4405F]" },
              { icon: faFacebook, href: "https://facebook.com/kang.potokopi", color: "bg-[#1877F2]" },
              { icon: faGithub, href: "https://github.com/idlanyor", color: "bg-[#333]" },
              { icon: faThreads, href: "https://threads.net/kang.potokopi", color: "bg-[#000]" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`w-12 h-12 bg-white border-4 border-black flex items-center justify-center text-2xl transition-all shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] ${social.color}`}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Button
              variant="black"
              onClick={handleClose}
              className="w-full text-lg"
            >
              OK, COOL
            </Button>
            <Button
              variant="white"
              onClick={handleDontShowAgain}
              className="w-full text-xs md:text-sm"
            >
              DON'T SHOW AGAIN
            </Button>
          </div>
        </div>

        {/* Close X Button top right */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-[#FF3B30] border-4 border-black text-white font-black hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_black]"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SocialMediaPopup;
