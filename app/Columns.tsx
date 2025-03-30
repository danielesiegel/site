// components/Columns.tsx
export function Columns({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>{children}</div>
}

export function Column({ children }: { children: React.ReactNode }) {
  return <div style={{ flex: 1, minWidth: '250px' }}>{children}</div>
}
