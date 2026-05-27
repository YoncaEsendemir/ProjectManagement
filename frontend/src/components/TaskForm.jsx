import React, {useState,useEffect} from 'react'


function TaskForm({onSave,editingTask,members,onCancel}) {
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [assignedTo,setAssignedTo]=useState('');
    const [status,setStatus]=useState('Yeni Görev');

    useEffect(()=>{
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setAssignedTo(editingTask.assignedTo);
            setStatus(editingTask.status);
        }else{
            setTitle('');
            setDescription('');
            setAssignedTo('');
            setStatus('Yeni Görev');
        }
    },[editingTask])

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!title.trim())return;
        onSave({title,description,assignedTo,status});
        setTitle('');
        setDescription('');
        setAssignedTo('');
        setStatus('Yeni Görev');
    };

  return (
   <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
            <label className='block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2'>Görev Başliği</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Yapılacak işin tanımı'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500' required/>
        </div>

        <div>
            <label className='block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2'>Açıklama</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Görev detayları' rows="2"
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2'>Sorumlu Üye</label>
                <select value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)}
                    className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-indigo-500'>
                        <option value="">Seçınız...</option>
                        {
                            members.map(m=>(
                                <option key={m.id} value={m.id}> {m.name}</option>
                            ))
                        }
                </select>
        </div>

        <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Durum</label>
        </div>
   </form> 
  )
}

export default TaskForm