import axios from 'axios'

// GET: /backlist
export const listBacklist = async (authtoken, values) =>
    await axios.get(process.env.REACT_APP_API + `/backlist-list/${values?.search}`, {
        headers: {
            authtoken,
        }
    });