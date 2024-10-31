import { useQuery } from "@tanstack/react-query"
import { getCabins } from "../services/apiCabins"

export function useCabins() {
const {isLoading, 
    data: cabins, //just react state. whenever new data is fetched, whenever this state updates the component will rerender
    error
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  })
  return {isLoading, cabins, error}
}