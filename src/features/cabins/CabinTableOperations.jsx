import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import Sort from '../../ui/Sort'

const CabinTableOperations = () => {
  return (
    <TableOperations>
        <Filter filteredField='discount'
        options={[
            {value: 'all', label: 'All'},//each of the objects for one button
            {value: 'withDiscount', label: 'With discount'},
            {value: 'noDiscount', label: 'No discount'}
        ]}/>

        <Sort
        options={[
            {value: 'name-asc', label: 'By name (A-Z)'},
            {value: 'name-desc', label: 'By name (Z-A)'},
            {value: 'regularPrice-asc', label: 'By price (low to high)'},
            {value: 'regularPrice-desc', label: 'By price (high to low)'},
            {value: 'naxCapacity-asc', label: 'By capacity (low to high)'},
            {value: 'maxCapacity-desc', label: 'By capacity (high to low)'}
        ]}/>
    </TableOperations>
  )
}

export default CabinTableOperations