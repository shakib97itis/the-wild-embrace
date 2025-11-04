import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

const useUpdateSetting = () => {
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => {
            toast.error("Setting could not be updated: " + err.message);
            console.error(err);
        },
    });
    return { updateSetting, isUpdating }
}

export default useUpdateSetting;