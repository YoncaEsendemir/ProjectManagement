import React, {useState,useEffect} from 'react'


function TaskForm({onSave,editingTask,members,onCancel}) {
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [assignedTo,setAssignedTo]=useState('');
    const [status,setStatus]=useState('Yeni Görev');
    // tarihler eklendı yani görev başlangiç ve bitiş tarihi ekledım varsayım bügünün tarihi olarak alındı
    const [startDate,setStartDate]=useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(()=>{
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setAssignedTo(editingTask.assignedTo);
            setStatus(editingTask.status);
            setStartDate(editingTask.startDate || new Date().toISOString().split('T')[0]);
            setEndDate(editingTask.endDate || new Date().toISOString().split('T')[0]);
        }else{
            setTitle('');
            setDescription('');
            setAssignedTo('');
            setStatus('Yeni Görev');
            setStatus('Yeni Görev');
            setStartDate(new Date().toISOString().split('T')[0]);
            setEndDate(new Date().toISOString().split('T')[0]);
        }
    },[editingTask])

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!title.trim())return;
        onSave({title,description,assignedTo,status,startDate, endDate});
        setTitle('');
        setDescription('');
        setAssignedTo('');
        setStatus('Yeni Görev');
        setStatus('Yeni Görev');
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date().toISOString().split('T')[0]);
    };

  return (
   <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
            <label className='block text-xl font-medium text-slate-900 dark:text-slate-300 mb-2'>Görev Başliği</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Yapılacak işin tanımı'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500' required/>
        </div>

        <div>
            <label className='block text-xl font-medium text-slate-900 dark:text-slate-300 mb-2'>Açıklama</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Görev detayları' rows="2"
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500'/>
        </div>

        {/* Tarih Alanları */}
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <label className='block text-xl font-medium text-slate-900 mb-1'>Başlangıç Tarihi</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500' required />
                </div>
                <div>
                    <label className='block text-xl font-medium text-slate-900 mb-1'>Bitiş Tarihi</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                        className='w-full px-3 py-2 border border-slate-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500' required />
                </div>
            </div>  


        <div>
            <label className='block text-xl font-medium text-slate-900 dark:text-slate-300 mb-2'>Sorumlu Üye</label>
                <select value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)}
                    className='w-full px-3 py-2 border border-slate-300  rounded-lg text-lg bg-white-80 focus:outline-none focus:border-indigo-500'>
                        <option value="">Seçınız...</option>
                        {
                            members.map(m=>(
                                <option key={m.id} value={m.id}> {m.name}</option>
                            ))
                        }
                </select>
        </div>

        <div>
            <label className='block text-lg font-medium text-slate-900 mb-2'>Durum</label>
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className='w-full px-2 py-2 border-slate-300 rounded-lg text-lg  bg-white-80 focus:outline-none focus:border-indigo-500'>
                <option value="Yeni Görev">Yeni Görev (Sarı)</option>
                <option value="Süren Görev">Süren Görev (Mavi)</option>
                <option value="Biten Görev">Biten Görev (Yeşil)</option>
            </select>
        </div>

        <div className='flex space-x-2 pt-2'>
            <button type='submit' className='flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg text-xl font-medium hover:bg-indigo-700 transition'>
                        {editingTask ? 'Görev Güncelle': 'Görev Ekle'}
            </button>
            {
                editingTask &&(
                    <button type="button" onClick={onCancel} className='bg-slate-300 text-slate-900 py-2 px-3 rounded-lg text-lg font-medium hover:bg-slate-400 transition' >
                        iptal
                    </button>
                )
            }
        </div>
   </form> 
  )
}

export default TaskForm