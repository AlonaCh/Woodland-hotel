import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabins as deleteCabinApi} from "../services/apiCabins";

export function useDeleteCabin() {

const queryClient = useQueryClient();

  const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
    mutationFn: (id) => deleteCabinApi(id), //callback function, recieve the id then call the deleteCabins function.//mutationFn:deleteCabin
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      })
    },
    onError: (err) => toast.error(err.message),
  })
  return {isDeleting, deleteCabin};
  }