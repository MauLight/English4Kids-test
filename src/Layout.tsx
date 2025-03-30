import { lazy, Suspense } from 'react'
import Fallback from './components/fallback'

const Home = lazy(async () => await import('./routes/Home'))

function Layout() {
    return (
        <div>
            <Suspense fallback={<Fallback />}>
                <Home />
                <Fallback />
            </Suspense>
        </div>
    )
}

export default Layout