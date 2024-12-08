// import styled from 'styled-components';
import BookingRow from './BookingRow';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';
import { useBookings } from './useBookings'; //named export
import Spinner from '../../ui/Spinner';


function BookingTable() {
  const {bookings, isLoading} = useBookings();

  if(isLoading) return <Spinner/>
  
  if(!bookings.length) return <Empty resourceName='bookings'/>;

  return (
    <Menus>
      
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {/* {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))} */}

        {/* Render props! */}
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

      </Table>
    </Menus>
  );
}


export default BookingTable;
