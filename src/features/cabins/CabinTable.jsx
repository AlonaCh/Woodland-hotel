import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "../../cabins/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";



const CabinTable = () => {
  const {isLoading, cabins} = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner/>

  //1) Filter cabins based on the discount query parameter
  const filterValue = searchParams.get('discount') || 'all';
console.log(filterValue)
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;

  if (filterValue === 'withDiscount') filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  if (filterValue === 'noDiscount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  
  //2) Sort cabins based on the sort query parameter
const sort = searchParams.get('sort') || 'name-asc';
const [field, direction] = sort.split('-'); //splitting the string into array
const modifier = direction === 'asc' ? 1: -1;
const sortedCabins = filteredCabins.sort((a,b)=> (a[field] - b[field]) * modifier);

  return (
    <Menus>
    {/* //we want to pass column definiton to this table */}
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'> 
      <Table.Header role='row'>
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Book</div>
      </Table.Header>

      {/* <Table.Body>
      {cabins.map((cabin) => (
      <CabinRow cabin={cabin} key={cabin.id} />
      ))}
      </Table.Body> */}
 <Table.Body
//  data={cabins}
 data = {filteredCabins}
 render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}
 />
      </Table>
      </Menus>
  )
}

export default CabinTable