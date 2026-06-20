import React from 'react'

function MemberList({ members, onEdit, onDelete }) {
  if (members.length === 0) {
    return <p className='text-lg text-slate-600 dark:text-slate-300 italic-center py-8'> </p>
  }
  return (
    <div className='divide-y divide-slate-100 max-h-72 overflow-y-auto p-2'>
      {members.map((member,index) => (
        
        <div key={member.id} className={`p-3 flex justify-between items-start group rounded
        transsition-colors ${index %2==0 ? 'bg-white' : 'bg-blue-200/50'}`}>
          <div className='space-y-1.5 max-[80%]'>
            <h4 className='text-xl font-semibold text-slate-900 dark:text-slate-300'>{member.name}</h4>
            {/* Roller dizi yan yana etiketler - ?.map kullanarak hatayı engelledik */}
            <div className='flex flex-wrap gap-1'>
              {member.roles?.map((role, idx) => (
                <span key={idx} className="text-[15px] bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 font-medium">{role}</span>
              ))}
            </div>

            {/* Yetenekler */}
            {
              member.skills && member.skills.length > 0 && (
                <div className='flex flex-wrap gap-1 pt-1'>
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="text-[14px] bg-gray-100 text-gray-600 px-2 py-1 rounded">{skill}</span>
                  ))}
                </div>
              )}
          </div>
          <div className="flex space-x-1 opacity-100  group-hover:opacity-100 transition-opacity pt-2">
            <button onClick={() => onEdit(member)} className='text-lg text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition'>
              Düzenle
            </button>
            <button onClick={() => onDelete(member.id)} className='text-lg text-red-600 hover:bg-red-50 px-2 py-1 rounded transition'>
              Sil
            </button>
          </div>

        </div>
      ))

      }
    </div>
  )
}

export default MemberList