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

// Sort
//to get the data, pass to getBookings func

const sortRaw = searchParams.get('sort') || 'startDate-desc';

//split it into an array
const [field, direction] = sortRaw.split('-');
const sort = {field, direction};

// const {
//     isLoading,
//     data: {data: bookings, count},
//     error,
// } = useQuery({
// queryKey: ['bookings', filter, sort], //whenever filter is changes query will refetch the data. It is similar to dependancy array in useEffect hook
// queryFn: ()=>getBookings({filter, sort}),
// });
// return {isLoading, error, bookings, count};
// }


  // Fetch data with react-query
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings({ filter, sort }),
  });

  // Safely extract data
  const bookings = data?.data || [];
  const count = data?.count || 0;

  return { isLoading, error, bookings, count };
}