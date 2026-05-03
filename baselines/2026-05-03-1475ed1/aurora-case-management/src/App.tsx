import { Route, Router, Switch } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import Home from './pages/home'
import NotFound from './pages/not-found'
import KpiDashboard from './pages/kpi-dashboard'
import ApplicationWizard from './pages/application-wizard'
import WorkQueue from './pages/work-queue'
import DocumentManagement from './pages/document-management'
import Communications from './pages/communications'

function App() {
  return (
    <Router hook={useHashLocation}>
      <div className="min-h-screen bg-gray-50">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/kpi-dashboard" component={KpiDashboard} />
          <Route path="/application-wizard" component={ApplicationWizard} />
          <Route path="/work-queue" component={WorkQueue} />
          <Route path="/document-management/:id" component={DocumentManagement} />
          <Route path="/document-management" component={DocumentManagement} />
          <Route path="/communications/:id" component={Communications} />
          <Route path="/communications" component={Communications} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
