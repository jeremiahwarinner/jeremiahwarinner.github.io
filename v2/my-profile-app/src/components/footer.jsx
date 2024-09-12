import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Built with: 
          <span className="font-semibold"> React.js</span>,
          <span className="font-semibold"> SQLite</span>,
          <span className="font-semibold"> Python Flask</span>,
          <span className="font-semibold"> Heroku</span>, and
          <span className="font-semibold"> Vercel</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;