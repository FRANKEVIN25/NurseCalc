const tools = [
  {
    id: 'dose', label: 'Dosis de\nMedicamento', color: '#3B82F6', bg: '#DBEAFE',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
        <path d="m8.5 8.5 7 7"/>
      </svg>
    )
  },
  {
    id: 'dose-weight', label: 'Dosis por\nPeso', color: '#8B5CF6', bg: '#EDE9FE',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="M7 21h10"/><path d="M12 3v18"/>
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
      </svg>
    )
  },
  {
    id: 'drip', label: 'Velocidad\nde Goteo', color: '#0EA5E9', bg: '#E0F2FE',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
      </svg>
    )
  },
  {
    id: 'solution', label: 'Porcentaje\nSoluciones', color: '#10B981', bg: '#D1FAE5',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/>
        <path d="M8.5 2h7"/><path d="M7 16h10"/>
      </svg>
    )
  },
  {
    id: 'converter', label: 'Conversor\nde Unidades', color: '#CA8A04', bg: '#FEF9C3',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 3 4 4-4 4"/><path d="M20 7H4"/>
        <path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>
      </svg>
    )
  },
  {
    id: 'history', label: 'Ver\nHistorial', color: '#F43F5E', bg: '#FFE4E6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/>
        <line x1="8" x2="21" y1="18" y2="18"/>
        <line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/>
        <line x1="3" x2="3.01" y1="18" y2="18"/>
      </svg>
    )
  },
]

function typeIcon(type) {
  const p = { width:20, height:20, viewBox:'0 0 24 24', fill:'none', strokeWidth:'2', strokeLinecap:'round', strokeLinejoin:'round' }
  if (type === 'Dosis Medicamento') return <svg {...p} stroke="#3B82F6"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
  if (type === 'Dosis por Peso') return <svg {...p} stroke="#8B5CF6"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
  if (type === 'Velocidad Goteo') return <svg {...p} stroke="#0EA5E9"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
  if (type === 'Soluciones') return <svg {...p} stroke="#10B981"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
  return <svg {...p} stroke="#CA8A04"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
}

function typeBg(type) {
  if (type === 'Dosis Medicamento') return '#DBEAFE'
  if (type === 'Dosis por Peso') return '#EDE9FE'
  if (type === 'Velocidad Goteo') return '#E0F2FE'
  if (type === 'Soluciones') return '#D1FAE5'
  return '#FEF9C3'
}

export default function HomeDashboard({ navigate, history }) {
  const todayCount = history.filter(h => {
    const today = new Date(); const d = new Date(h.date)
    return d.toDateString() === today.toDateString()
  }).length

  return (
    <>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 60%, #60A5FA 100%)',
        padding: '52px 20px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', width:220, height:220, borderRadius:'50%', background:'rgba(255,255,255,0.07)', top:-80, right:-50 }} />
        <div style={{ position:'absolute', width:130, height:130, borderRadius:'50%', background:'rgba(255,255,255,0.05)', bottom:20, left:-40 }} />

        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ color:'rgba(255,255,255,0.75)', fontSize:13, fontWeight:500 }}>Bienvenida de vuelta</div>
          <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:26, fontWeight:700, color:'white', marginTop:2 }}>Hola, Angeluz 👋</div>
          <div style={{ color:'rgba(255,255,255,0.65)', fontSize:13, marginTop:4 }}>Calculadora médica para enfermería</div>
        </div>

        {/* Quick stats */}
        <div style={{ display:'flex', gap:10, marginTop:20, position:'relative', zIndex:1 }}>
          {[
            {
              label: 'Total cálculos', value: history.length,
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            },
            {
              label: 'Hoy', value: todayCount,
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            },
          ].map((stat, i) => (
            <div key={i} style={{
              flex:1, background:'rgba(255,255,255,0.14)', backdropFilter:'blur(12px)',
              borderRadius:14, padding:'12px 14px', display:'flex', alignItems:'center', gap:10,
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              {stat.icon}
              <div>
                <div style={{ color:'white', fontFamily:'DM Sans,sans-serif', fontSize:22, fontWeight:700, lineHeight:1 }}>{stat.value}</div>
                <div style={{ color:'rgba(255,255,255,0.7)', fontSize:11, marginTop:1 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative wave */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:22, overflow:'hidden' }}>
          <svg viewBox="0 0 390 22" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'100%' }} preserveAspectRatio="none">
            <path d="M0,0 Q130,22 260,8 Q325,2 390,18 L390,22 L0,22 Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </div>

      <div style={{ padding:'20px' }}>
        {/* Tools grid */}
        <div style={{ marginBottom:6 }}>
          <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:16, fontWeight:700, color:'var(--text-primary)', marginBottom:14 }}>
            Calculadoras
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {tools.map((tool, i) => (
              <button key={tool.id} onClick={() => navigate(tool.id)}
                className={`fade-up fade-up-${i + 1}`}
                style={{
                  background:'white', border:'none', borderRadius:20, padding:'16px 14px',
                  cursor:'pointer', textAlign:'left', boxShadow:'var(--shadow)',
                  transition:'all 0.2s', display:'flex', flexDirection:'column', gap:10
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >
                <div style={{
                  width:46, height:46, borderRadius:13, background:tool.bg,
                  display:'flex', alignItems:'center', justifyContent:'center', color:tool.color
                }}>{tool.icon}</div>
                <div style={{
                  fontWeight:700, fontSize:13, color:'var(--text-primary)', lineHeight:1.35,
                  whiteSpace:'pre-line'
                }}>{tool.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent history */}
        {history.length > 0 && (
          <div style={{ marginTop:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:15, fontWeight:700, color:'var(--text-primary)' }}>Recientes</div>
              <button onClick={() => navigate('history')} style={{ background:'none', border:'none', color:'var(--primary)', fontSize:13, fontWeight:700, cursor:'pointer' }}>Ver todos</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {history.slice(0, 3).map(h => (
                <div key={h.id} className="card" style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px' }}>
                  <div style={{
                    width:40, height:40, borderRadius:12, background:typeBg(h.type),
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
                  }}>{typeIcon(h.type)}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)' }}>{h.type}</div>
                    <div style={{ fontSize:12, color:'var(--text-secondary)' }}>Resultado: {h.result}</div>
                  </div>
                  <div style={{ fontSize:11, color:'var(--text-muted)' }}>
                    {new Date(h.date).toLocaleTimeString('es', { hour:'2-digit', minute:'2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
