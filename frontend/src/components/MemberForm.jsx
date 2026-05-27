import React, {useState, useEffect} from 'react'

function MemberForm({onSave, editingMember,onCancel}) {
    //Üye kayit için değişkenler tanımlanıyor
    const [name, setName] = useState('');
    const [rolesInput, setRolesInput] = useState('');
    const [skillsInput, setSkillsInput] = useState('');

    useEffect(()=>{
        if(editingMember){
            setName(editingMember.name);
            setRolesInput(editingMember.roles.join(','));
            setSkillsInput(editingMember.skills.join(','))
        }
        else{
            setName('');
            setRolesInput('');
            setSkillsInput('');
        }
    },[editingMember]);


const handleSubmit=(e)=>{
    e.preventDefault();
    if (!name.trim()) return;
    const roles= rolesInput.split(',').map(r=>r.trim()).filter(r=>r!=='');
    const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    onSave({name,rols,skills});
    setName('');
    setRolesInput('');
    setSkillsInput('');
};

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-salte-800/50 dark:text-white/80 mb-1'> Ad Soyad</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Üye Ad" required className="w-full px-3 py-2 border border-slate-400 rounded-lg text-sm focus:outline-none"/>
        </div>

        <div>
            <label className='block text-sm font-medium text-slate-800/50 dark:text-white/80 mb-1'>Roller</label>
            <input type="text" value={rolesInput}  onChange={(e)=>setRolesInput(e.target.value)} required placeholder="Örn. Frontend Developer, Full-Stack" className="w-full px-3 py-2 border border-slate-400 rounded-lg text-sm focus:outline-none"/>
        </div>

        <div>
            <label className='block text-sm font-medium text-slate-800/50 dark:text-white/80 mb-1'>Roller</label>
            <input type="text" value={skillsInput}  onChange={(e)=>setSkillsInput(e.target.value)} required placeholder="Örn. Java, C, JavaScript" className="w-full px-3 py-2 border border-slate-400 rounded-lg text-sm focus:outline-none"/>
        </div>
        <div className="flex space-x-2 pt-2">
            <button type="submit" className='flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transitions'> {editingMember ? 'Güncelle' : 'Kaydet'}</button>
            {editingMember && (
          <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
            İptal
          </button>
        )}
        </div>
    </form>
  )
}

export default MemberForm

