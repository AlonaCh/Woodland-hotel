import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers";
import PropTypes from 'prop-types';
import { useMutation } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";


const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


const CabinRow = ({cabin}) => {
const {id: cabinId, name, image, maxCapacity, regularPrice, discount} = cabin

  const {isLoading: isDeleting, mutate} = useMutation({
    mutationFn: (id) => deleteCabins(id) //callback function, recieve the id then call the deleteCabins function.//mutationFn:deleteCabin
  })

  
  return (
    <TableRow role='row'>
      <Img src={image}/>
      <Cabin>{name}</Cabin>
      <div>{maxCapacity} quests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button onClick={()=>mutate(cabinId)} disabled={isDeleting}>Delete</button>
    </TableRow>
  )
}
// Add prop types validation
CabinRow.propTypes = {
  cabin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number, // Optional, since not all cabins might have a discount
  }).isRequired,
};

export default CabinRow