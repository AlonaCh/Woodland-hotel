import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "../../cabins/useCreateCabin";
import { useUpdateCabin } from "../../cabins/useUpdateCabin";



function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {id: editId, ...editValues} = cabinToEdit; // extracts the id from the cabinToEdit object (if it exists) and assigns it to editId
  // All other properties are grouped into editValues, which might include properties like name, price, description, etc., but without the id.
  
  //if we edit
  const isEditSession = Boolean(editId); //if editId is true, then isEditSession is true
  
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  }
); //we recieve these functions from useForm hook. handleSubmit(onSubmit) is an event handler function
const { errors } = formState;

const {createCabin, isCreating } = useCreateCabin();

const {editCabin, isEditing} = useUpdateCabin();

const isWorking = isCreating || isEditing;
  //use mutate function, isLoading state
  function onSubmit(data) {
    //check if the image is a file list or a string
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if(isEditSession) editCabin({newCabinData: {...data, image}, id: editId},
      {onSuccess: (data) => { 
        console.log('Cabin updated successfully');
        reset();
        onCloseModal?.()
      }}
    )
    //data of the field that we regestered
    else createCabin({...data, image:image},
      {onSuccess: (data) => reset(),}//reset the form after the cabin is created
    ); //we need to match the name of the field (id)
    onCloseModal?.(); //if onCloseModal is defined, call it
  }

  function onError(errors){
    console.log(errors);
  }

  return (
    // set type prop to modal
    <Form onSubmit={handleSubmit(onSubmit, onError)}
    type={onCloseModal ? 'modal' : 'regular'}>
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", {required: 'This field is required'
        })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}

<FormRow label='Cabin name' error={errors?.name?.message}>
   <Input type="text" 
   id="name"
   disabled = {isWorking}
   {...register("name", {required: 'This field is required'
        })} />
</FormRow>

      <FormRow label='Max capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {required: 'This field is required',
          min: {
            value: 1,
              message: 'Capasity must be at least 1'
          }})} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", {required: 'This field is required',
          min: {
            value: 1,
            message: 'Price must be at least 1'
          }})} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {required: 'This field is required',
            //custom validation
            validate: (value) => 
              value <= getValues().regularPrice || 'Discount must be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.name?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled = {isWorking}
          {...register("description", {required: 'This field is required'})}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" type='file'
        {...register("image", {required: isEditSession ? false : 'This field is required'})}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
         {isEditSession ? 'Edit cabin' : 'Create cabin'} 
          </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
