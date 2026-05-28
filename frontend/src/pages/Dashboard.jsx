import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import MemberForm from '../components/MemberForm';
import MemberList from '../components/MemberList';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
// Şifreleme için gizli anahtar (Normalde .evn dosyalarında saklanır proje yayına alirken sorun yaşanmasın diye burada sakladım)
const SECRET_KEY = 'qlI/T*_giO.ETuB2j2.+';
function Dashboard() {

// Veriyi şifreleyip LocalStorage'a kaydetme 
const encryptAndSave=(key,data)=>{
    const stringData= JSON.stringify(data); // veriyi metine çevirir
    const encrypted= CryptoJS.AES.encrypt(stringData,SECRET_KEY).toString()// şifreleniyor
    localStorage.setItem(key,encrypted)
}
// LocalStorage'dan şifreli veriyi çözüp okuma

    const getAndDecrypt=(key)=>{
        const encrytedData= localStorage.getItem(key);
        if(!encrytedData) return []; // veri yoksa boş dizi gönder
        try{
            const bytes= CryptoJS.AES.decrypt(encrytedData,SECRET_KEY)// Şifreyi çözüyor
            const decryptedText=bytes.toString(CryptoJS.enc.Utf8) // metine çeviriyoruz
            return JSON.parse(decryptedText); //Tekrar JavaScript dizisine çeviriyoruz
        }catch(err){
            console.error("Veri şifresi çözülürken hata oluştu, veriler sıfırlandı.", error);
          return [];
        }
    };

    // State Yönetimi
    const [members,setMembers]=useState(() => getAndDecrypt('pm_members'));
    const [tasks,setTasks]=useState(()=>getAndDecrypt('pm_tasks'));

    const [editingMember,setEditingMember]=useState(null);
    const [editingTask, setEditingTask]=useState(null);


    // veriler değiştiğinde şifrelenir ve LocalStorage kayit edilir
    useEffect(()=>{
        encryptAndSave('pm_members',members);
    },[members]);

    useEffect(()=>{
        encryptAndSave('pm_tasks',tasks)
    },[tasks]);

    // Üye CURD İşlemleri
    const saveMembers= (memberData)=>{
        if(editingMember){
            setMembers(members.map(m=>m.id === editingMember.id ? {...m, ...memberData}: m));
            setEditingMember(null);
        }
        else{
            const newMember = {id: Date.now().toString(),...memberData};
            setMembers([...members,newMember]);
        }
    }

    const saveTask= (taskData)=>{
        if(editingTask){
         setEditingTask(tasks.map(t=>t.id=== editingTask.id ?{...t,...taskData}:t));  
        setEditingTask(null);
        }
        else{
            const newTask = {id:Date.now().toString, ...taskData};
            setTasks([...tasks,newTask])
        }
    }

    const deleteMembers= (id)=>{
        saveMembers(members.filter(m=>m.id!=id));
        setTasks(tasks.map(t=>t.assignedTo === id ?{...t,assignedTo:''}:t));
    }



    
    const deleteTask=(id)=>{
        setTasks(tasks.filter(t=>t.id!=id));
    };


  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* sol sütun giriş formları */}
        <div className='lg:col-span-1 flex flex-col space-y-6'>
            <div className='bg-white/80 dark:bg-slate-900/80 p-6 rounded-xl border border-slate-200 shadow-sm'>
            <h2 className='text-base font-semibold mb-4 text-slate-900'>
                {editingMember ? 'Üyeyi Düzenle' : 'Yeni Üye Ekle'}
            </h2>
            <MemberForm onSave={saveMembers} editingMember={editingMember} onCancel={()=>setEditingMember(null)}/>
            </div>
          <div className='bg-white/80 p-6 rounded-xl border border-slate-200 shadow-sm'>
                <h2 className='text-base font-semibold mb-4 text-slate-900'>
                    {editingTask ? 'Görev Düzenle':'Yeni Görev Ekle'}
                </h2>
                <TaskForm onSave={saveTask} editingTask={editingTask} members={members} onCancel={()=>setEditingTask(null)}/>
          </div>
        </div>

        {/*Sağ Sütun: görüntüleme ve yönetim listeleri */}
        {/*
        col-span-2: İlgili öğenin veya kutunun, bağlı olduğu grid sisteminde yatay olarak 2 sütunluk yer kaplamasını sağlar */}
        <div className='lg:col-span-2 flex flex-col space-y-6'>
            <div className='bg-white-80 p-6 rounded-xl border border-slate-200 shadow-sm'>
                <div className='border-b border-slate-300 dark:border-slate-100 pb-3 mb-4'>
                    <h2 className='text-base font-semibold text-slate-900 dark:text-white/80'>Üye Listesi ({members.length})</h2>
                    <p className='text-xs mt-1 text-slate-900'>Ekip Üyeleri, rolleri ve yetenekleri</p>
                </div>
                <MemberList members={members} onEdit={setEditingMember} onDelete={deleteMembers}/>
            </div>

            {/* Görevler listelenecek burada */}
            <div className='bg-white-80 p-6 rounded-xl border border-slate-200 shadow-sm'>
                <div className='border-b border-slate-300 dark:border-slate-100 pb-3 mb-4'>
                <h2 className='text-base font-semibold text-slate-900 dark:text-white/80'> Görev Listesi ({tasks.length})</h2>
                <p className='text-xs mt-1 text-slate-900'>İş takibi alanı</p>
                </div>
                 <TaskList tasks={tasks} members={members} onEdit={setEditingTask} onDelete={deleteTask}/>
            </div>


        </div>
    </div>
  )
}

export default Dashboard