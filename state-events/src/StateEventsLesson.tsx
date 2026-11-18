import { useState, type FormEvent } from 'react';

type DemoName = 'counter' | 'text' | 'toggle';

const demos: Record<DemoName, { title: string }> = {
  counter: { title: 'Counter' },
  text: { title: 'Text content' },
  toggle: { title: 'Toggle' },
};

function EventCode({ lines, activeLine }: { lines: string[]; activeLine: number }) {
  return (
    <pre className="event-code"><code>{lines.map((line, index) => (
      <span key={index} className={`event-code-line ${activeLine === index + 1 ? 'active' : ''}`}>
        <span className="line-number">{index + 1}</span>{line}
      </span>
    ))}</code></pre>
  );
}

export function StateEventsLesson() {
  const [demo, setDemo] = useState<DemoName>('counter');

  // Counter state
  const [count, setCount] = useState(0);
  const [counterLine, setCounterLine] = useState(1);
  const [counterAction, setCounterAction] = useState('State starts at 0.');

  // Text state
  const [message, setMessage] = useState('Hello, React!');
  const [textLine, setTextLine] = useState(1);
  const [textAction, setTextAction] = useState('The message is stored in state.');

  // Toggle state
  const [isOn, setIsOn] = useState(false);
  const [toggleLine, setToggleLine] = useState(1);
  const [toggleAction, setToggleAction] = useState('The toggle starts off.');

  // Event examples
  const [clicks, setClicks] = useState(0);
  const [clickLine, setClickLine] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [inputLine, setInputLine] = useState(0);
  const [task, setTask] = useState('');
  const [submittedTask, setSubmittedTask] = useState('');
  const [formLine, setFormLine] = useState(0);

  const codeByDemo: Record<DemoName, string[]> = {
    counter: [
      'const [count, setCount] = useState(0);',
      '',
      'return (',
      '  <button onClick={() => setCount(count + 1)}>+</button>',
      '  <button onClick={() => setCount(count - 1)}>-</button>',
      '  <button onClick={() => setCount(0)}>Reset</button>',
      '  <p>{count}</p>',
      ');',
    ],
    text: [
      "const [message, setMessage] = useState('Hello, React!');",
      '',
      'return (',
      "  <button onClick={() => setMessage('Welcome!')}>",
      '    Change message',
      '  </button>',
      '  <p>{message}</p>',
      ');',
    ],
    toggle: [
      'const [isOn, setIsOn] = useState(false);',
      '',
      'return (',
      '  <div className={isOn ? "dark" : "light"}>',
      '    <p>{isOn ? "Dark mode" : "Light mode"}</p>',
      '    <button onClick={() => setIsOn(!isOn)}>Toggle</button>',
      '  </div>',
      ');',
    ],
  };

  const activeLine = demo === 'counter' ? counterLine : demo === 'text' ? textLine : toggleLine;
  const action = demo === 'counter' ? counterAction : demo === 'text' ? textAction : toggleAction;

  function selectDemo(name: DemoName) {
    setDemo(name);
  }

  function changeMessage() {
    const nextMessage = message === 'Hello, React!' ? 'Welcome!' : 'Hello, React!';
    setMessage(nextMessage);
    setTextLine(4);
    setTextAction(`Button clicked: setMessage updates the text to “${nextMessage}”.`);
  }

  function toggle() {
    const nextValue = !isOn;
    setIsOn(nextValue);
    setToggleLine(6);
    setToggleAction(`Button clicked: ${nextValue ? 'dark mode is on' : 'light mode is on'}.`);
  }

  function submitTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!task.trim()) return;
    setSubmittedTask(task.trim());
    setTask('');
    setFormLine(4);
  }

  return (
    <>
      <section className="lesson-content">
        <div className="intro">
          <p className="eyebrow">REACT CORE FUNDAMENTALS</p>
          <h1>States</h1>
          <p>State is information a component stores between renders, such as a counter value or message. When you update state with its setter function, React renders the component again so the screen reflects the new value.</p>
          <ul className="topic-list" aria-label="State concepts">
            <li><code>useState</code><span>creates state</span></li>
            <li><code>state value</code><span>stores current data</span></li>
            <li><code>setter function</code><span>updates the data</span></li>
          </ul>
        </div>

        <nav className="demo-nav" aria-label="State demonstrations">
          {(Object.keys(demos) as DemoName[]).map((name) => (
            <button key={name} className={`nav-button ${demo === name ? 'selected' : ''}`} onClick={() => selectDemo(name)} aria-current={demo === name ? 'page' : undefined}>
              {demos[name].title}
            </button>
          ))}
        </nav>

        <div className="demo-layout">
          <section className={`panel demo-panel ${demo === 'toggle' && isOn ? 'theme-dark' : ''}`} aria-label={`${demos[demo].title} demonstration`}>
            <div className="panel-title"><span>Live demo</span><span className="live-dot">LIVE</span></div>

            {demo === 'counter' && <>
              <div className="count" aria-live="polite">{count}</div>
              <div className="controls">
                <button className="button secondary" onClick={() => { setCount(count - 1); setCounterLine(5); setCounterAction('Decrease clicked: setCount subtracts 1 from the count.'); }} aria-label="Decrease count">−</button>
                <button className="button primary" onClick={() => { setCount(count + 1); setCounterLine(4); setCounterAction('Increase clicked: setCount adds 1 to the count.'); }}>Increase <span>+</span></button>
                <button className="button secondary reset" onClick={() => { setCount(0); setCounterLine(6); setCounterAction('Reset clicked: setCount sets the count back to 0.'); }}>Reset</button>
              </div>
            </>}

            {demo === 'text' && <>
              <div className="text-demo-value" aria-live="polite">{message}</div>
              <div className="single-control">
                <button className="button primary" onClick={changeMessage}>Change message <span>↻</span></button>
              </div>
            </>}

            {demo === 'toggle' && <>
              <div className={`toggle-demo-value ${isOn ? 'on' : ''}`} aria-live="polite">{isOn ? 'Dark mode' : 'Light mode'}</div>
              <div className="single-control">
                <button className={`switch ${isOn ? 'on' : ''}`} onClick={toggle} role="switch" aria-checked={isOn} aria-label="Toggle dark mode"><span /></button>
              </div>
            </>}

            <p className="action-note" aria-live="polite">{action}</p>
          </section>

          <section className="panel code-panel" aria-label={`${demos[demo].title} source code`}>
            <div className="panel-title"><span>{demo === 'counter' ? 'Counter' : demo === 'text' ? 'TextContent' : 'Toggle'}.tsx</span><span className="code-label">CODE</span></div>
            <pre className="code-block"><code>{codeByDemo[demo].map((line, index) => (
              <span key={index} className={`code-line ${activeLine === index + 1 ? 'active' : ''}`}>
                <span className="line-number">{index + 1}</span>{line || ' '}
              </span>
            ))}</code></pre>
            <p className="code-caption"><span className="legend" /> The highlighted line runs when you click a button.</p>
          </section>
        </div>

        <p className="takeaway"><span>State</span> stores a value. <span>Events</span> update it. React redraws the value.</p>
      </section>

      <section className="events-section">
        <div className="events-heading">
          <p className="eyebrow">DOM INTERACTION</p>
          <h2>Events</h2>
          <p>An event is an action from the user or browser, such as clicking a button, typing in a field, or submitting a form. React lets you connect an event to a handler function, where you can respond to that action and update state.</p>
          <ul className="topic-list event-topics" aria-label="Event handlers">
            <li><code>onClick</code><span>button clicks</span></li>
            <li><code>onChange</code><span>input changes</span></li>
            <li><code>onSubmit</code><span>form submissions</span></li>
          </ul>
        </div>

        <div className="event-grid">
          <article className="event-card">
            <div className="event-card-heading"><span className="event-type">onClick</span><span>Click event</span></div>
            <button className="button primary event-action" onClick={() => { setClicks(clicks + 1); setClickLine(1); }}>Click me</button>
            <p className="event-result">Clicked <strong>{clicks}</strong> {clicks === 1 ? 'time' : 'times'}</p>
            <EventCode lines={['<button onClick={handleClick}>', 'function handleClick() {', '  setClicks(clicks + 1);', '}']} activeLine={clickLine} />
          </article>

          <article className="event-card">
            <div className="event-card-heading"><span className="event-type">onChange</span><span>Input event</span></div>
            <label className="sr-only" htmlFor="event-input">Type a message</label>
            <input id="event-input" className="event-input" value={typedText} onChange={(event) => { setTypedText(event.target.value); setInputLine(1); }} placeholder="Type something…" />
            <p className="event-result">Preview: <strong>{typedText || '...'}</strong></p>
            <EventCode lines={['<input onChange={handleChange} />', 'function handleChange(event) {', '  setText(event.target.value);', '}']} activeLine={inputLine} />
          </article>

          <article className="event-card">
            <div className="event-card-heading"><span className="event-type">onSubmit</span><span>Form event</span></div>
            <form className="event-form" onSubmit={submitTask}>
              <label className="sr-only" htmlFor="event-task">Task to submit</label>
              <input id="event-task" className="event-input" value={task} onChange={(event) => setTask(event.target.value)} placeholder="Enter a task…" />
              <button className="button primary" type="submit">Submit</button>
            </form>
            <p className="event-result">{submittedTask ? <>Submitted: <strong>{submittedTask}</strong></> : 'Submit the form to see the result.'}</p>
            <EventCode lines={['<form onSubmit={handleSubmit}>', 'function handleSubmit(event) {', '  event.preventDefault();', '  setSubmittedTask(task);', '}']} activeLine={formLine} />
          </article>
        </div>
      </section>
    </>
  );
}
