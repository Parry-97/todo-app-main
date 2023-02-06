import axios from "axios"

let sampleNotes: NoteType[] = [
  {
    content: "React is awesome",
    date: new Date(),
    important: Math.random() > 0.5,
    id : "1",
    noteStatus: 'active'
  },
  {
    content: "TypeScript provides nice DX",
    date: new Date(),
    important: Math.random() > 0.5,
    id : "2",
    noteStatus: 'active'
  },
  {
    content: "Immer makes state manipulation very easy",
    date: new Date(),
    important: Math.random() > 0.5,
    id : "3",
    noteStatus: 'active'
  },
  {
    content: "React Query is the best",
    date: new Date(),
    important: Math.random() > 0.5,
    id : "4",
    noteStatus: 'active'
  }
] 

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

export function fetchSampleNotes() {
  return sampleNotes; 
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
