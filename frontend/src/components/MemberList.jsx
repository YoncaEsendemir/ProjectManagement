import React from 'react'

function MemberList({ members, onEdit, onDelete }) {
  if (members.length === 0) {
    return <p className='text-sm text-slate-600 dark:text-slate-300 italic-center py-8'> </p>
  }
  return (
    <div className='divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1'>
      {members.map((member,index) => (
        <div key={member.id} className={`py-3 flex justify-between items-start group rounded
        transsition-colors ${index %2==0 ? 'bg-white' : 'bg-blue-200/50'}`}>
          <div className='space-y-1.5 max-[80%]'>
            <h4 className='text-sm font-semibold text-slate-900 dark:text-slate-300'>{member.name}</h4>
            {/* Roller dizi yan yana etiketler - ?.map kullanarak hatayı engelledik */}
            <div className='flex flex-wrap gap-1'>
              {member.roles?.map((role, idx) => (
                <span key={idx} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 font-medium">{role}</span>
              ))}
            </div>

            {/* Yetenekler */}
            {
              member.skills && member.skills.length > 0 && (
                <div className='flex flex-wrap gap-1 pt-1'>
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded">{skill}</span>
                  ))}
                </div>
              )}
          </div>
          <div className="flex space-x-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity pt-1">
            <button onClick={() => onEdit(member)} className='text-xs bg-slate-100 hover:bg-red-600 px-2 py-1 rounded transition'>
              Düzenle
            </button>
            <button onClick={() => onDelete(member.id)} className='text-xs bg-slate-100 hover:bg-red-600 px-2 py-1 rounded transition'>
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