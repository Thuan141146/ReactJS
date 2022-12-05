import axios from '../axios';
///CREATE MON 
const createNewMon = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/create-new-mon', data)
}
/////allsize
const getAllSize = (inputId) => {

    return axios.get(`/api/get-all-Size?id=${inputId}`)

}
//all mon
const getAllMon = (inputId) => {
    return axios.get(`/api/get-all-mon?id=${inputId}`)
}

/// edit mon
const editMonSevice = (inputData) => {
    return axios.put('/api/edit-mon', inputData);
}

//xoa mon
const deleteMonService = (monId) => {
    return axios.delete('/api/delete-mon', {
        data: { id: monId }
    });
}
//all mon home
const getAllMonHome = (limit) => {
    return axios.get(`/api/all-mon-home?limit=${limit}`)
}

///create gia size
const createNewGiaSize = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/create-new-gia-size', data)
}
// all gia mon
const getAllGiaMon = (inputId) => {
    return axios.get(`/api/get-all-gia-size?id=${inputId}`)
}
///xoa gia mon

const deleteGiaMonService = (giamonId) => {
    return axios.delete('/api/delete-gia-size', {
        data: { id: giamonId }
    });
}
///edit gia mon
const editGiaMonSevice = (inputData) => {
    return axios.put('/api/edit-gia-size', inputData);
}

const getSizeByIdMon = (ID_MON, ID_SIZE) => {
    return axios.get(`/api/get-size-by-id-mon?ID_MON=${ID_MON}&ID_SIZE=${ID_SIZE}`)
}
const getMonByIdMon = (ID_DM) => {
    return axios.get(`/api/get-mon-by-id_dm?ID_DM=${ID_DM}`)
}
const getsplienquan = (ID_DM) => {
    return axios.get(`/api/top-san-pham-lien-quan?ID_DM=${ID_DM}`)
}

const getgiaByIdMon = (ID_MON) => {
    return axios.get(`/api/get-gia-by-id-mon?ID_MON=${ID_MON}`)
}

const savebulkdonhang = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/dat-hang', data)
}
const getdanhgia = (ID_MON) => {
    return axios.get(`/api/get-danh-gia-id-mon?ID_MON=${ID_MON}`)
}
///get km by id
const getkmByIdMon = (ID_MON) => {
    return axios.get(`/api/get-km-by-id-mon?ID_MON=${ID_MON}`)
}
///dat ve sk
const savebulkvesk = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/dat-ve-sk', data)
}
const guibaoxau = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/send-bao-xau', data)
}
export {
    getAllMon,
    getAllSize,
    createNewMon,
    deleteMonService,
    editMonSevice,
    getAllMonHome,
    createNewGiaSize,
    getAllGiaMon,
    deleteGiaMonService,
    editGiaMonSevice,
    getSizeByIdMon,
    getMonByIdMon,
    getsplienquan,
    getgiaByIdMon,
    savebulkdonhang,
    getdanhgia,
    getkmByIdMon,
    savebulkvesk,
    guibaoxau,

}
