export default function Container({title, children, styleTitle = ""}){

  return (
    <div className="
      p-4 
      sm:px-14 
      sm:py-8 
      bg-gradient-to-b 
      from-[#363636] 
      flex 
      flex-col 
      gap-1 
      justify-start 
      items-center 
      rounded">
      {title && <h1 className={`md:text-6xl font-logo text-center font-bold text-white shadow-md mb-3 sm:mb-6 ${styleTitle}`}>{title}</h1>}
      {children}
    </div>
  )
}