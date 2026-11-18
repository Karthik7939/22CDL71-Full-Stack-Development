import { useState, createContext, useContext } from 'react';

// --- Types ---
type CommDemoName = 'parent-to-child' | 'child-to-parent' | 'siblings' | 'context';
type CodeRole = 'parent' | 'child';

interface CommDemoInfo {
  title: string;
  badge: string;
  description: {
    title: string;
    whatIsIt: string;
    howItWorks: string;
    keyRule: string;
  };
}

const commDemos: Record<CommDemoName, CommDemoInfo> = {
  'parent-to-child': {
    title: '1. Parent → Child',
    badge: 'PROPS',
    description: {
      title: 'Parent to Child Communication (Props)',
      whatIsIt: 'This is the most common and fundamental way components communicate in React. The parent component passes data down to its child component using attributes called "props".',
      howItWorks: 'The parent holds a value in state and passes it like an HTML attribute: <Child text={message} />. The child receives it as a function argument and displays it.',
      keyRule: 'Props are strictly read-only (immutable). A child component can display the prop, but cannot change it.',
    },
  },
  'child-to-parent': {
    title: '2. Child → Parent',
    badge: 'CALLBACKS',
    description: {
      title: 'Child to Parent Communication (Callback Functions)',
      whatIsIt: 'In React, data cannot flow upwards by itself. To let a child communicate with its parent, the parent provides a function (callback) to the child.',
      howItWorks: 'The parent passes a function prop: <Child onIncrement={handleIncrement} />. When a button inside the child is clicked, the child calls onIncrement(), which runs the parent\'s function and updates the parent\'s state.',
      keyRule: 'Data flows down via props; events flow up via callback functions.',
    },
  },
  'siblings': {
    title: '3. Sibling ↔ Sibling',
    badge: 'LIFT STATE',
    description: {
      title: 'Sibling to Sibling Communication (Lifting State Up)',
      whatIsIt: 'Two sibling components have no direct connection to each other. To share information, we "lift" the shared state up to their closest common parent.',
      howItWorks: 'Sibling A takes user input and calls a parent callback to update the parent\'s state. The parent then passes that updated state down to Sibling B as a prop.',
      keyRule: 'When two components need to stay in sync, move their shared state to their common ancestor.',
    },
  },
  'context': {
    title: '4. Context API',
    badge: 'USECONTEXT',
    description: {
      title: 'Global Communication (Context API)',
      whatIsIt: 'When a piece of state is needed by deeply nested components across the app (like a theme or logged-in user), passing props through 5 or 6 intermediate layers is tedious ("prop drilling"). Context solves this.',
      howItWorks: '1. Create a context with createContext(). 2. Wrap components with <ThemeContext.Provider value={theme}>. 3. Any descendant calls useContext(ThemeContext) to read the value directly.',
      keyRule: 'Context broadcasts data globally to any child in the tree without touching intermediate components.',
    },
  },
};

// Simple Context for Demo 4
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ComponentCommunication() {
  const [selectedDemo, setSelectedDemo] = useState<CommDemoName>('parent-to-child');
  const [activeCodeRole, setActiveCodeRole] = useState<CodeRole>('parent');

  // --- Simplified Demo 1: Parent to Child ---
  const [parentMessage, setParentMessage] = useState('Hello from Parent!');

  // --- Simplified Demo 2: Child to Parent ---
  const [parentCount, setParentCount] = useState(0);

  // --- Simplified Demo 3: Sibling to Sibling ---
  const [sharedText, setSharedText] = useState('React is fun');

  // --- Simplified Demo 4: Context API ---
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Code snippets per demo (ultra clear, separated Parent vs Child)
  const codeByDemo = {
    'parent-to-child': {
      parent: {
        fileName: 'Parent.jsx',
        label: '👨‍👧 Parent Component',
        desc: 'Holds the message state and passes it as a prop',
        lines: [
          'import { useState } from "react";',
          'import { Child } from "./Child";',
          '',
          'export function Parent() {',
          '  const [message, setMessage] = useState("Hello from Parent!");',
          '',
          '  return (',
          '    <div>',
          '      {/* Pass data down to child via prop */}',
          '      <Child text={message} />',
          '    </div>',
          '  );',
          '}',
        ],
        activeLine: 10,
      },
      child: {
        fileName: 'Child.jsx',
        label: '👶 Child Component',
        desc: 'Receives the "text" prop and displays it',
        lines: [
          '// Props arrive as the component function argument.',
          'export function Child({ text }) {',
          '  return (',
          '    <div className="child-box">',
          '      <p>Received from Parent: {text}</p>',
          '    </div>',
          '  );',
          '}',
        ],
        activeLine: 5,
      },
    },

    'child-to-parent': {
      parent: {
        fileName: 'Parent.jsx',
        label: '👨‍👧 Parent Component',
        desc: 'Holds the count state and passes down an increment function',
        lines: [
          'import { useState } from "react";',
          'import { ChildButton } from "./ChildButton";',
          '',
          'export function Parent() {',
          '  const [count, setCount] = useState(0);',
          '',
          '  return (',
          '    <div>',
          '      <h2>Count in Parent: {count}</h2>',
          '      {/* Pass callback function to Child */}',
          '      <ChildButton onIncrement={() => setCount(count + 1)} />',
          '    </div>',
          '  );',
          '}',
        ],
        activeLine: 11,
      },
      child: {
        fileName: 'ChildButton.jsx',
        label: '👶 Child Component',
        desc: 'Calls the parent\'s onIncrement function when clicked',
        lines: [
          '// onIncrement is a callback prop from the parent.',
          'export function ChildButton({ onIncrement }) {',
          '  return (',
          '    // Calling the parent\'s function when clicked',
          '    <button onClick={onIncrement}>',
          '      Click Me (+1)',
          '    </button>',
          '  );',
          '}',
        ],
        activeLine: 5,
      },
    },

    'siblings': {
      parent: {
        fileName: 'Parent.jsx',
        label: '👨‍👧 Common Parent (Coordinator)',
        desc: 'Lifts shared state up and connects both siblings',
        lines: [
          'import { useState } from "react";',
          'import { SiblingInput } from "./SiblingInput";',
          'import { SiblingDisplay } from "./SiblingDisplay";',
          '',
          'export function Parent() {',
          '  // Lifted state lives in common parent',
          '  const [text, setText] = useState("React is fun");',
          '',
          '  return (',
          '    <div>',
          '      {/* Sibling A updates parent state */}',
          '      <SiblingInput value={text} onChange={setText} />',
          '',
          '      {/* Sibling B receives updated state as a prop */}',
          '      <SiblingDisplay message={text} />',
          '    </div>',
          '  );',
          '}',
        ],
        activeLine: 11,
      },
      child: {
        fileName: 'SiblingComponents.jsx',
        label: '👶 Sibling Components (A & B)',
        desc: 'Sibling A changes the text; Sibling B displays it',
        lines: [
          '// Sibling A: Input controller',
          'export function SiblingInput({ value, onChange }) {',
          '  return (',
          '    <input',
          '      value={value}',
          '      onChange={(e) => onChange(e.target.value)}',
          '      placeholder="Type here..."',
          '    />',
          '  );',
          '}',
          '',
          '// Sibling B: Presentational display',
          'export function SiblingDisplay({ message }) {',
          '  return <h3>You typed: {message.toUpperCase()}</h3>;',
          '}',
        ],
        activeLine: 5,
      },
    },

    'context': {
      parent: {
        fileName: 'App.jsx (Provider)',
        label: '🌐 Context Provider (Parent)',
        desc: 'Broadcasts the theme value to the entire component tree',
        lines: [
          'import { useState, createContext } from "react";',
          'import { DeepChild } from "./DeepChild";',
          '',
          '// 1. Create the Context',
          'export const ThemeContext = createContext({',
          '  theme: "light",',
          '  toggleTheme: () => {},',
          '});',
          '',
          'export function App() {',
          '  const [theme, setTheme] = useState("light");',
          '  const toggleTheme = () => setTheme((currentTheme) =>',
          '    currentTheme === "light" ? "dark" : "light"',
          '  );',
          '',
          '  return (',
          '    // 2. Wrap tree with Provider (no prop drilling!)',
          '    <ThemeContext.Provider value={{ theme, toggleTheme }}>',
          '      <MiddleLayout />',
          '    </ThemeContext.Provider>',
          '  );',
          '}',
        ],
        activeLine: 18,
      },
      child: {
        fileName: 'DeepChild.jsx (Consumer)',
        label: '🎯 Deep Child (Consumer)',
        desc: 'Reads theme directly from context using the useContext hook',
        lines: [
          'import { useContext } from "react";',
          'import { ThemeContext } from "./App";',
          '',
          'export function DeepChild() {',
          '  // 3. Read context directly anywhere in the tree',
          '  const { theme, toggleTheme } = useContext(ThemeContext);',
          '',
          '  return (',
          '    <div className={`box ${theme}`}>',
          '      <p>Active Theme: {theme}</p>',
          '      <button onClick={toggleTheme}>Toggle Theme</button>',
          '    </div>',
          '  );',
          '}',
        ],
        activeLine: 6,
      },
    },


  };

  const currentInfo = commDemos[selectedDemo];
  const currentDemoCode = codeByDemo[selectedDemo];
  const activeCodeFile = activeCodeRole === 'parent' ? currentDemoCode.parent : currentDemoCode.child;

  return (
    <section className="lesson-content">
      {/* Introduction */}
      <div className="intro">
        <p className="eyebrow">REACT CORE FUNDAMENTALS</p>
        <h1>Component Communication</h1>
        <p>
          In React, components are isolated by default. To make them work together, React provides 
          clear patterns for passing data between them:
        </p>
        <p className="props-definition"><strong>Props</strong> are read-only values a parent component passes to a child, letting the child display data or receive a callback.</p>

        {/* Vertical Topic List: Listed one below the other */}
        <ul className="vertical-topic-list" aria-label="Component Communication Types">
          <li className="vertical-topic-item">
            <span className="topic-name">Parent → Child</span>
            <span className="topic-desc">read-only props (downwards)</span>
          </li>
          <li className="vertical-topic-item">
            <span className="topic-name">Child → Parent</span>
            <span className="topic-desc">callback events (upwards)</span>
          </li>
          <li className="vertical-topic-item">
            <span className="topic-name">Sibling ↔ Sibling</span>
            <span className="topic-desc">lifting state to shared parent</span>
          </li>
          <li className="vertical-topic-item">
            <span className="topic-name">Context API</span>
            <span className="topic-desc">broadcast without prop drilling</span>
          </li>
        </ul>
      </div>

      {/* Navigation Tabs */}
      <nav className="demo-nav" aria-label="Component Communication Demos">
        {(Object.keys(commDemos) as CommDemoName[]).map((key) => (
          <button
            key={key}
            className={`nav-button ${selectedDemo === key ? 'selected' : ''}`}
            onClick={() => {
              setSelectedDemo(key);
              setActiveCodeRole('parent');
            }}
          >
            {commDemos[key].title}
          </button>
        ))}
      </nav>

      {/* Interactive Split Layout */}
      <div className="demo-layout">
        {/* Left Panel: Simple Live Demo */}
        <section className="panel demo-panel" aria-label={`${currentInfo.title} live demo`}>
          <div className="panel-title">
            <span>{currentInfo.title}</span>
            <span className="live-dot">LIVE DEMO</span>
          </div>

          <div className="simple-demo-body">
            {/* 1. Parent to Child */}
            {selectedDemo === 'parent-to-child' && (
              <div className="simple-widget">
                <div className="component-box parent-box">
                  <div className="box-badge">👨‍👧 Parent Component</div>
                  <label className="box-label">Type a message in Parent:</label>
                  <input
                    type="text"
                    className="event-input"
                    value={parentMessage}
                    onChange={(e) => setParentMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                </div>

                <div className="simple-arrow">
                  <span>⬇️ Passes via prop: <code>text="{parentMessage}"</code></span>
                </div>

                <div className="component-box child-box">
                  <div className="box-badge child-badge-color">👶 Child Component</div>
                  <p className="box-label">Child displays the received prop:</p>
                  <div className="received-display">
                    "{parentMessage || '(empty)'}"
                  </div>
                </div>
              </div>
            )}

            {/* 2. Child to Parent */}
            {selectedDemo === 'child-to-parent' && (
              <div className="simple-widget">
                <div className="component-box parent-box">
                  <div className="box-badge">👨‍👧 Parent Component</div>
                  <p className="box-label">Count stored in Parent State:</p>
                  <div className="count-display">{parentCount}</div>
                  <button
                    className="button secondary"
                    style={{ height: '34px', fontSize: '12px', marginTop: '8px' }}
                    onClick={() => setParentCount(0)}
                  >
                    Reset Count
                  </button>
                </div>

                <div className="simple-arrow">
                  <span>⬆️ Child invokes parent callback: <code>onIncrement()</code></span>
                </div>

                <div className="component-box child-box">
                  <div className="box-badge child-badge-color">👶 Child Component</div>
                  <p className="box-label">Clicking button triggers the callback:</p>
                  <button
                    className="button primary"
                    style={{ width: '100%', height: '46px', fontSize: '15px' }}
                    onClick={() => setParentCount((c) => c + 1)}
                  >
                    + Click Me (+1)
                  </button>
                </div>
              </div>
            )}

            {/* 3. Sibling to Sibling */}
            {selectedDemo === 'siblings' && (
              <div className="simple-widget">
                <div className="component-box parent-box" style={{ background: '#f8fafc' }}>
                  <div className="box-badge">👨‍👧 Common Parent (holds lifted state)</div>
                  <p className="box-label" style={{ margin: '4px 0' }}>State: <code>"{sharedText}"</code></p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                  {/* Sibling A */}
                  <div className="component-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                    <div className="box-badge" style={{ background: '#16a34a' }}>👦 Sibling A (Input)</div>
                    <label className="box-label">Type text:</label>
                    <input
                      type="text"
                      className="event-input"
                      value={sharedText}
                      onChange={(e) => setSharedText(e.target.value)}
                    />
                  </div>

                  {/* Sibling B */}
                  <div className="component-box" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
                    <div className="box-badge" style={{ background: '#2563eb' }}>👧 Sibling B (Display)</div>
                    <p className="box-label">Uppercase preview:</p>
                    <div className="received-display" style={{ fontSize: '14px', padding: '10px' }}>
                      {sharedText.toUpperCase() || '...'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Context API */}
            {selectedDemo === 'context' && (
              <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') }}>
                <div className="simple-widget">
                  <div className="component-box parent-box">
                    <div className="box-badge">🌐 ThemeContext.Provider (Top Level)</div>
                    <p className="box-label">Active Broadcast Theme: <strong>{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</strong></p>
                  </div>

                  <div className="simple-arrow">
                    <span>⚡ Bypasses intermediate layout components (No prop drilling!) ⚡</span>
                  </div>

                  <SimpleContextChild />
                </div>
              </ThemeContext.Provider>
            )}

          </div>
        </section>

        {/* Right Panel: Code Section with Separate Parent and Child Tabs */}
        <section className="panel code-panel" aria-label="Source code">
          <div className="panel-title code-panel-header">
            <div className="code-role-tabs">
              <button
                className={`role-tab ${activeCodeRole === 'parent' ? 'active' : ''}`}
                onClick={() => setActiveCodeRole('parent')}
              >
                {currentDemoCode.parent.label}
              </button>
              <button
                className={`role-tab ${activeCodeRole === 'child' ? 'active' : ''}`}
                onClick={() => setActiveCodeRole('child')}
              >
                {currentDemoCode.child.label}
              </button>
            </div>
            <span className="code-label">{currentInfo.badge}</span>
          </div>

          <div className="code-file-banner">
            <span>📄 {activeCodeFile.fileName}</span>
            <span>{activeCodeFile.desc}</span>
          </div>

          <pre className="code-block"><code>{activeCodeFile.lines.map((line, idx) => (
            <span key={idx} className={`code-line ${activeCodeFile.activeLine === idx + 1 ? 'active' : ''}`}>
              <span className="line-number">{idx + 1}</span>{line || ' '}
            </span>
          ))}</code></pre>

          <p className="code-caption">
            <span className="legend" /> Line {activeCodeFile.activeLine} in <strong>{activeCodeFile.fileName}</strong> demonstrates this step.
          </p>
        </section>
      </div>

      {/* Description Below the Concept */}
      <div className="concept-explanation-card">
        <div className="concept-header">
          <span className="concept-tag">CONCEPT GUIDE</span>
          <h2>{currentInfo.description.title}</h2>
        </div>

        <div className="concept-grid">
          <div className="concept-item">
            <strong>📌 What is it?</strong>
            <p>{currentInfo.description.whatIsIt}</p>
          </div>

          <div className="concept-item">
            <strong>⚙️ How it works in code</strong>
            <p>{currentInfo.description.howItWorks}</p>
          </div>

          <div className="concept-item">
            <strong>⚠️ Golden Rule to Remember</strong>
            <p>{currentInfo.description.keyRule}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper Child for Context Demo
function SimpleContextChild() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <div
      className="component-box child-box"
      style={{
        background: isDark ? '#1e293b' : '#f8fafc',
        color: isDark ? '#f8fafc' : '#1e293b',
        borderColor: isDark ? '#475569' : '#cbd5e1',
        transition: 'all 0.2s',
      }}
    >
      <div className="box-badge child-badge-color">🎯 Deep Child (Consumer)</div>
      <p className="box-label" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
        Reads theme directly via <code>useContext()</code>:
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
        <span style={{ fontSize: '18px', fontWeight: 700 }}>
          {isDark ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
        </span>
        <button className="button primary" style={{ height: '38px' }} onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

