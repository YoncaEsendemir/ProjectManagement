import React from 'react'
import { Bell, ChevronDown, Filter,  Search, Settings, Sun } from 'lucide-react'

function Header() {
  return (
    <div className='border-b border-slate-200/80 dark:border-slate-700/80 backdrop-blur-xl bg-blue-300/50 dark:bg-slate-900/80 border'>
       <div className='flex max-w-5xl items-center justify-between gap-3 px-2 py-3'>
             <div className='hidden md:block'>
                <h1 className='text-2xl px-3 py-1 font-black text-slate-800 drak:text-white'>Proje Yönetim Paneli</h1>
                <span className='text-lg font-medium px-3 py-1 rounded-full font-medium text-slate-800 drak:text-white'>Proje yönetim Uygulamasına hoşgeldiniz</span>
                </div>

               <div className='flex items-center space-x-3 '>
                {/*Quic Action */}
                    {/*Toggle */}

                    {/*Notification */}
                    <button className='relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300
                    hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
                        <Bell className='w-5 h-5'/>
                        <span className='absolute -top-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex
                        items-center justify-center'>3</span>
                    </button>
                    {/*Setting */}
                    <button className='p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100
                    dark:hover:bg-slate-800 transition-colors'>
                        <Settings className='w-5 h-5'/>
                    </button>

                    {/* user profile */}
                    <div className='flex items-center space-x-3 pl-3 border-l border-slate-200'>
                        <img className='w-8 h-8 rounded-full ring-blue-500' src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80" alt="user" />
                        <div className='hidden md:block'>
                            <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>AdminName</p>
                            <p className='text-xs text-slate-500 dark:text-slate-400'>Adninistratot</p>
                        </div>
                        <ChevronDown className='w-4 h-4 text-slate-400'/>
                    </div>
                </div>
       </div>
    </div>
  )
}

export default Header