import React from 'react'

function TaskList({tasks,members,onEdit,onDelete}) {
        if(tasks.length===0){
            return <p className='text-sm text-slate-600 dark:text-slate-300 italic-center py-8'> Görev Eklenmedi</p>
        }
        const getMemberName= (id)=>{
            const member= members.find(m => m.id===id)
            return member ? member.name: 'Atanmamış'
        }
        //Dinamik renk Yönetimi
        const getStatusStyle = (status)=>{
            switch(status){
                
            }
        }
  return(
    <div>
        
    </div>
  )
}

export default TaskList