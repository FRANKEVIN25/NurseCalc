import { useState, useRef } from 'react'

const FRASES = [
  "Tu presencia es medicina. Tu cuidado, el abrazo que sana.",
  "Cada turno es una oportunidad de cambiar una historia de vida.",
  "Ser enfermera no es solo profesión, es vocación del corazón.",
  "La ciencia te da herramientas; tu humanidad las convierte en milagros.",
  "Cuidas a otros con una fortaleza que pocos conocen. Eso te hace grande.",
  "Tu dedicación convierte el miedo en esperanza. Eres la diferencia.",
  "El mundo necesita manos que curen y corazones que perseveren. Los tuyos lo hacen.",
]

const calcItems = [
  {
    label:'Dosis de Medicamento', desc:'(Indicada ÷ Disponible) × Vol', c:'#DBEAFE', ic:'#3B82F6',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
  },
  {
    label:'Dosis por Peso', desc:'mg/kg × Peso = Dosis total', c:'#EDE9FE', ic:'#8B5CF6',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
  },
  {
    label:'Velocidad de Goteo', desc:'(Vol × Factor) ÷ (Tiempo × 60)', c:'#E0F2FE', ic:'#0EA5E9',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
  },
  {
    label:'Soluciones', desc:'(Soluto / Solución) × 100 = %', c:'#D1FAE5', ic:'#059669',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
  },
  {
    label:'Conversor', desc:'Peso, volumen, temperatura, tiempo', c:'#FEF9C3', ic:'#CA8A04',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
  },
]

export default function ProfileScreen({ navigate, history = [] }) {
  const [photoUrl, setPhotoUrl] = useState(() => localStorage.getItem('nursecalc_photo') || null)
  const fileRef = useRef(null)

  const fraseDelDia = FRASES[new Date().getDay()]

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target.result
      setPhotoUrl(url)
      localStorage.setItem('nursecalc_photo', url)
    }
    reader.readAsDataURL(file)
  }

  const totalCalcs = history.length
  const calcTypes = history.reduce((acc, h) => { acc[h.type] = (acc[h.type] || 0) + 1; return acc }, {})
  const masUsada = Object.entries(calcTypes).sort((a, b) => b[1] - a[1])[0]

  return (
    <>
      <div className="header" style={{ paddingBottom:24 }}>
        <div className="header-title">Perfil</div>
        <div className="header-subtitle">Tu espacio profesional</div>
      </div>

      <div style={{ padding:'20px' }}>
        {/* Avatar + info */}
        <div className="card fade-up" style={{ display:'flex', alignItems:'center', gap:16, padding:'20px' }}>
          <div style={{ position:'relative', flexShrink:0 }}>
            <div style={{
              width:72, height:72, borderRadius:'50%',
              background:'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
              display:'flex', alignItems:'center', justifyContent:'center',
              overflow:'hidden', boxShadow:'0 4px 14px rgba(59,130,246,0.3)'
            }}>
              {photoUrl
                ? <img src={photoUrl} alt="Perfil" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                : <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              }
            </div>
            <button
              onClick={() => fileRef.current.click()}
              title="Cambiar foto"
              style={{
                position:'absolute', bottom:-2, right:-2,
                width:26, height:26, borderRadius:'50%',
                background:'#3B82F6', border:'2.5px solid white',
                cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:'0 2px 6px rgba(59,130,246,0.4)'
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFileChange} />
          </div>

          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)', lineHeight:1.35 }}>
              Angeluz Grecia Tait<br/>Ricaldi Céspedes
            </div>
            <div style={{ fontSize:13, color:'var(--text-secondary)', marginTop:3 }}>Licenciada en Enfermería</div>
            <span className="badge badge-blue" style={{ marginTop:6, display:'inline-flex' }}>NurseCalc Pro</span>
          </div>
        </div>

        {/* Mi motivación */}
        <div className="card fade-up" style={{
          marginTop:12,
          background:'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          border:'1px solid #BFDBFE', padding:'16px 18px'
        }}>
          <div style={{ fontSize:10, fontWeight:700, color:'#3B82F6', textTransform:'uppercase', letterSpacing:'1px', marginBottom:8 }}>
            Mi motivación
          </div>
          <div style={{ fontStyle:'italic', fontSize:14, color:'#1E40AF', lineHeight:1.65 }}>
            "Cada cálculo correcto es un cuidado bien dado. Tu precisión salva vidas."
          </div>
        </div>

        {/* Frase del día */}
        <div className="card fade-up" style={{ marginTop:10, padding:'14px 18px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{ fontSize:10, fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px' }}>Frase del día</span>
          </div>
          <div style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.6, fontStyle:'italic' }}>
            "{fraseDelDia}"
          </div>
        </div>

        {/* Mis estadísticas */}
        <div style={{ marginTop:22, marginBottom:10 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.7px' }}>Mis estadísticas</div>
        </div>
        <div className="card fade-up">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:3 }}>Total cálculos</div>
              <div style={{ fontSize:32, fontWeight:700, color:'var(--primary)', lineHeight:1 }}>{totalCalcs}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:3 }}>Más usada</div>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)', maxWidth:110, textAlign:'right', lineHeight:1.3 }}>
                {masUsada ? masUsada[0] : '—'}
              </div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', marginBottom:5 }}>
            <span>Progreso</span>
            <span>{Math.min(totalCalcs, 50)}/50 cálculos</span>
          </div>
          <div style={{ height:6, background:'var(--border)', borderRadius:6, overflow:'hidden' }}>
            <div style={{
              height:'100%',
              width:`${Math.min(totalCalcs / 50 * 100, 100)}%`,
              background:'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
              borderRadius:6, transition:'width 0.7s ease'
            }} />
          </div>
        </div>

        {/* Calculadoras */}
        <div style={{ marginTop:22, marginBottom:10 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.7px' }}>Calculadoras</div>
        </div>
        {calcItems.map((item, i) => (
          <div key={i} className="card fade-up" style={{ display:'flex', gap:12, alignItems:'center', marginBottom:8, padding:'12px 14px' }}>
            <div style={{
              width:38, height:38, borderRadius:11, background:item.c,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:item.ic, flexShrink:0
            }}>{item.icon}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)' }}>{item.label}</div>
              <div style={{ fontSize:11, color:'var(--text-secondary)', fontFamily:'monospace', marginTop:1 }}>{item.desc}</div>
            </div>
          </div>
        ))}

        <div className="warning-box" style={{ marginTop:8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:1 }}>
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div className="warning-text">Esta app es una herramienta de apoyo. Siempre verifica los cálculos con un profesional de salud calificado.</div>
        </div>

        <div style={{ textAlign:'center', marginTop:20, marginBottom:8, fontSize:12, color:'var(--text-muted)' }}>
          Hecho con amor para mi enfermera 💙
        </div>
      </div>
    </>
  )
}
