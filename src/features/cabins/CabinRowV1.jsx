import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "../../cabins/useDeleteCabin";
import { HiSquare2Stack } from "react-icons/hi2";
import { IoPencil } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCreateCabin } from "../../cabins/useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  const {isDeleting, deleteCabin} = useDeleteCabin()
  const {isCreating, createCabin} = useCreateCabin()

const {id: cabinId, name, image, maxCapacity, regularPrice, discount, description} = cabin

 function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      image, maxCapacity, regularPrice, discount, description
    })
  }
  
  return (
    <>
    <Table.Row>
      <Img src={image}/>
      <Cabin>{name}</Cabin>
      <div>{maxCapacity} quests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <button disabled={isCreating} onClick={()=>handleDuplicate()}><HiSquare2Stack/></button>
      
<Modal>
  <Modal.Open opens='edit'>
     <button><IoPencil /></button>
      </Modal.Open>
    {/* Window open */}
    <Modal.Window name='edit'>
<CreateCabinForm cabinToEdit={cabin}/>
</Modal.Window>
     
     <Modal.Open opens='delete'>
      <button><FaRegTrashAlt /></button> 
      </Modal.Open>
      <Modal.Window name='delete'>
        <ConfirmDelete resourceName='cabins'
        disabled={isDeleting}
        onConfirm={()=>deleteCabin(cabinId)}
        />
      </Modal.Window>
      </Modal>

      <Menus.Menu>
      <Menus.Toggle id={cabinId}/>

      <Menus.List id={cabinId}>
        <Menus.Button icon={<HiSquare2Stack/>} onClick={()=>handleDuplicate()}>Duplicate</Menus.Button>
         <Menus.Button icon={<IoPencil/>}>Edit</Menus.Button>
          <Menus.Button icon={<FaRegTrashAlt/>}>Delete</Menus.Button>
      </Menus.List>
      </Menus.Menu>

      </div>
    </Table.Row>
          </>
  )}
// Add prop types validation
// CabinRow.propTypes = {
//   cabin: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     maxCapacity: PropTypes.number.isRequired,
//     regularPrice: PropTypes.number.isRequired,
//     discount: PropTypes.number, // Optional, since not all cabins might have a discount
//   }).isRequired,
// };

export default CabinRow