

const AddCabin = () => {
    const [showForm, setShowForm] = useState(false);
    
  return (
    <div>AddCabin

      <Button onClick={()=> setShowForm((show) => !show)}>
        Add new cabin</Button>
      {showForm && <CreateCabinForm/>}
    </div>
  )
}

export default AddCabin