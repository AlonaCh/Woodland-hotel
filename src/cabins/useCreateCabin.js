import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../services/apiCabins";

 export function useCreateCabin() {
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
    },
    onError: (err) => toast.error(err.message),
  });
  return { createCabin, isCreating };
 }