import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "../../services/apiCabin";
import toast from "react-hot-toast";

const useCreateCabin = () => {
    const queryClient = useQueryClient();

    const { mutate: createCabin, isPending: isCreating } = useMutation({
        mutationFn: createCabinApi,
        onSuccess: () => {
            toast.success("Cabin created successfully!");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => {
            toast.error("Cabin could not be created: " + err.message);
            console.error(err);
        },
    });

    return { isCreating, createCabin };
}

export default useCreateCabin