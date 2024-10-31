import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins(){

const { data, error } = await supabase
  .from('cabins')
  .select('*')

  if(error){
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data; // promise resolves with data
}

export async function createEditCabin(newCabin, id){ //id of a cabin that is being edeted
    console.log(newCabin, id)
  const hasImagePath = newCabin.image?.startsWith?.(supabase); //check if the image is already uploaded

  const imageName = hasImagePath ? newCabin.image : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath=`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

//1 Create/edit a new cabin
let query = supabase.from('cabins');

//A) Create
if(!id) query = query.insert([{...newCabin, image: imagePath}]) //indicate image path to the image in the bucket

//B) Edit
if (id) query = query.update({...newCabin, image: imagePath})
  .eq('id', id) //we need to specify the column that we want to update. id is eq to the id we pass in
  .select()

const { data, error } = await query.select().single(); //we want to get the data back
 

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }
  //2 Upload the image
const { error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image);

  //3 Delete cabin if there was en error uploading the image
  if (storageError) {
    await supabase
  .from('cabins')
  .delete()
  .eq('id', data.id); //the data that we already recieved will contain this id
      console.error(storageError);
    throw new Error('Image can not be uploaded');
  }
  return data;
}

//copied from supabase docs
export async function deleteCabins(id){
const { data, error } = await supabase //our supabase client
  .from('cabins')
  .delete()
  .eq('id', id); 

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
 return data;
}