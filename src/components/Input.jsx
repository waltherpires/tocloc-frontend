export default function Input({label, id, ...props}){
  return (
    <div className="mt-3">
      <label htmlFor={id} className="block text-base mb-2">{label}</label>
      <input id={id} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" {...props} />  
    </div>
  )
}