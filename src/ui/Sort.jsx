import { useSearchParams } from "react-router-dom";
import Select from "./Select"

const Sort = ({options}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    function handleChange(e){
        searchParams.set('sort', e.target.value)
        setSearchParams(searchParams)
    }

  return (
    <Select options={options} type='white' onChange={handleChange}/>
  )
}

export default Sort