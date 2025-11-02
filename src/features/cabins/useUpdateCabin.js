import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCabin as updateCabinApi } from "../../services/apiCabin";

const useUpdateCabin = () => {
    const queryClient = useQueryClient();
    const { mutate: updateCabin, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, cabin }) => updateCabinApi(id, cabin),
        onSuccess: () => {
            toast.success("Cabin updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => {
            toast.error("Cabin could not be updated: " + err.message);
            console.error(err);
        },
    });
    return { updateCabin, isUpdating }
}

export default useUpdateCabin;