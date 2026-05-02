export default function BottomNav({ activeTab, navigate }) {
  const items = [
    {
      id: 'home', label: 'Inicio',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#3B82F6' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      id: 'history', label: 'Historial',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#3B82F6' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    },
    {
      id: 'favorites', label: 'Favoritos',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#3B82F6' : 'none'} stroke={active ? '#3B82F6' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    },
    {
      id: 'profile', label: 'Perfil',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#3B82F6' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
  ]

  return (
    <div className="bottom-nav">
      {items.map(item => {
        const active = activeTab === item.id
        return (
          <button
            key={item.id}
            className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            {item.icon(active)}
            <span className="nav-label">{item.label}</span>
            <div className="nav-indicator" />
          </button>
        )
      })}
    </div>
  )
}
