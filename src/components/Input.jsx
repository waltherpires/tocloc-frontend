export default function Input({label, id, ...props}){
  return (
    <div className="mt-2">
      <label htmlFor={id} className="block text-xs sm:text-sm md:text-base mb-1 md:mb-2">{label}</label>
      <input id={id} className="border w-full text-xs sm:text-sm px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" {...props} /> 
    </div>
  )
}