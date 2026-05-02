import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [anim, setAnim] = useState(false)
  useEffect(() => { setTimeout(() => setAnim(true), 100) }, [])

  return (
    <div style={{
      height: '100%',
      background: 'linear-gradient(160deg, #2563EB 0%, #3B82F6 55%, #60A5FA 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative circles */}
      <div style={{ position:'absolute', width:320, height:320, borderRadius:'50%', background:'rgba(255,255,255,0.04)', top:-100, right:-80 }} />
      <div style={{ position:'absolute', width:220, height:220, borderRadius:'50%', background:'rgba(255,255,255,0.06)', bottom:40, left:-70 }} />
      <div style={{ position:'absolute', width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.05)', top:80, left:30 }} />

      {/* Logo */}
      <div style={{
        opacity: anim ? 1 : 0,
        transform: anim ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(12px)',
        transition: 'all 0.7s cubic-bezier(0.34,1.56,0.64,1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: 30,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 50, boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
        }}>🩺</div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 38, fontWeight: 700, color: 'white', letterSpacing: -1 }}>
            NurseCalc
          </div>
          <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: 400, marginTop: 6, letterSpacing: 0.2 }}>
            Cálculos precisos. Pacientes seguros.
          </div>
        </div>
      </div>

      {/* Loading bar */}
      <div style={{
        position: 'absolute', bottom: 64,
        opacity: anim ? 1 : 0, transition: 'opacity 0.5s 0.5s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10
      }}>
        <div style={{ width: 120, height: 2.5, background: 'rgba(255,255,255,0.18)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: 'rgba(255,255,255,0.85)', borderRadius: 10,
            animation: 'loadBar 2s ease forwards'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes loadBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
