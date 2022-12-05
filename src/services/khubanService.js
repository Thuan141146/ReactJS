import axios from '../axios';
///all khu
const getAllKhu = (inputId) => {
    return axios.get(`/api/get-all-khu?id=${inputId}`)
}
//create khu
const createNewKhu = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/create-new-khu', data)
}
//edit khu
const editKhuSevice = (inputData) => {
    return axios.put('/api/edit-khu', inputData);
}
//xoa khu
const deleteKhuService = (khuId) => {
    return axios.delete('/api/delete-khu', {
        data: { id: khuId }
    });
}
////all ban
const getAllBan = (inputId) => {
    return axios.get(`/api/get-all-ban?id=${inputId}`)
}
//create ban
const createNewBan = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/create-new-ban', data)
}
///delete ban
const deleteBanService = (banId) => {
    return axios.delete('/api/delete-ban', {
        data: { id: banId }
    });
}
//edit khu
const editBanSevice = (inputData) => {
    return axios.put('/api/edit-ban', inputData);
}
///
//create ban
const savebulkqlban = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/bulk-create-qlban', data)
}
const getdetailinfokhu = (inputId) => {
    return axios.get(`/api/get-detail-khu-by-id?id=${inputId}`)
}
const getQLBanByDate = (khuvucid, ngay) => {
    return axios.get(`/api/get-ql-ban-by-date?khuvucid=${khuvucid}&ngay=${ngay}`)
}
const getlistdatban = (NGAY, ID_TT) => {
    return axios.get(`/api/get-list-dat-ban?NGAY=${NGAY}&ID_TT=${ID_TT}`)
}

const guithuxacnhan = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/send-nhan-ban', data)
}
/// gui mail huy ban
const guithuhuyban = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/send-huy-ban', data)
}
//// mail hủy vé
const guithuhuyve = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/send-huy-ve', data)
}
const chuyenban = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/send-chuyen-ban', data)
}
///add to cart
const addtocart = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/gio-hang', data)
}
const getcartbyid = (ID_TK) => {
    return axios.get(`/api/get-cart-by-id?ID_TK=${ID_TK}`)
}

///delete product cart
const deleteproductcartService = (MON_ID) => {
    return axios.delete('/api/delete-product-cart', {
        data: { id: MON_ID }
    });
}
const deleteproductcartbyidService = (ID_TK) => {
    return axios.delete('/api/delete-product-cart-by-id', {
        data: { ID_TK: ID_TK }
    });
}
const getalldonbyid = (ID_TK, NGAY) => {
    return axios.get(`/api/detail-don-by-id?ID_TK=${ID_TK}&NGAY=${NGAY}`)
}
const getalldonbyiddon = (ID_DON) => {
    return axios.get(`/api/detail-don-by-id-don?ID_DON=${ID_DON}`)
}
const getQLdonByDate = (NGAY, ID_TT) => {
    return axios.get(`/api/get-all-don-by-id-date?NGAY=${NGAY}&ID_TT=${ID_TT}`)
}
const editTTDonSevice = (inputData) => {
    return axios.put('/api/edit-tt-don', inputData);
}

const editYCHDService = (inputData) => {
    return axios.put('/api/edit-tt-don', inputData);
}

const huydon = (ID, ID_TT) => {
    // console.log('check from sevice:', data)
    return axios.post(`/api/huy-don?ID=${ID}&ID_TT=${ID_TT}`)
}
///xac nhan huy don
const xacnhanhuydon = (ID, ID_TT) => {
    // console.log('check from sevice:', data)
    return axios.post(`/api/xac-nhan-huy-don?ID=${ID}&ID_TT=${ID_TT}`)
}
///danh thu ngay
const getdanhthuByDate = (data) => {
    return axios.get(`/api/get-danh-thu-ngay?NGAY=${data.NGAY}`)
}
///danh thu ngay
const getdanhthuveByDate = (data) => {
    return axios.get(`/api/get-danh-thu-ve-ngay?NGAY=${data.NGAY}`)
}
////vnpay
const getPayment = (data) => {
    return axios.post('/create_payment_url', data);

}
const createRatingService = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/danh-gia', data)
}
//get-all dat ban
const getdatbanbyid = (SDT) => {
    return axios.get(`/api/get-all-ban-dat-by-id?SDT=${SDT}`)
}
///hủy ban
const huyban = (ID, ID_TT) => {
    // console.log('check from sevice:', data)
    return axios.post(`/api/huy-ban?ID=${ID}&ID_TT=${ID_TT}`)
}
///xac nhan huy ban
const xacnhanhuyban = (ID, ID_TT) => {
    // console.log('check from sevice:', data)
    return axios.post(`/api/xac-nhan-huy-ban?ID=${ID}&ID_TT=${ID_TT}`)
}
/// chi theo ngày
const getchiByDate = (data) => {
    return axios.get(`/api/get-phieu-chi-theo-ngay?NGAY=${data.NGAY}`)
}
/// get alll bao xau
const getallbaoxaudate = (NGAY) => {
    return axios.get(`/api/get-all-bao-xau?NGAY=${NGAY}`)
}
////get all bình luận
const getallbinhluan = (NGAY, ID_MON) => {
    return axios.get(`/api/get-all-binh-luan?NGAY=${NGAY}&ID_MON=${ID_MON}`)
}
/// chi theo ngày
const getdanhthuvnpay = (data) => {
    return axios.get(`/api/get-danh-thu-ngay-vnpay?NGAY=${data.NGAY}`)
}
// luu hoa don
const savebulkhoadon = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/luu-hoa-don', data)
}
const savebulkhoave = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/luu-hoa-don-ve', data)
}
//create km
const savebulkkm = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/khuyen-mai', data)
}
////all ban
const getAllkm = (inputId) => {
    return axios.get(`/api/get-khuyen-mai?id=${inputId}`)
}
// delete dícount
const deletekm = (id) => {
    return axios.delete('/api/delete-khuyenmai', {
        data: { id: id }
    });
}
const getbantrong = (NGAY, ID_KV) => {
    return axios.get(`/api/get-all-ban-trong?NGAY=${NGAY}&ID_KV=${ID_KV}`)
}

///dong ban
const dongbanService = (banId) => {
    return axios.delete('/api/delete-dong-ban', {
        data: { id: banId }
    });
}
//all ghe
const getAllghe = (inputId) => {
    return axios.get(`/api/get-all-ghe?id=${inputId}`)
}
//create ghe
const createNewghe = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/create-new-ghe', data)
}
///delete ban
const deletegheService = (gheId) => {
    return axios.delete('/api/delete-ghe', {
        data: { id: gheId }
    });
}
//edit khu
const editgheSevice = (inputData) => {
    return axios.put('/api/edit-ghe', inputData);
}
////
//create ban
const savebulkqlghe = (data) => {
    // console.log('check from sevice:', data)
    return axios.post('/api/bulk-create-qlghe', data)
}
const getghetrong = (ID_SK, TT) => {
    return axios.get(`/api/get-all-ghe-trong?ID_SK=${ID_SK}&TT=${TT}`)
}
///dong ghe
const donggheService = (gheId) => {
    return axios.delete('/api/delete-dong-ghe', {
        data: { id: gheId }
    });
}
//all-ghe-sk
const getQLgheByDate = (ID_SK) => {
    return axios.get(`/api/get-all-ghe-sk?ID_SK=${ID_SK}`)
}
//all ve
const getallvebyid = (ID_TK, NGAY) => {
    return axios.get(`/api/all-ve-by-id?ID_TK=${ID_TK}&NGAY=${NGAY}`)
}
//detail ve
const getdetailvebyiddon = (ID_DON) => {
    return axios.get(`/api/detail-ve-by-id-ve?ID_DON=${ID_DON}`)
}
const huyve = (ID, ID_TT) => {
    // console.log('check from sevice:', data)
    return axios.post(`/api/huy-ve?ID=${ID}&ID_TT=${ID_TT}`)
}
//get don theo ngay và tt don
const getQLveByDate = (NGAY, ID_TT) => {
    return axios.get(`/api/get-all-ve-by-id-date?NGAY=${NGAY}&ID_TT=${ID_TT}`)
}
///xac nhan huy ve

const xacnhanhuyve = (ID, ID_TT) => {
    // console.log('check from sevice:', data)
    return axios.post(`/api/xac-nhan-huy-ve?ID=${ID}&ID_TT=${ID_TT}`)
}
//cap nhat tt ve
const editTTveSevice = (inputData) => {
    return axios.put('/api/edit-tt-ve', inputData);
}
/// thongke
const thongke = (NGAY1) => {
    return axios.get(`/api/get-thong-ke?NGAY1=${NGAY1}`)
}
/// thong ke ve

const thongkeve = (NGAY1) => {
    return axios.get(`/api/get-thong-ke-ve?NGAY1=${NGAY1}`)
}

// delete bao xau
const deletebaoxau = (ID_DG) => {
    return axios.delete('/api/delete-bao-xau', {
        data: { id: ID_DG }
    });
}
// delete danh gia
const deletedanhgia = (ID_DG) => {
    return axios.delete('/api/delete-binh-luan', {
        data: { id: ID_DG }
    });
}
export {
    getAllKhu,
    createNewKhu,
    editKhuSevice,
    deleteKhuService,
    getAllBan,
    createNewBan,
    deleteBanService,
    editBanSevice,
    savebulkqlban,
    getdetailinfokhu,
    getQLBanByDate,
    getlistdatban,
    guithuxacnhan,
    addtocart,
    getcartbyid,
    deleteproductcartService,
    deleteproductcartbyidService,
    getalldonbyid,
    getalldonbyiddon,
    getQLdonByDate,
    editTTDonSevice,
    editYCHDService,
    huydon,
    xacnhanhuydon,
    getdanhthuByDate,
    getdanhthuveByDate,
    getPayment,
    createRatingService,
    getdatbanbyid,
    huyban,
    xacnhanhuyban,
    getchiByDate,
    getdanhthuvnpay,
    savebulkhoadon,
    savebulkkm,
    getAllkm,
    deletekm,
    getbantrong,
    dongbanService,
    getAllghe,
    createNewghe,
    deletegheService,
    editgheSevice,
    savebulkqlghe,
    getghetrong,
    donggheService,
    getQLgheByDate,
    getallvebyid,
    getdetailvebyiddon,
    huyve,
    getQLveByDate,
    xacnhanhuyve,
    editTTveSevice,
    savebulkhoave,
    thongke,
    thongkeve,
    guithuhuyban,
    guithuhuyve,
    getallbaoxaudate,
    deletedanhgia,
    deletebaoxau,
    chuyenban,
    getallbinhluan,

}
