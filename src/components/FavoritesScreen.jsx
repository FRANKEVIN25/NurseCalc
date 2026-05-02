const ALL_TOOLS = [
  {
    id: 'dose', label: 'Dosis de Medicamento', desc: 'Calcula ml a administrar', color:'#DBEAFE', tc:'#3B82F6',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
  },
  {
    id: 'dose-weight', label: 'Dosis por Peso', desc: 'Ideal para pediatría', color:'#EDE9FE', tc:'#8B5CF6',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
  },
  {
    id: 'drip', label: 'Velocidad de Goteo', desc: 'Gotas por minuto', color:'#E0F2FE', tc:'#0EA5E9',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
  },
  {
    id: 'solution', label: 'Porcentaje Soluciones', desc: 'Concentración y masa', color:'#D1FAE5', tc:'#10B981',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
  },
  {
    id: 'converter', label: 'Conversor de Unidades', desc: 'Peso, volumen, temperatura', color:'#FEF9C3', tc:'#CA8A04',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
  },
]

export default function FavoritesScreen({ favorites, navigate, toggleFav }) {
  const favTools = ALL_TOOLS.filter(t => favorites.includes(t.id))
  const otherTools = ALL_TOOLS.filter(t => !favorites.includes(t.id))

  const ToolCard = ({ t, isFav }) => (
    <div className="card" style={{ display:'flex', alignItems:'center', gap:12, padding:'14px', opacity: isFav ? 1 : 0.72 }}>
      <div style={{ width:46, height:46, borderRadius:13, background:t.color, display:'flex', alignItems:'center', justifyContent:'center', color:t.tc, flexShrink:0 }}>
        {t.icon}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)' }}>{t.label}</div>
        <div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:1 }}>{t.desc}</div>
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={() => toggleFav(t.id)} style={{
          background: isFav ? '#FEF3C7' : 'var(--bg)',
          border: isFav ? 'none' : '1.5px dashed var(--border)',
          borderRadius:10, width:34, height:34, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          color: isFav ? '#D97706' : 'var(--text-muted)'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? '#D97706' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
        {isFav && (
          <button onClick={() => navigate(t.id)} style={{
            background:t.color, border:'none', borderRadius:10, width:34, height:34,
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:t.tc
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )

  return (
    <>
      <div className="header">
        <div className="header-title">Favoritos</div>
        <div className="header-subtitle">Tus calculadoras de acceso rápido</div>
      </div>

      <div style={{ padding:'20px' }}>
        {favTools.length > 0 && (
          <div style={{ marginBottom:24 }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:14, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:12 }}>
              Mis favoritos
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {favTools.map(t => <ToolCard key={t.id} t={t} isFav={true} />)}
            </div>
          </div>
        )}

        {otherTools.length > 0 && (
          <div>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:14, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:12 }}>
              Agregar a favoritos
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {otherTools.map(t => <ToolCard key={t.id} t={t} isFav={false} />)}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
