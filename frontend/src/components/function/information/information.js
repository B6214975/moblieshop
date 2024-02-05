import axios from 'axios'

// POST: /information
export const insertInformation = async (authtoken, values) =>
    await axios.post(process.env.REACT_APP_API + `/information-insert`, { values }, {
        headers: {
            authtoken,
        }
    });

// GET: /information
export const listInformation = async (authtoken, type, values) =>
    await axios.get(process.env.REACT_APP_API + `/information-list/${type}/${values?.search}`, {
        headers: {
            authtoken,
        }
    });

// GET: /information
export const getInformation = async (authtoken, id) =>
    await axios.get(process.env.REACT_APP_API + `/information-get/${id}`, {
        headers: {
            authtoken,
        }
    });

// PUT: /information
export const updateInformation = async (authtoken, id, values) =>
    await axios.put(process.env.REACT_APP_API + `/information-update/${id}`, { values }, {
        headers: {
            authtoken,
        }
    });

// PUT: /information
export const payInstallment = async (authtoken, id, values) =>
    await axios.put(process.env.REACT_APP_API + `/information-pay/${id}`, { values }, {
        headers: {
            authtoken,
        }
    });

// PUT: /backlist
export const putBackList = async (authtoken, id, values) =>
    await axios.put(process.env.REACT_APP_API + `/information-backlist/${id}`, { values }, {
        headers: {
            authtoken,
        }
    });

    // PUT: /backlist
export const removeInformation = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/information-remove/${id}`, {
        headers: {
            authtoken,
        }
    });