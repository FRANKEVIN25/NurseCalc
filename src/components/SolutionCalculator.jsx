import { useState } from 'react'

const BackBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:10, width:36, height:36, color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>
)

export default function SolutionCalculator({ navigate, addToHistory }) {
  const [mode, setMode] = useState('conc')
  const [vals, setVals] = useState({ conc:'', masa:'', volumen:'' })
  const [resultado, setResultado] = useState(null)

  const set = (k, v) => setVals(p => ({ ...p, [k]: v }))

  const calcular = () => {
    const c = parseFloat(vals.conc), m = parseFloat(vals.masa), v = parseFloat(vals.volumen)
    let res = null
    if (mode === 'conc' && m && v) { res = { label:'Concentración', value: (m / v * 100).toFixed(2), unit:'%' } }
    else if (mode === 'masa' && c && v) { res = { label:'Masa del Soluto', value: (c * v / 100).toFixed(2), unit:'g' } }
    else if (mode === 'volumen' && c && m) { res = { label:'Volumen de Solución', value: (m / c * 100).toFixed(2), unit:'ml' } }
    if (res) {
      setResultado(res)
      addToHistory({ type: 'Soluciones', icon: 'solution', result: `${res.value} ${res.unit}` })
    }
  }

  const limpiar = () => { setVals({ conc:'', masa:'', volumen:'' }); setResultado(null) }

  const modes = [
    { id:'conc', label:'% Concentración' },
    { id:'masa', label:'Masa (g)' },
    { id:'volumen', label:'Volumen (ml)' },
  ]

  return (
    <>
      <div className="header" style={{ background:'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <BackBtn onClick={() => navigate('home')} />
          <div>
            <div className="header-title">Porcentaje de Soluciones</div>
            <div className="header-subtitle">Concentración, masa o volumen</div>
          </div>
        </div>
      </div>

      <div style={{ padding:'20px' }}>
        {/* Mode selector */}
        <div style={{ display:'flex', gap:6, marginBottom:16, background:'white', borderRadius:14, padding:4, boxShadow:'var(--shadow)' }}>
          {modes.map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); setResultado(null) }}
              style={{
                flex:1, padding:'9px 4px', borderRadius:10, border:'none', cursor:'pointer',
                fontFamily:'DM Sans,sans-serif', fontSize:11, fontWeight:700, transition:'all 0.2s',
                background: mode === m.id ? '#059669' : 'transparent',
                color: mode === m.id ? 'white' : 'var(--text-secondary)',
                boxShadow: mode === m.id ? '0 2px 8px rgba(5,150,105,0.3)' : 'none'
              }}
            >{m.label}</button>
          ))}
        </div>

        <div className="card fade-up">
          <div style={{ background:'#ECFDF5', borderRadius:10, padding:'10px 12px', marginBottom:16, fontFamily:'monospace', fontSize:12, color:'#065F46', fontWeight:600 }}>
            % = (masa_soluto / volumen_solución) × 100
          </div>

          {mode !== 'conc' && (
            <div className="input-group">
              <label className="input-label">Concentración (%)</label>
              <input className="input-field" type="number" placeholder="Ej: 5" value={vals.conc} onChange={e => set('conc', e.target.value)} />
            </div>
          )}
          {mode !== 'masa' && (
            <div className="input-group">
              <label className="input-label">Masa del Soluto (g)</label>
              <input className="input-field" type="number" placeholder="Ej: 25" value={vals.masa} onChange={e => set('masa', e.target.value)} />
            </div>
          )}
          {mode !== 'volumen' && (
            <div className="input-group">
              <label className="input-label">Volumen de Solución (ml)</label>
              <input className="input-field" type="number" placeholder="Ej: 500" value={vals.volumen} onChange={e => set('volumen', e.target.value)} />
            </div>
          )}

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:4 }}>
            <button className="btn-secondary" style={{ background:'#ECFDF5', color:'#059669' }} onClick={limpiar}>Limpiar</button>
            <button className="btn-primary" style={{ background:'#059669', boxShadow:'0 4px 12px rgba(5,150,105,0.3)' }} onClick={calcular}>Calcular</button>
          </div>
        </div>

        {resultado && (
          <div style={{
            background:'linear-gradient(135deg, #059669 0%, #047857 100%)',
            borderRadius:20, padding:20, color:'white', textAlign:'center', marginTop:16,
            boxShadow:'0 4px 16px rgba(5,150,105,0.25)'
          }} className="fade-up">
            <div style={{ fontSize:12, fontWeight:600, opacity:0.85, textTransform:'uppercase', letterSpacing:1 }}>{resultado.label}</div>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:46, fontWeight:800, margin:'4px 0', lineHeight:1 }}>{resultado.value}</div>
            <div style={{ fontSize:16, opacity:0.85 }}>{resultado.unit}</div>
          </div>
        )}
      </div>
    </>
  )
}
