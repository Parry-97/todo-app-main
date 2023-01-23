import axios from "axios";

export  async function login(credentials:{username: string, password: string}) {
  const response = await axios.post('/api/login', credentials) 
  return response
}
