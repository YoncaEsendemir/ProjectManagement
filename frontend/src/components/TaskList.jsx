import React from 'react'

function TaskList({tasks,members,onEdit,onDelete}) {
        if(tasks.length===0){
            return <p className='text-xl text-slate-600 dark:text-slate-300 italic-center py-8'> Görev Eklenmedi</p>
        }
        const getMemberName= (id)=>{
            const member= members.find(m => m.id===id)
            return member ? member.name: 'Atanmamış'
        }
        //Dinamik renk Yönetimi
        const getStatusStyle = (status)=>{
            switch(status){
                case 'Yeni Görev':
                    return {badge:'bg-amber-50 text-amber-700 border-amber-200', cardBorder:'border-l-amber-500'};
                case 'Süren Görev':
                    return {badge:'bg-blue-50 text-blue-700 border-ablue-200', cardBorder:'border-l-blue-500'};
                case 'Biten Görev':
                    return {badge:'bg-green-50 text-green-700 border-green-200', cardBorder:'border-l-green-500'};
                default:
                    return {badge:'bg-slate-50 text-slate-700 border-slate-200', cardBorder:'border-l-slate-500'};
            }
        };
  return(
     <div>
        {tasks.map((task,index)=>{
            const styles=getStatusStyle(task.status);
            return(
                <div key={tasks.id} className={`p-3 border border-slate-300 border-l-[12px] ${styles.cardBorder} rounded-r-lg rounded-l-sm ${index %2==0 ? 'bg-white dark:bg-slate-900/80' : 'bg-blue-200/50 '} flex flex-col justify-between shadow-sm `}>
                <div>
                        <div className='flex justify-between items-start mb-2'>
                            <h3 className='text-lg font-semibold text-slate-900 dark:text-white/80 break-words'>{task.title}</h3>
                            <span className={`text-[16px] px-2 py-0.5 rounded-full border ${styles.badge} font-medium tracking-wide whitespace-nowrap`}>
                                {task.status}
                            </span>
                        </div>
                        <p className='text-[16px] text-slate-600 dark:text-white/80 mb-4'>{task.description ||'Açıklama belirtilmedi.'}</p>

                        {/* Tarih Bilgisi Gösterimi */}
                            <div className='text-sm text-slate-300 dark:text-slate-900 space-x-3 mb-2 bg-slate-100/70 p-1 rounded-md w-fit'>
                                <span>📅 <b>Başlangıç:</b> {task.startDate || '-'}</span>
                                <span>🏁 <b>Bitiş:</b> {task.endDate || '-'}</span>
                            </div>
                </div>

                <div className='flex justify-between items-center pt-2 border-t border-slate-200/60 mt-2'>
                <span className="text-[16px] text-gray-700 bg-white px-2 py-1 rounded border border-gray-100">
                Sorumlu: <strong className="text-gray-700">{getMemberName(task.assignedTo)}</strong>
              </span>
              <div className="flex space-x-1">
                <button onClick={() => onEdit(task)} className="text-lg text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition">
                  Düzenle
                </button>
                <button onClick={() => onDelete(task.id)} className="text-lg text-red-600 hover:bg-red-50 px-2 py-1 rounded transition">
                  Sil
                </button>
              </div>
                </div>
            </div>
            );
        })}
     </div>
  );
}

export default TaskList