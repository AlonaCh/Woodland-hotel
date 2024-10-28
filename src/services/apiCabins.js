import supabase from "./supabase";

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

const { data, error } = await supabase
  .from('cabins')
  .insert([newCabin]);
  
  if (error) {
    console.error(error);
    throw new error('Cabin could not be created');
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