import { useState } from 'react'

const BackBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:10, width:36, height:36, color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>
)

export default function DoseCalculator({ navigate, addToHistory }) {
  const [dosisIndicada, setDosisIndicada] = useState('')
  const [dosisDisponible, setDosisDisponible] = useState('')
  const [volumen, setVolumen] = useState('')
  const [resultado, setResultado] = useState(null)

  const calcular = () => {
    const di = parseFloat(dosisIndicada)
    const dd = parseFloat(dosisDisponible)
    const v = parseFloat(volumen)
    if (!di || !dd || !v || dd === 0) return
    const res = (di / dd) * v
    setResultado(res)
    addToHistory({ type: 'Dosis Medicamento', icon: 'dose', result: `${res.toFixed(2)} ml` })
  }

  const limpiar = () => {
    setDosisIndicada(''); setDosisDisponible(''); setVolumen(''); setResultado(null)
  }

  return (
    <>
      <div className="header">
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <BackBtn onClick={() => navigate('home')} />
          <div>
            <div className="header-title">Dosis de Medicamento</div>
            <div className="header-subtitle">Calcula la cantidad a administrar</div>
          </div>
        </div>
      </div>

      <div style={{ padding:'20px' }}>
        <div style={{ background:'#EFF6FF', borderRadius:12, padding:'12px 14px', marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ color:'#3B82F6', flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v9a2 2 0 0 0 2 2"/></svg>
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:'#3B82F6', textTransform:'uppercase', letterSpacing:'0.5px' }}>Fórmula</div>
            <div style={{ fontFamily:'monospace', fontSize:13, color:'#1D4ED8', fontWeight:600, marginTop:2 }}>
              (Dosis indicada ÷ Dosis disponible) × Volumen
            </div>
          </div>
        </div>

        <div className="card fade-up">
          <div className="input-group">
            <label className="input-label">Dosis Indicada (mg)</label>
            <input className="input-field" type="number" placeholder="Ej: 500" value={dosisIndicada} onChange={e => setDosisIndicada(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Dosis Disponible (mg)</label>
            <input className="input-field" type="number" placeholder="Ej: 250" value={dosisDisponible} onChange={e => setDosisDisponible(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Volumen del Frasco (ml)</label>
            <input className="input-field" type="number" placeholder="Ej: 5" value={volumen} onChange={e => setVolumen(e.target.value)} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:4 }}>
            <button className="btn-secondary" onClick={limpiar}>Limpiar</button>
            <button className="btn-primary" onClick={calcular}>Calcular</button>
          </div>
        </div>

        {resultado !== null && (
          <div className="result-box fade-up" style={{ marginTop:16 }}>
            <div className="result-label">Administrar</div>
            <div className="result-value">{resultado.toFixed(2)}</div>
            <div className="result-unit">mililitros (ml)</div>
            <div className="result-formula">
              ({dosisIndicada} ÷ {dosisDisponible}) × {volumen} = {resultado.toFixed(2)} ml
            </div>
          </div>
        )}

        <div className="warning-box fade-up" style={{ marginTop:16 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div className="warning-text">Siempre verifica el cálculo antes de administrar. Un error puede ser crítico para el paciente.</div>
        </div>
      </div>
    </>
  )
}
