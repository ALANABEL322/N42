import { useEffect } from 'react';

const DEFAULT_FONTS = [
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
];

export const DefaultFontPreloader = () => {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    DEFAULT_FONTS.forEach(fontUrl => {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);

  return null;
};
