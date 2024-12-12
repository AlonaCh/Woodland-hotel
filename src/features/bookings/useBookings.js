import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";


export function useBookings() {
    //here we can read the filtered value from the URL. Then pass it into the getBookings func to filter the bookings
    const [searchParams] = useSearchParams();

    //Filter
const filterValue = searchParams.get('status');
const filter = !filterValue || filterValue === 'all' ? null : 
{field: 'status', value: filterValue};
// {field: 'totalPrice', value: 5000, method: 'gte'};


const {
    isLoading,
    data: bookings,
    error,
} = useQuery({
queryKey: ['bookings', filter], //whenever filter is changes query will refetch the data. It is similar to dependancy array in useEffect hook
queryFn: ()=>getBookings({filter}),
});
return {isLoading, error, bookings};
}