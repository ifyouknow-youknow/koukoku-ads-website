export function Clickable({ children, onPress }) {
    return <div className="pointer" onClick={() => { onPress(); }} style={{ backgroundColor: "transparent", padding: 0, margin: 0, border: 0 }}>
        {children}
    </div>
}