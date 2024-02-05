import axios from 'axios'

// GET: /paytoday
export const listPaytoday = async (authtoken, values) =>
    await axios.get(process.env.REACT_APP_API + `/paytoday-list/${values?.search}`, {
        headers: {
            authtoken,
        }
    });