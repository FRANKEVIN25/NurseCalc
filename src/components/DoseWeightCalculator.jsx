import { useState } from 'react'

const BackBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:10, width:36, height:36, color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>
)

export default function DoseWeightCalculator({ navigate, addToHistory }) {
  const [dosisPorKg, setDosisPorKg] = useState('')
  const [peso, setPeso] = useState('')
  const [frecuencia, setFrecuencia] = useState('1')
  const [resultado, setResultado] = useState(null)

  const calcular = () => {
    const d = parseFloat(dosisPorKg)
    const p = parseFloat(peso)
    const f = parseInt(frecuencia)
    if (!d || !p) return
    const total = d * p
    const porDosis = total / f
    setResultado({ total, porDosis, f })
    addToHistory({ type: 'Dosis por Peso', icon: 'weight', result: `${total.toFixed(2)} mg/día` })
  }

  const limpiar = () => { setDosisPorKg(''); setPeso(''); setFrecuencia('1'); setResultado(null) }

  return (
    <>
      <div className="header" style={{ background:'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <BackBtn onClick={() => navigate('home')} />
          <div>
            <div className="header-title">Dosis por Peso</div>
            <div className="header-subtitle">Ideal para pediatría y adultos</div>
          </div>
        </div>
      </div>

      <div style={{ padding:'20px' }}>
        <div style={{ background:'#F5F3FF', borderRadius:12, padding:'12px 14px', marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ color:'#7C3AED', flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
              <path d="M7 21h10"/><path d="M12 3v18"/>
              <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:'#7C3AED', textTransform:'uppercase', letterSpacing:'0.5px' }}>Fórmula</div>
            <div style={{ fontFamily:'monospace', fontSize:13, color:'#5B21B6', fontWeight:600, marginTop:2 }}>
              Dosis (mg/kg) × Peso (kg) = Dosis Total
            </div>
          </div>
        </div>

        <div className="card fade-up">
          <div className="input-group">
            <label className="input-label">Dosis Indicada (mg/kg)</label>
            <input className="input-field" type="number" placeholder="Ej: 10" value={dosisPorKg} onChange={e => setDosisPorKg(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Peso del Paciente (kg)</label>
            <input className="input-field" type="number" placeholder="Ej: 70" value={peso} onChange={e => setPeso(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Frecuencia de Administración</label>
            <select className="select-field" value={frecuencia} onChange={e => setFrecuencia(e.target.value)}>
              <option value="1">Una vez al día</option>
              <option value="2">Cada 12 horas (2 veces)</option>
              <option value="3">Cada 8 horas (3 veces)</option>
              <option value="4">Cada 6 horas (4 veces)</option>
              <option value="6">Cada 4 horas (6 veces)</option>
            </select>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:4 }}>
            <button className="btn-secondary" style={{ background:'#F5F3FF', color:'#7C3AED' }} onClick={limpiar}>Limpiar</button>
            <button className="btn-primary" style={{ background:'#7C3AED', boxShadow:'0 4px 12px rgba(124,58,237,0.3)' }} onClick={calcular}>Calcular</button>
          </div>
        </div>

        {resultado !== null && (
          <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{
              background:'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              borderRadius:20, padding:20, color:'white', textAlign:'center',
              boxShadow:'0 4px 16px rgba(124,58,237,0.25)'
            }} className="fade-up">
              <div style={{ fontSize:12, fontWeight:600, opacity:0.85, textTransform:'uppercase', letterSpacing:1 }}>Dosis Total Diaria</div>
              <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:38, fontWeight:700, margin:'4px 0' }}>{resultado.total.toFixed(2)}</div>
              <div style={{ fontSize:14, opacity:0.85 }}>mg por día</div>
            </div>
            {resultado.f > 1 && (
              <div className="card fade-up" style={{ textAlign:'center', padding:'16px' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.5px' }}>Por Dosis (cada {24/resultado.f}h)</div>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:30, fontWeight:700, color:'#7C3AED', margin:'4px 0' }}>{resultado.porDosis.toFixed(2)} mg</div>
              </div>
            )}
          </div>
        )}

        <div className="warning-box" style={{ marginTop:12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div className="warning-text">En pediatría, verifica siempre la dosis máxima permitida por kg según el medicamento.</div>
        </div>
      </div>
    </>
  )
}
