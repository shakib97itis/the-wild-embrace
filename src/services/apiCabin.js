import supabase, { supabaseUrl } from "./supabase"

export async function createCabin(cabin) {
    const imageName = `${cabin.name}-${Date.now()}`.replaceAll("/", '-')
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`

    // Saving the cabin data to supabase
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...cabin, image: imageUrl }])
        .select()
    if (error) {
        console.error(error)
        throw new Error('Cabins could not be loaded')
    }

    // uploading the cabin image
    const { error: storageError } = await supabase.storage.from('cabins').upload(imageName, cabin.image)

    // Delete the cabin if the image fails to upload
    if (storageError) {
        await deleteCabinById(data[0].id)
        console.error(storageError)
        throw new Error('Cabin image could not be uploaded')
    }
    return data
}

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*')

    if (error) {
        console.error(error)
        throw new Error('Cabins could not be loaded')
    }
    return data
}


export async function updateCabin(id, updates) {
    let imageName = ''
    let oldImageLink = updates.oldImageLink
    let imageUrl = updates.image

    if (typeof updates.image !== 'string') {
        imageName = `${updates.name}-${Date.now()}`.replaceAll("/", '-')
        imageUrl = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`
    }

    delete updates.oldImageLink

    const { data, error } = await supabase
        .from('cabins')
        .update({ ...updates, image: imageUrl })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be updated')
    }

    // if new image, Delete the old cabin image then upload the new one
    if (updates.image !== data.image) {
        const oldImageName = oldImageLink.split('/').pop()
        console.log(oldImageName)
        try {
            await supabase.storage.from('cabins').remove([oldImageName])
        } catch (error) {
            console.error(error)
        }

        const { error: storageError } = await supabase.storage.from('cabins').upload(imageName, updates.image)
        if (storageError) {
            console.error(storageError)
            throw new Error('Cabin image could not be uploaded')
        }
    }
    return data
}

export async function deleteCabinById(id) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be deleted')
    }
}

// export default { createCabin, getCabins, updateCabin, deleteCabinById }

