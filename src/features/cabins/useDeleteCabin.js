import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinById } from "../../services/apiCabin";
import toast from "react-hot-toast";

function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (cabinId) => deleteCabinById(cabinId),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            toast.success("Cabin deleted successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("There was an error deleting the cabin");
        },
    });

    return { isDeleting, deleteCabin };
}

export default useDeleteCabin;