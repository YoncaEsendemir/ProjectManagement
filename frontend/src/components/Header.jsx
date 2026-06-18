import React from 'react'

function Header() {
  return (
    <div className='border-b border-slate-200/80 dark:border-slate-700/80 backdrop-blur-xl bg-blue-100/50 dark:bg-slate-900/80 border'>
       <div className='flex max-w-5xl items-center justify-between gap-3 px-2 py-3'>
             <div className='hidden md:block'>
                <h1 className='text-2xl px-3 py-1 font-black text-slate-800 drak:text-white'>Proje Yönetim Paneli</h1>
                <span className='text-lg font-medium px-3 py-1 rounded-full font-medium text-slate-800 drak:text-white'>Proje yönetim Uygulamasına hoşgeldiniz</span>
             </div>
       </div>
    </div>
  )
}

export default Header