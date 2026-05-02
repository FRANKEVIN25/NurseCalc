import { useState } from 'react'

const BackBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:10, width:36, height:36, color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>
)

export default function DripRateCalculator({ navigate, addToHistory }) {
  const [volumen, setVolumen] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [tipoSet, setTipoSet] = useState('20')
  const [resultado, setResultado] = useState(null)

  const calcular = () => {
    const v = parseFloat(volumen)
    const t = parseFloat(tiempo)
    const factor = parseInt(tipoSet)
    if (!v || !t) return
    const mlPorHora = v / t
    const gotasPorMin = (v * factor) / (t * 60)
    setResultado({ mlPorHora, gotasPorMin: Math.round(gotasPorMin), factor })
    addToHistory({ type: 'Velocidad Goteo', icon: 'drip', result: `${Math.round(gotasPorMin)} gts/min` })
  }

  const limpiar = () => { setVolumen(''); setTiempo(''); setResultado(null) }

  return (
    <>
      <div className="header" style={{ background:'linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <BackBtn onClick={() => navigate('home')} />
          <div>
            <div className="header-title">Velocidad de Goteo</div>
            <div className="header-subtitle">Gotas por minuto para sueros</div>
          </div>
        </div>
      </div>

      <div style={{ padding:'20px' }}>
        <div style={{ background:'#F0F9FF', borderRadius:12, padding:'12px 14px', marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ color:'#0EA5E9', flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:'#0EA5E9', textTransform:'uppercase', letterSpacing:'0.5px' }}>Fórmula</div>
            <div style={{ fontFamily:'monospace', fontSize:13, color:'#0369A1', fontWeight:600, marginTop:2 }}>
              (Volumen × Factor) ÷ (Tiempo(h) × 60)
            </div>
          </div>
        </div>

        <div className="card fade-up">
          <div className="input-group">
            <label className="input-label">Volumen a Infundir (ml)</label>
            <input className="input-field" type="number" placeholder="Ej: 500" value={volumen} onChange={e => setVolumen(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Tiempo de Infusión (horas)</label>
            <input className="input-field" type="number" placeholder="Ej: 4" value={tiempo} onChange={e => setTiempo(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Tipo de Equipo (Factor de Goteo)</label>
            <select className="select-field" value={tipoSet} onChange={e => setTipoSet(e.target.value)}>
              <option value="20">Macrogotero — 20 gotas/ml</option>
              <option value="60">Microgotero — 60 gotas/ml</option>
              <option value="15">Equipo transfusión — 15 gotas/ml</option>
            </select>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:4 }}>
            <button className="btn-secondary" style={{ background:'#F0F9FF', color:'#0EA5E9' }} onClick={limpiar}>Limpiar</button>
            <button className="btn-primary" style={{ background:'#0EA5E9', boxShadow:'0 4px 12px rgba(14,165,233,0.3)' }} onClick={calcular}>Calcular</button>
          </div>
        </div>

        {resultado !== null && (
          <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{
              background:'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
              borderRadius:20, padding:20, color:'white', textAlign:'center',
              boxShadow:'0 4px 16px rgba(14,165,233,0.25)'
            }} className="fade-up">
              <div style={{ fontSize:12, fontWeight:600, opacity:0.85, textTransform:'uppercase', letterSpacing:1 }}>Gotas por Minuto</div>
              <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:52, fontWeight:800, margin:'4px 0', lineHeight:1 }}>{resultado.gotasPorMin}</div>
              <div style={{ fontSize:14, opacity:0.85 }}>gotas / min</div>
              <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:10, padding:'8px 12px', marginTop:12, fontSize:13 }}>
                {resultado.mlPorHora.toFixed(1)} ml / hora
              </div>
            </div>

            <div className="card fade-up" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:20, padding:'16px' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ color:'#0EA5E9', animation:'pulse 1.2s infinite' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#BAE6FD" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
                  </svg>
                </div>
                <div style={{ fontSize:11, color:'var(--text-secondary)', fontWeight:600, marginTop:4 }}>cada {(60/resultado.gotasPorMin).toFixed(1)}s</div>
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)' }}>Factor: {resultado.factor} gts/ml</div>
                <div style={{ fontSize:12, color:'var(--text-secondary)', marginTop:2 }}>
                  {tipoSet === '60' ? 'Microgotero — mayor precisión' : tipoSet === '20' ? 'Macrogotero — uso estándar' : 'Equipo transfusión'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
