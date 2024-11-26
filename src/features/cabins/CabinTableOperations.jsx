import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'

const CabinTableOperations = () => {
  return (
    <TableOperations>
        <Filter filteredField='discount'
        options={[
            {value: 'all', label: 'All'},//each of the objects for one button
            {value: 'withDiscount', label: 'With discount'},
            {value: 'noDiscount', label: 'No discount'}
        ]}/>

    </TableOperations>
  )
}

export default CabinTableOperations