import React from 'react'
import { Bell, ChevronDown, Settings } from 'lucide-react'

function Header() {
  return (
    <div className='w-full border-b border-slate-200/80 dark:border-slate-700/80 backdrop-blur-xl bg-blue-300/50 dark:bg-slate-900/80'>
       {/* max-w-5xl kaldırıldı, tüm ekrana yayılması için w-full yapıldı */}
       <div className='flex w-full items-center justify-between gap-3 px-6 py-3'>
            
            {/* Sol Taraf: Tamamen Sol Köşede Kalacak Başlık Alanı */}
            <div className='hidden md:block'>
                <h1 className='text-2xl font-black text-slate-800 dark:text-white'>Proje Yönetim Paneli</h1>
                <span className='text-xl font-medium text-slate-500 dark:text-slate-400'>Proje yönetim uygulamasına hoş geldiniz</span>
            </div>

            {/* Sağ Taraf: Tamamen Sağ Köşede Kalacak Aksiyon Alanı */}
            <div className='flex items-center space-x-3'>
                {/* Notification */}
                <button className='relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
                    <Bell className='w-8 h-8'/>
                    <span className='absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center'>3</span>
                </button>
                
                {/* Settings */}
                <button className='p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
                    <Settings className='w-8 h-8'/>
                </button>

                {/* User Profile */}
                <div className='flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700'>
                    <img className='w-10 h-10 rounded-full ring-2 ring-blue-500' src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80" alt="user" />
                    <div className='hidden md:block text-left'>
                        <p className='text-2xl font-semibold text-slate-800 dark:text-slate-200 leading-tight'>AdminName</p>
                        <p className='text-lg text-slate-900 dark:text-slate-400 leading-tight'>Administrator</p>
                    </div>
                    <ChevronDown className='w-4 h-4 text-slate-400'/>
                </div>
            </div>

       </div>
    </div>
  )
}

export default Header