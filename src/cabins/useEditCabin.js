import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
      const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id), //distraction and pass the newCabinData and id
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {editCabin, isEditing};
}