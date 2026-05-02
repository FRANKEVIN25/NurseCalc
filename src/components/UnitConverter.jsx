import { useState } from 'react'

const CONVERSIONS = {
  weight: {
    label: 'Peso',
    units: ['kg', 'g', 'mg', 'mcg', 'lb'],
    toBase: { kg: 1, g: 0.001, mg: 0.000001, mcg: 0.000000001, lb: 0.453592 },
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="M7 21h10"/><path d="M12 3v18"/>
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
      </svg>
    )
  },
  volume: {
    label: 'Volumen',
    units: ['L', 'ml', 'cc', 'fl oz'],
    toBase: { L: 1, ml: 0.001, cc: 0.001, 'fl oz': 0.0295735 },
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
      </svg>
    )
  },
  temp: {
    label: 'Temperatura',
    units: ['°C', '°F', 'K'],
    convert: (val, from, to) => {
      let c = from === '°F' ? (val - 32) * 5/9 : from === 'K' ? val - 273.15 : val
      return to === '°F' ? c * 9/5 + 32 : to === 'K' ? c + 273.15 : c
    },
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
      </svg>
    )
  },
  time: {
    label: 'Tiempo',
    units: ['horas', 'min', 'seg'],
    toBase: { horas: 3600, min: 60, seg: 1 },
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    )
  }
}

const BackBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:10, width:36, height:36, color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>
)

export default function UnitConverter({ navigate, addToHistory }) {
  const [category, setCategory] = useState('weight')
  const [valor, setValor] = useState('')
  const [from, setFrom] = useState('kg')
  const [to, setTo] = useState('g')
  const [resultado, setResultado] = useState(null)

  const cat = CONVERSIONS[category]

  const handleCategory = (c) => {
    setCategory(c)
    const u = CONVERSIONS[c].units
    setFrom(u[0]); setTo(u[1]); setValor(''); setResultado(null)
  }

  const calcular = () => {
    const v = parseFloat(valor)
    if (!v) return
    let res
    if (cat.convert) {
      res = cat.convert(v, from, to)
    } else {
      res = v * cat.toBase[from] / cat.toBase[to]
    }
    setResultado(res)
    addToHistory({ type: 'Conversor', icon: 'converter', result: `${res.toFixed(4)} ${to}` })
  }

  return (
    <>
      <div className="header" style={{ background:'linear-gradient(135deg, #B45309 0%, #D97706 100%)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <BackBtn onClick={() => navigate('home')} />
          <div>
            <div className="header-title">Conversor de Unidades</div>
            <div className="header-subtitle">Peso, volumen, temperatura y tiempo</div>
          </div>
        </div>
      </div>

      <div style={{ padding:'20px' }}>
        {/* Category tabs */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginBottom:16 }}>
          {Object.entries(CONVERSIONS).map(([k, v]) => {
            const active = category === k
            return (
              <button key={k} onClick={() => handleCategory(k)}
                style={{
                  padding:'10px 4px', borderRadius:12, border:'none', cursor:'pointer',
                  fontFamily:'DM Sans,sans-serif', fontSize:11, fontWeight:700, transition:'all 0.2s',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:5,
                  background: active ? '#D97706' : 'white',
                  color: active ? 'white' : 'var(--text-secondary)',
                  boxShadow: active ? '0 4px 10px rgba(217,119,6,0.3)' : 'var(--shadow)'
                }}
              >
                {v.icon(active)}
                {v.label}
              </button>
            )
          })}
        </div>

        <div className="card fade-up">
          <div className="input-group">
            <label className="input-label">Valor</label>
            <input className="input-field" type="number" placeholder="Ingresa el valor" value={valor} onChange={e => setValor(e.target.value)} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:10, alignItems:'end', marginBottom:16 }}>
            <div>
              <label className="input-label">De</label>
              <select className="select-field" value={from} onChange={e => setFrom(e.target.value)}>
                {cat.units.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div style={{ paddingBottom:12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
            <div>
              <label className="input-label">A</label>
              <select className="select-field" value={to} onChange={e => setTo(e.target.value)}>
                {cat.units.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <button className="btn-primary" style={{ background:'#D97706', boxShadow:'0 4px 12px rgba(217,119,6,0.3)' }} onClick={calcular}>Convertir</button>
        </div>

        {resultado !== null && (
          <div style={{
            background:'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
            borderRadius:20, padding:20, color:'white', textAlign:'center', marginTop:16,
            boxShadow:'0 4px 16px rgba(217,119,6,0.25)'
          }} className="fade-up">
            <div style={{ fontSize:12, opacity:0.85, marginBottom:4 }}>{valor} {from} =</div>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:36, fontWeight:800, lineHeight:1 }}>
              {resultado % 1 === 0 ? resultado : resultado.toFixed(6).replace(/\.?0+$/, '')}
            </div>
            <div style={{ fontSize:16, opacity:0.9, marginTop:4 }}>{to}</div>
          </div>
        )}

        {/* Quick reference */}
        <div style={{ marginTop:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8 }}>Referencias comunes</div>
          <div className="card" style={{ padding:'12px 14px' }}>
            {category === 'weight' && ['1 g = 1,000 mg', '1 mg = 1,000 mcg', '1 kg = 1,000 g', '1 lb = 453.6 g'].map(r => (
              <div key={r} style={{ fontSize:12, color:'var(--text-secondary)', padding:'5px 0', borderBottom:'1px solid var(--border)' }}>{r}</div>
            ))}
            {category === 'volume' && ['1 L = 1,000 ml', '1 cc = 1 ml', '1 fl oz = 29.6 ml'].map(r => (
              <div key={r} style={{ fontSize:12, color:'var(--text-secondary)', padding:'5px 0', borderBottom:'1px solid var(--border)' }}>{r}</div>
            ))}
            {category === 'temp' && ['Normal: 36.5°C – 37.5°C', '37°C = 98.6°F', 'Fiebre: > 38°C', 'Hipotermia: < 35°C'].map(r => (
              <div key={r} style={{ fontSize:12, color:'var(--text-secondary)', padding:'5px 0', borderBottom:'1px solid var(--border)' }}>{r}</div>
            ))}
            {category === 'time' && ['1 hora = 60 min', '1 min = 60 seg', '24 horas = 1 día'].map(r => (
              <div key={r} style={{ fontSize:12, color:'var(--text-secondary)', padding:'5px 0', borderBottom:'1px solid var(--border)' }}>{r}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
