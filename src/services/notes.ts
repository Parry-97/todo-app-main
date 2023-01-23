import axios from "axios"




export let token = "";



export function setToken(authToken:string) {
  token = authToken
}

export async function fetchNotes () {
  const config = {
  headers : {
    Authorization : `Bearer ${token}`
  }
}
  const notes = await axios.get('/api/notes',config);
  return notes.data;
}
