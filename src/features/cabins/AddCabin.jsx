// import { useState } from "react";
// import Button from "../../ui/Button";
// import Modal from "../../ui/Modal";
// import CreateCabinForm from "./CreateCabinForm";

// function AddCabin() {
//     //compounds the AddCabin component with the CreateCabinForm component
//     return (
//     <Modal>
//         <Modal.Open opens='cabin-form'> 
//         <Button>Add new cabin</Button>
//         </Modal.Open>
//             <Modal.Window name='cabin-form'>
//     <CreateCabinForm/>
//             </Modal.Window>
    
//         {/* <Modal.Open opens='table'> 
//         <Button>Show table</Button>
//         </Modal.Open>
//             <Modal.Window name='table'>
//     <CreateCabinForm/>
//             </Modal.Window> */}
//     </Modal>
// )}

import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}





// const AddCabin = () => {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>

//       <Button onClick={()=> setIsOpenModal((show) => !show)}>
//         Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onClick={()=> setIsOpenModal((show) => !show)}> 
// <CreateCabinForm/>
//         </Modal>
//         )}
//     </div>
//   )
// }

export default AddCabin