import axios from '../axios';
///////////////////////////////
///////////danh muc////////////
///////////////////////////////
const getAllDanhMuc = (inputId) => {

    return axios.get(`/api/get-all-danhmuc?id=${inputId}`)
}
const createNewDanhMucSevice = (data1) => {
    console.log('check from sevice:', data1)
    return axios.post('/api/create-new-danhmuc', data1)
}
// top danhmuc
const getTopDanhMucService = (limit) => {
    return axios.get(`/api/top-danhmuc-home?limit=${limit}`)
}
///delete danh muc
const deleteDanhMucService = (danhmucId) => {
    return axios.delete('/api/delete-danhmuc', {
        data: { id: danhmucId }
    });
}
///edit danh muc
const editDanhMucSevice = (inputData) => {
    return axios.put('/api/edit-danhmuc', inputData);
}
///////////////////////////////
///////////loai su kien////////
////////////////////////////// /
/// su kien
const getAllLoaiSK = (inputId) => {

    return axios.get(`/api/get-all-LoaiSK?id=${inputId}`)

}
/// create sk
const createNewLoaiSKSevice = (data1) => {
    console.log('check from sevice:', data1)
    return axios.post('/api/create-new-LoaiSK', data1)
}
/// delete sk
const deleteSuKienService = (sukienId) => {
    return axios.delete('/api/delete-sk', {
        data: { id: sukienId }
    });
}
// edit su kien
const editSKSevice = (inputData) => {
    return axios.put('/api/edit-loaisk', inputData);
}
// top danhmuc
const getTopLoaiSKService = (limit) => {
    return axios.get(`/api/top-toploaisk-home?limit=${limit}`)
}
//all su kien
const getAllsukien = () => {
    return axios.get(`/api/get-all-sukien`)
}
//create infor event
const createInfoSK = (data) => {
    return axios.post('/api/creat-info-sukien', data)
}
////detailsu kien
const getdetailinfosukien = (inputId) => {
    return axios.get(`/api/get-detail-sukien-by-id?id=${inputId}`)
}
//all pttt
const getAllPTTTService = (inputId) => {
    return axios.get(`/api/get-all-pttt?id=${inputId}`)
}
const getinfoskbyidService = (sukienId) => {
    return axios.get(`/api/get-info-sukien-by-id?sukienId=${sukienId}`)
}
///get all nhan vien
const getAllNhanVien = (inputId) => {

    return axios.get(`/api/get-all-nhan-vien?id=${inputId}`)
}
///create phieu chi
/// create sk
const createNewPhieuChiSevice = (data) => {
    console.log('check from sevice:', data)
    return axios.post('/api/create-new-phieu-chi', data)
}
////phieu chi
const getAllPhieuChi = (inputId) => {

    return axios.get(`/api/get-all-phieu-chi?id=${inputId}`)
}
////delete phieu chi
/// delete sk
const deletePhieuChiService = (phieuId) => {
    return axios.delete('/api/delete-phieu-chi', {
        data: { id: phieuId }
    });
}
// edit phieu chi
const editphieuchiSevice = (inputData) => {
    return axios.put('/api/edit-phieu-chi', inputData);
}
export {
    getAllDanhMuc,
    createNewDanhMucSevice,
    getTopDanhMucService,
    getAllLoaiSK,
    createNewLoaiSKSevice,
    getTopLoaiSKService,
    getAllsukien,
    createInfoSK,
    getdetailinfosukien,
    deleteSuKienService,
    editSKSevice,
    deleteDanhMucService,
    editDanhMucSevice,
    getAllPTTTService,
    getinfoskbyidService,
    getAllNhanVien,
    createNewPhieuChiSevice,
    getAllPhieuChi,
    deletePhieuChiService,
    editphieuchiSevice,
}