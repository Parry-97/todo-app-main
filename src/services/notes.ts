import axios from "axios"

export interface NoteType {
  content: string,
  date: Date,
  important : boolean
  id: string
  noteStatus: 'active' | 'completed'
}

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


export async function addNote(newNote : NoteType) {
  const config = {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }   
  const response = await axios.post('/api/notes',newNote,config)
  return response.data
}
