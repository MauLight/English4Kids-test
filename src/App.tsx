
import { ThemeProvider } from './context/themeContext'
import Layout from './Layout'

function App() {

  return (
    <main className='min-h-screen bg-sym_gray-800'>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </main>
  )
}

export default App
