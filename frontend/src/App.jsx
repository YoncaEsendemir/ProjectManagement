import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

function App() {
  

  return (
    <>
       <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-200 to-indigo-50 
    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500'>
            <Header/>  
       <main className='bg-white/80 dark:bg-slate-800/80  overflow-hidden mx-auto px-4 py-5 sm:px-6 lg:px-8'>
        <Dashboard/>
       </main>
       </div>
    </>
  )
}

export default App
