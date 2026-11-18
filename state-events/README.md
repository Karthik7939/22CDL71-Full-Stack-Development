# React State, Events & Component Communication Interactive Lab

> **Objective:** Comprehensive interactive educational lab for mastering React fundamentals: **State Management (`useState`)**, **Event Handling (`onClick`, `onChange`, `onSubmit`)**, and **All 5 Patterns of Component Communication**.

---

## 🚀 Setup & Execution Commands

### 1. Run via Vite Development Server (React + TypeScript)
```bash
cd state-events
npm install
npm run dev
```
Open your browser at the local URL (typically `http://localhost:5173/`).

### 2. Available Direct Views
- **Component Communication Demo:** Navigate to `http://localhost:5173/#communication` (or click the **🔄 Component Communication** tab in the top header).
- **State & Events Demo:** Navigate to `http://localhost:5173/#state-events` (or click the **⚡ State & Events** tab in the top header).
- **Standalone Webpage (No Dev Server needed):** Open [`../component-communication.html`](../component-communication.html) directly in any browser.

---

## 🧩 All 5 Types of Component Communication Included

| Pattern | Mechanism | Direction | Key Concept |
| :--- | :--- | :--- | :--- |
| **1. Parent → Child** | `props` | Downwards | Parent passes read-only values/objects down via attributes (`<Child name={name} />`). Child receives and displays them. |
| **2. Child → Parent** | Callback Props | Upwards | Parent passes a function down via props (`onAddToCart={handleAdd}`); Child invokes it with arguments when user triggers an event. |
| **3. Sibling ↔ Sibling** | Lifting State Up | Bidirectional via Parent | State is lifted to the closest common parent. Sibling A updates the state via callback; Parent passes updated data to Sibling B via props. |
| **4. Deep Tree / Global** | Context API (`createContext`, `useContext`) | Global Broadcast | Bypasses intermediate components ("no prop drilling"). Parent wraps with `<Context.Provider value={...}>`, any deep descendant calls `useContext(Context)`. |
| **5. Component Composition** | `props.children` | Slot Injection | Parent injects arbitrary JSX elements between component tags (`<Card><p>Content</p></Card>`). Card renders `{children}` anywhere in its layout. |

---

## 💻 Codes to Study for Exam

### 1. Parent to Child (`ParentToChild.tsx`)
```tsx
// Parent passes state as props
function Parent() {
  const [student, setStudent] = useState('Alex Rivera');
  return <StudentBadge name={student} score={94} />;
}

// Child consumes read-only props
function StudentBadge({ name, score }: { name: string; score: number }) {
  return (
    <div className="badge">
      <h3>{name}</h3>
      <p>Score: {score}%</p>
    </div>
  );
}
```

### 2. Child to Parent (`ChildToParent.tsx`)
```tsx
// Parent passes callback function
function CartParent() {
  const [total, setTotal] = useState(0);

  const handleAdd = (price: number) => {
    setTotal(prev => prev + price);
  };

  return (
    <div>
      <h2>Total: ${total}</h2>
      <ProductItem name="Book" price={20} onAdd={handleAdd} />
    </div>
  );
}

// Child invokes callback on user click
function ProductItem({ name, price, onAdd }: { name: string; price: number; onAdd: (p: number) => void }) {
  return <button onClick={() => onAdd(price)}>Add {name} (${price})</button>;
}
```

### 3. Sibling to Sibling via Lifting State (`SiblingCommunication.tsx`)
```tsx
function TemperatureConverter() {
  // 1. Lift state up to common parent
  const [celsius, setCelsius] = useState(25);

  return (
    <div>
      {/* Sibling A: Updates parent state */}
      <TempInput value={celsius} onChange={setCelsius} />

      {/* Sibling B: Consumes converted state */}
      <TempDisplay fahrenheit={(celsius * 9/5) + 32} />
    </div>
  );
}
```

### 4. React Context API (`ContextCommunication.tsx`)
```tsx
// 1. Create Context
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>(null!);

// 2. Top-level Provider
function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') }}>
      <Dashboard /> {/* No prop drilling required! */}
    </ThemeContext.Provider>
  );
}

// 3. Deep Descendant reads directly
function DeepChildButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <button onClick={toggleTheme}>Current Theme: {theme}</button>;
}
```

### 5. Component Composition via `children` (`ChildrenComposition.tsx`)
```tsx
function GlassCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card">
      <h3>{title}</h3>
      <div className="content">{children}</div>
    </div>
  );
}

// Usage:
<GlassCard title="Notice">
  <p>Lab Exam scheduled for Wednesday at 9:00 AM.</p>
  <button>Download Hall Ticket</button>
</GlassCard>
```
