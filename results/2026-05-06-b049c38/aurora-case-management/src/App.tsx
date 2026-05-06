import { Route, Router, Switch, useLocation } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import Home from './pages/home'
import NotFound from './pages/not-found'
import KpiDashboard from './pages/kpi-dashboard'
import ApplicationWizard from './pages/application-wizard'
import WorkQueue from './pages/work-queue'
import DocumentManagement from './pages/document-management'
import CommunicationNotes from './pages/communication-notes'

const pages = [
  { path: '/', title: 'Home', component: Home },
  { path: '/kpi-dashboard', title: 'KPI Dashboard', component: KpiDashboard },
  { path: '/application-wizard', title: 'Application Wizard', component: ApplicationWizard },
  { path: '/work-queue', title: 'Work Queue', component: WorkQueue },
  { path: '/documents/:id', title: 'Document Management', component: DocumentManagement },
  { path: '/documents', title: 'Document Management', component: DocumentManagement },
  { path: '/notes/:id', title: 'Communication & Notes', component: CommunicationNotes },
  { path: '/notes', title: 'Communication & Notes', component: CommunicationNotes },
]

function NavBar() {
  const [location, setLocation] = useLocation()
  const isHome = location === '/'
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 sticky top-0 z-50">
      <button
        onClick={() => setLocation('/')}
        className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
      >
        <img src="/images/icon-appian-header.png" alt="Appian" className="h-5 w-auto opacity-70" />
        <span>Pacific Coast CU</span>
      </button>
      {!isHome && (
        <>
          <span className="text-gray-300">|</span>
          <nav className="flex gap-1">
            {[
              { path: '/kpi-dashboard', label: 'Dashboard' },
              { path: '/application-wizard', label: 'Apply' },
              { path: '/work-queue', label: 'Work Queue' },
              { path: '/documents/1001', label: 'Documents' },
              { path: '/notes/1001', label: 'Notes' },
            ].map(({ path, label }) => (
              <button
                key={path}
                onClick={() => setLocation(path)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  location.startsWith(path.replace('/1001', ''))
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </>
      )}
    </div>
  )
}

function App() {
  return (
    <Router hook={useHashLocation}>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Switch>
          {pages.map(({ path, component: Component }) => (
            <Route key={path} path={path} component={Component} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
