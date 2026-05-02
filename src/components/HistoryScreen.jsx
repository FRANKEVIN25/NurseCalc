function TypeIcon({ type }) {
  const p = { width:20, height:20, viewBox:'0 0 24 24', fill:'none', strokeWidth:'2', strokeLinecap:'round', strokeLinejoin:'round' }
  const map = {
    'Dosis Medicamento': { bg:'#DBEAFE', c:'#3B82F6', svg: <svg {...p} stroke="#3B82F6"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg> },
    'Dosis por Peso':    { bg:'#EDE9FE', c:'#8B5CF6', svg: <svg {...p} stroke="#8B5CF6"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> },
    'Velocidad Goteo':   { bg:'#E0F2FE', c:'#0EA5E9', svg: <svg {...p} stroke="#0EA5E9"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg> },
    'Soluciones':        { bg:'#D1FAE5', c:'#059669', svg: <svg {...p} stroke="#059669"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg> },
    'Conversor':         { bg:'#FEF9C3', c:'#CA8A04', svg: <svg {...p} stroke="#CA8A04"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg> },
  }
  const entry = map[type] || { bg:'#F1F5F9', c:'#64748B', svg: <svg {...p} stroke="#64748B"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
  return (
    <div style={{ width:44, height:44, borderRadius:12, background:entry.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      {entry.svg}
    </div>
  )
}

export default function HistoryScreen({ history, navigate }) {
  const formatDate = (d) => {
    const date = new Date(d)
    const today = new Date()
    if (date.toDateString() === today.toDateString()) {
      return `Hoy ${date.toLocaleTimeString('es', { hour:'2-digit', minute:'2-digit' })}`
    }
    return date.toLocaleDateString('es', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
  }

  return (
    <>
      <div className="header">
        <div className="header-title">Historial</div>
        <div className="header-subtitle">{history.length} cálculos realizados</div>
      </div>

      <div style={{ padding:'20px' }}>
        {history.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
              <div style={{ width:72, height:72, borderRadius:20, background:'#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
            </div>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:18, fontWeight:700, color:'var(--text-primary)', marginBottom:8 }}>Sin historial aún</div>
            <div style={{ fontSize:14, color:'var(--text-secondary)', marginBottom:24 }}>Realiza tu primer cálculo para verlo aquí</div>
            <button className="btn-primary" onClick={() => navigate('home')} style={{ width:'auto', padding:'12px 28px' }}>Ir a Calculadoras</button>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {history.map((h, i) => (
              <div key={h.id} className="card fade-up" style={{
                display:'flex', alignItems:'center', gap:14,
                animationDelay: `${i * 0.04}s`
              }}>
                <TypeIcon type={h.type} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)' }}>{h.type}</div>
                  <div style={{ fontSize:13, color:'var(--primary)', fontWeight:600, marginTop:1 }}>→ {h.result}</div>
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', textAlign:'right', flexShrink:0 }}>
                  {formatDate(h.date)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
