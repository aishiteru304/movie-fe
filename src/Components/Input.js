export const UsedInput = ({ label, placeholder, type, bg, value, onChange }) => {
    return (
        <div className='text-sm w-full'>
            <label className='text-border font-semibold'>{label}</label>
            <input type={type} required className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${bg ? 'bg-main' : 'bg-dry'}`} placeholder={placeholder} value={value} onChange={onChange}></input>
        </div>
    )
}