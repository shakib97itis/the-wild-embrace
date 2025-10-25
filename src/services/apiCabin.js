import supabase from "./supabase"
export const getCabins = async () => {
    const { data, error } = await supabase.from('cabins').select('*')

    if (error) {
        console.error(error)
        throw new Error('Cabins could not be loaded')
    }
    return data
}

export const deleteCabinById = async (id) => {
    const theObject = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (theObject.error) {
        console.error(theObject.error)
        throw new Error('Cabin could not be deleted')
    }
    console.log(theObject)
}
