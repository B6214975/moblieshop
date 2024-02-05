import axios from 'axios'

// put: /login
export const loginfunc = async (values) =>
    await axios.put(process.env.REACT_APP_API + `/login`, { values });