import { lazy, Suspense } from 'react'

const Home = lazy(async () => await import('./routes/Home'))

function Layout() {
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <Home />
            </Suspense>
        </div>
    )
}

export default Layout