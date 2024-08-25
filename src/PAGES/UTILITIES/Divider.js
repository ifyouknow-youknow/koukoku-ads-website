export function Divider({ children, thickness, color }) {
    return <div style={{ borderTop: `${thickness}px solid ${color}` }}>{children}</div>
}