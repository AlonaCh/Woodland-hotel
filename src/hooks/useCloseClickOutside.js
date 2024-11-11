import { useEffect, useRef } from "react"

//Close the modal when clicking outside
  const useCloseClickOutside = (handler)=>{
      const ref = useRef()

      useEffect(()=>{

    function handleClickOutside(event){
      if(ref.current && !ref.current.contains(event.target)){
       handler() }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)}
  }), [handler]

  return ref
}
  export default useCloseClickOutside