import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm(); //we recieve these functions from useForm hook. handleSubmit(onSubmit) is an event handler function
  const { errors } = formState;

  //in case of mutation we want to invalidate the cabins query, for cabinTable component refetch cabins data
  const queryClient = useQueryClient();

  //mutate func if we want to mutate something
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });


  //use mutate function, isLoading state
  function onSubmit(data) {
    //data of the field that we regestered
    mutate(data);
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
   <Input type="text" id="name" {...register("name", {required: 'This field is required'
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
          {...register("description", {required: 'This field is required'})}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
