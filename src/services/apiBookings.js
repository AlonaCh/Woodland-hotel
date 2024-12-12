// import { getToday } from "../utils/helpers";
import supabase from "./supabase";


// export async function getBookings({filter, sort}) {
//   const {data, error} = await supabase
//   .from('bookings')
//   .select('id, created_at, startDate, endDate, numberNights, numberGuests,status, totalPrice, cabins(name), guests(fullName, email)'); //select data from foreign tables
  
//   if(error){
//     console.error(error);
//     throw new Error('Bookings could not get loaded');
//   }
//   return data;
// }

export async function getBookings({filter, sort}) {
   let query = supabase
  .from('bookings')
  .select('id, created_at, startDate, endDate, numberNights, numberGuests,status, totalPrice, cabins(name), guests(fullName, email)'); //select data from foreign tables
  
  //Filter
 
  if (filter) 
    query = query[filter.method || "eq"](filter.field, filter.value);

  //Sort
  if (sort)
    query = query.order(sort.field, {ascending: sort.direction === 'asc'});
  

  const {data, error} = await query;
   console.log('Filter:', filter);

  if(error){
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

