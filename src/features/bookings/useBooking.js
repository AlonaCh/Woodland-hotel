import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../services/apiBookings"
import { useParams } from "react-router-dom";

export function useBooking() {

  const {bookingId} = useParams();

const {isLoading, 
    data: booking, //just react state. whenever new data is fetched, whenever this state updates the component will rerender
    error
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
  })
  return {isLoading, booking, error}
}