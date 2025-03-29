import React from 'react';

interface FontPreloaderProps {
  fonts: string[];
}

export const FontPreloader: React.FC<FontPreloaderProps> = ({ fonts }) => {
  return (
    <React.Fragment>
      {fonts.map((font) => (
        <link
          key={font}
          rel="preload"
          href={font}
          as="style"
        />
      ))}
    </React.Fragment>
  );
};

export const DefaultFontPreloader = () => {
  const fonts = [
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'
  ];

  return <FontPreloader fonts={fonts} />;
};
