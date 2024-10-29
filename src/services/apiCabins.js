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

export async function createCabin(newCabin){
  const imageName =`${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath=`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  //https://snumnqpuzdxzyjzgdsmg.supabase.co/storage/v1/object/public/cabin-images/cabin-01.jpg

//1 Create a new cabin
const { data, error } = await supabase
  .from('cabins')
  .insert([{...newCabin, image: imagePath}]); //indicate image path to the image in the bucket

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }
  //2 Upload the image
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