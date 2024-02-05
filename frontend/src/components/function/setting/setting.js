import axios from 'axios'

// GET: / all
export const listSetting = async (authtoken, values) =>
    await axios.get(process.env.REACT_APP_API + `/setting-list`, {
        headers: {
            authtoken,
        }
    });

// POST: /phone
export const insertPhone = async (authtoken, values) =>
    await axios.post(process.env.REACT_APP_API + `/setting-phone-insert`, { values }, {
        headers: {
            authtoken,
        }
    });
// DELETE: /phone
export const deletePhone = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/setting-phone-delete/${id}`, {
        headers: {
            authtoken,
        }
    });
// POST: /memory
export const insertMemory = async (authtoken, values) =>
    await axios.post(process.env.REACT_APP_API + `/setting-memory-insert`, { values }, {
        headers: {
            authtoken,
        }
    });
// DELETE: /memory
export const deleteMemory = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/setting-memory-delete/${id}`, {
        headers: {
            authtoken,
        }
    });
// POST: /color
export const insertColor = async (authtoken, values) =>
    await axios.post(process.env.REACT_APP_API + `/setting-color-insert`, { values }, {
        headers: {
            authtoken,
        }
    });
// DELETE: /color
export const deleteColor = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/setting-color-delete/${id}`, {
        headers: {
            authtoken,
        }
    });


// POST: /user
export const insertUser = async (authtoken, values) =>
    await axios.post(process.env.REACT_APP_API + `/register`, { values }, {
        headers: {
            authtoken,
        }
    });

// GET: /user
export const listUser = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + `/user-list`, {
        headers: {
            authtoken,
        }
    });

// DELETE: /user
export const deleteUser = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + `/user-delete/${id}`, {
        headers: {
            authtoken,
        }
    });

// PUT: /user
export const updatetUser = async (authtoken, value) =>
    await axios.put(process.env.REACT_APP_API + `/user-update`, { value }, {
        headers: {
            authtoken,
        }
    });
// PUT: /user
export const updatetUserEnabled = async (authtoken, id, value) =>
    await axios.put(process.env.REACT_APP_API + `/user-enabled/${id}`, { value }, {
        headers: {
            authtoken,
        }
    });
// PUT: /user
export const updatetUserAdmin = async (authtoken, id, value) =>
    await axios.put(process.env.REACT_APP_API + `/user-admin/${id}`, { value }, {
        headers: {
            authtoken,
        }
    });