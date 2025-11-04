import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

const useSettings = () => {
    const { data: settings, isPending, error } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });
    return { settings, isPending, error };
};

export default useSettings;