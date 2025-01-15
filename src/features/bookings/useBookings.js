import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";


export function useBookings() {
    //query client hook
    const queryClient = useQueryClient();

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

//Pagination
const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
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
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  // Safely extract data
  const bookings = data?.data || [];
  const count = data?.count || 0;

  //Pre/fetching data
  //we need to prefetch next page data when the current page is loaded
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if(page < pageCount)
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sort, page + 1],
    queryFn: () => getBookings({ filter, sort, page: page +1 }),
  });

  if(page > 1)
     queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sort, page - 1],
    queryFn: () => getBookings({ filter, sort, page: page -1 }),
  });

  return { isLoading, error, bookings, count };
}