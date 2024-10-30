import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { is } from "date-fns/locale";



function CreateCabinForm({cabinToEdit = {}}) {
  const {id: editId, ...editValues} = cabinToEdit; // extracts the id from the cabinToEdit object (if it exists) and assigns it to editId
  // All other properties are grouped into editValues, which might include properties like name, price, description, etc., but without the id.
  
  //if we edit
  const isEditSession = Boolean(editId); //if editId is true, then isEditSession is true

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  }
  ); //we recieve these functions from useForm hook. handleSubmit(onSubmit) is an event handler function
  const { errors } = formState;

  //in case of mutation we want to invalidate the cabins query, for cabinTable component refetch cabins data
  const queryClient = useQueryClient();

  //mutate func if we want to mutate something
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  //

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id), //distraction and pass the newCabinData and id
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  //use mutate function, isLoading state
  function onSubmit(data) {
    if(isEditSession) editCabin()
    //data of the field that we regestered
    else createCabin({...data, image:data.image[0]}); //we need to match the name of the field (id)
  }

  function onError(errors){
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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

      <FormRow label='Description' disabled = {isWorking} error={errors?.name?.message}>
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
        <Button variation="secondary" type="reset">
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
