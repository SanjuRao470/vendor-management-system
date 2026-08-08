function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  )
}

function CardHeader({ children, className = '' }) {
  return (
    <div className={`border-b border-slate-100 px-6 py-4 ${className}`}>
      {children}
    </div>
  )
}

function CardBody({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardBody }
