import supabase, {supabaseUrl} from './supabase';

export async function signup({fullName, email, password}) {
  let {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({email, password}) {
  let {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function updateUser({fullName, password, avatar}) {
  // 1. Update username or password
  let dataToUpdate = null;
  if (fullName) dataToUpdate = {data: {fullName}};
  if (password) dataToUpdate = {password};

  const {
    data: {user},
    error: updateUserError,
  } = await supabase.auth.updateUser(dataToUpdate);

  if (updateUserError) throw new Error(updateUserError.message);

  if (!avatar) return user;

  const fileName = `avatar-of-${user.id}-${Date.now()}`;
  // 2. Upload the avatar data.
  const {error: avatarUploadError} = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar, {upsert: true});
  if (avatarUploadError) throw new Error(avatarUploadError.message);

  const avatarLink = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  // 2. Update the avatar link with user data.
  const {data: updatedUser, error: updateUserError2} = supabase.auth.updateUser(
    {
      data: {avatar: avatarLink},
    }
  );

  if (updateUserError2) throw new Error(updateUserError2.message);

  return updatedUser;
}

export async function logout() {
  const {error} = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
