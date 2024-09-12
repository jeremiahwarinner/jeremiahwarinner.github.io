import React, { useState, useEffect } from 'react';

const TabNavigation = ({ tabs, activeTab, handleTabChange, tabRefs }) => {
  const [highlightStyle, setHighlightStyle] = useState({});

  useEffect(() => {
    const updateHighlight = () => {
      const currentTab = tabRefs.current[activeTab];
      if (currentTab) {
        const { offsetLeft, offsetWidth } = currentTab;
        setHighlightStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    };

    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [activeTab, tabRefs]);

  return (
    <nav className="border-t border-gray-700 mb-8 relative">
      <div
        className="absolute top-0 h-0.5 bg-purple-500 transition-all duration-300 ease-in-out"
        style={highlightStyle}
      />
      <ul className="flex justify-center space-x-12 -mt-px">
        {tabs.map((tab) => (
          <li
            key={tab.value}
            ref={el => tabRefs.current[tab.value] = el}
            className="pt-3"
          >
            <button
              onClick={() => handleTabChange(tab.value)}
              className={`flex items-center transition-colors duration-300 ${activeTab === tab.value ? 'text-purple-400' : 'text-gray-400'}`}
            >
              <tab.icon size={12} className="mr-1" />
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabNavigation;
