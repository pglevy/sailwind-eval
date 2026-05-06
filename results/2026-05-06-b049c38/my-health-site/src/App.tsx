import { Route, Router, Switch } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import Home from './pages/home'
import NotFound from './pages/not-found'
import PatientPortal from './pages/patient-portal'

const pages = [
  { path: '/', title: 'Home', component: Home },
  { path: '/patient-portal', title: 'Patient Portal', component: PatientPortal },
]

function App() {
  return (
    <Router hook={useHashLocation}>
      <div className="min-h-screen bg-gray-50">
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
