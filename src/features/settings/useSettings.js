import { getSettings } from "../../services/apiSettings"

const useSettings = () => {
const {isLoading, error, data: settings,} = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings, //return a promise (async function)
})

  return {isLoading, error, settings}
}

export default useSettings