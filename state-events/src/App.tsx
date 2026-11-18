import { useState, useEffect } from 'react';
import './App.css';
import { StateEventsLesson } from './StateEventsLesson';
import { ComponentCommunication } from './ComponentCommunication';

type ActivePage = 'state-events' | 'communication';

function App() {
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#communication') {
      return 'communication';
    }
    return 'communication'; // Default to the newly requested Component Communication or state-events
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#communication') {
        setActivePage('communication');
      } else if (window.location.hash === '#state-events') {
        setActivePage('state-events');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.location.hash = page === 'communication' ? 'communication' : 'state-events';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="lesson">
      {/* Top Header with navigation tabs */}
      <header className="header">
        <div className="header-brand">
          <span className="logo">R</span>
          <span className="header-title">React Lab</span>
        </div>

        <nav className="header-nav" aria-label="Lessons navigation">
          <button
            className={`header-tab ${activePage === 'state-events' ? 'active' : ''}`}
            onClick={() => navigateTo('state-events')}
          >
            ⚡ State & Events
          </button>
          <button
            className={`header-tab ${activePage === 'communication' ? 'active' : ''}`}
            onClick={() => navigateTo('communication')}
          >
            🔄 Component Communication
          </button>
        </nav>
      </header>

      {/* Render selected lesson */}
      {activePage === 'state-events' ? (
        <StateEventsLesson />
      ) : (
        <ComponentCommunication />
      )}
    </main>
  );
}

export default App;
