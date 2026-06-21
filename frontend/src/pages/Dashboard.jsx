import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import MemberForm from '../components/MemberForm';
import MemberList from '../components/MemberList';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const SECRET_KEY = 'qlI/T*_giO.ETuB2j2.+';

function Dashboard() {

    // Veriyi şifreleyip LocalStorage'a kaydetme 
    const encryptAndSave = (key, data) => {
        const stringData = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
        localStorage.setItem(key, encrypted);
    }

    // LocalStorage'dan şifreli veriyi çözüp okuma
    const getAndDecrypt = (key) => {
        const encryptedData = localStorage.getItem(key);
        if (!encryptedData) return [];
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedText);
        } catch (err) {
            // HATA DÜZELTİLDİ: 'error' yerine catch bloğundaki 'err' değişkeni yazıldı.
            console.error("Veri şifresi çözülürken hata oluştu, veriler sıfırlandı.", err);
            return [];
        }
    };

    // State Yönetimi
    const [members, setMembers] = useState(() => getAndDecrypt('pm_members'));
    const [tasks, setTasks] = useState(() => getAndDecrypt('pm_tasks'));

    const [editingMember, setEditingMember] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    // Takvim için Ay/Yıl State'i
    const [currentDate, setCurrentDate] = useState(new Date());

    // Veriler değiştiğinde şifrelenir ve LocalStorage'a kayıt edilir
    useEffect(() => {
        encryptAndSave('pm_members', members);
    }, [members]);

    useEffect(() => {
        encryptAndSave('pm_tasks', tasks);
    }, [tasks]);

    // Üye CRUD İşlemleri
    const saveMembers = (memberData) => {
        if (editingMember) {
            setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...memberData } : m));
            setEditingMember(null);
        } else {
            const newMember = { id: Date.now().toString(), ...memberData };
            setMembers([...members, newMember]);
        }
    }

    // Görev CRUD İşlemleri
    const saveTask = (taskData) => {
        if (editingTask) {
            setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
            setEditingTask(null);
        } else {
            const newTask = { id: Date.now().toString(), ...taskData };
            setTasks([...tasks, newTask]);
        }
    }

    const deleteMembers = (id) => {
        setMembers(members.filter(m => m.id != id));
        setTasks(tasks.map(t => t.assignedTo === id ? { ...t, assignedTo: '' } : t));
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id != id));
    };

    // --- TAKVİM HESAPLAMA MANTIĞI ---
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarCells = [];
    for (let i = 0; i < startOffset; i++) {
        calendarCells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        calendarCells.push(new Date(year, month, d));
    }

    const getTasksForDate = (date) => {
        if (!date) return [];
        const dateStr = date.toISOString().split('T')[0];
        return tasks.filter(t => {
            return t.startDate <= dateStr && t.endDate >= dateStr;
        });
    };

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-4'>
            {/* Sol Sütun: Giriş Formları */}
            <div className='lg:col-span-1 flex flex-col space-y-6'>
                <div className='bg-slate-200/50 dark:bg-slate-900/80 p-6 rounded-xl border border-slate-300 shadow-sm'>
                    <h2 className='text-3xl font-semibold mb-4 text-slate-900 dark:text-white'>
                        {editingMember ? 'Üyeyi Düzenle' : 'Yeni Üye Ekle'}
                    </h2>
                    <MemberForm onSave={saveMembers} editingMember={editingMember} onCancel={() => setEditingMember(null)} />
                </div>
                <div className='bg-slate-200/50 p-6 rounded-xl border border-slate-300 shadow-sm'>
                    <h2 className='text-3xl font-semibold mb-4 text-slate-900'>
                        {editingTask ? 'Görev Düzenle' : 'Yeni Görev Ekle'}
                    </h2>
                    <TaskForm onSave={saveTask} editingTask={editingTask} members={members} onCancel={() => setEditingTask(null)} />
                </div>
            </div>

            {/* Sağ Sütun: Görüntüleme, Yönetim Listeleri ve Takvim */}
            <div className='lg:col-span-2 flex flex-col space-y-6'>
                <div className='bg-slate-200/50 p-6 rounded-xl border border-slate-200 shadow-sm'>
                    <div className='border-b border-slate-300 dark:border-slate-100 pb-3 mb-4'>
                        <h2 className='text-3xl font-semibold text-slate-900 dark:text-white/80'>Üye Listesi {members.length}</h2>
                        <p className='text-xl mt-1 text-slate-900'>Ekip Üyeleri, rolleri ve yetenekleri</p>
                    </div>
                    <MemberList members={members} onEdit={setEditingMember} onDelete={deleteMembers} />
                </div>

                <div className='bg-slate-200/50 p-6 rounded-xl border border-slate-200 shadow-sm'>
                    <div className='border-b border-slate-300 dark:border-slate-100 pb-3 mb-4'>
                        <h2 className='text-3xl font-semibold text-slate-900 dark:text-white/80'> Görev Listesi {tasks.length} </h2>
                        <p className='text-xl mt-1 text-slate-900'>İş takibi alanı</p>
                    </div>
                    <TaskList tasks={tasks} members={members} onEdit={setEditingTask} onDelete={deleteTask} />
                </div>

                {/* Proje Görev Takvimi */}
                <div className='bg-slate-200/50 p-6 rounded-xl border border-slate-200 shadow-sm w-full '>
                    <div className='flex justify-between items-center border-b border-slate-200 pb-4 mb-4 '>
                        <div>
                            <h2 className='text-2xl font-bold text-slate-900'>📅 Proje Görev Takvimi</h2>
                            <p className='text-xl text-slate-500 mt-0.5'>Görevlerin tarih aralıklarına göre takvim simülasyonu</p>
                        </div>
                        <div className='flex items-center space-x-2 bg-slate-100 p-2 rounded-lg text-lg font-medium'>
                            <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className='px-2 py-1 hover:bg-white rounded transition shadow-xs'>◀</button>
                            <span className='w-28 text-center'>{monthNames[month]} {year}</span>
                            <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className='px-2 py-1 hover:bg-white rounded transition shadow-xs'>▶</button>
                        </div>
                    </div>

                    {/* Gün İsimleri Satırı */}
                    <div className='grid grid-cols-7 gap-1 text-center text-lg font-semibold text-slate-500 mb-1'>
                        <div>Pzt</div><div>Sal</div><div>Çar</div><div>Per</div><div>Cum</div><div>Cmt</div><div>Paz</div>
                    </div>

                    {/* Takvim Grid Hücreleri */}
                    <div className='grid grid-cols-7 gap-2 auto-rows-[100px]  '>
                        {calendarCells.map((cellDate, idx) => {
                            const dayTasks = getTasksForDate(cellDate);
                            const isToday = cellDate && cellDate.toDateString() === new Date().toDateString();

                            return (
                                <div key={idx} className={`p-1 border rounded-lg flex flex-col justify-between transition ${cellDate ? 'bg-slate-50/50 border-slate-200' : 'bg-slate-100/30 border-transparent'} ${isToday ? 'ring-2 ring-indigo-500 bg-indigo-50/20' : ''}`}>
                                    {cellDate ? (
                                        <>
                                            <span className={`text-lg font-bold px-2 py-1 rounded w-fit ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-700'}`}>
                                                {cellDate.getDate()}
                                            </span>
                                            {/* Günün Görevleri */}
                                            <div className='flex-1 overflow-y-auto space-y-1 mt-1 text-[16px] custom-scrollbar'>
                                                {dayTasks.map(t => {
                                                    let colorClass = 'bg-amber-100 text-amber-800 border-amber-300';
                                                    if (t.status === 'Süren Görev') colorClass = 'bg-blue-100 text-blue-800 border-blue-300';
                                                    if (t.status === 'Biten Görev') colorClass = 'bg-green-100 text-green-800 border-green-300';
                                                    
                                                    return (
                                                        //  stil şablonuna dahil edildi.
                                                        <div key={t.id} className={`px-1 py-1 rounded border truncate font-medium ${colorClass}`} title={t.title}>
                                                            {t.title}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard