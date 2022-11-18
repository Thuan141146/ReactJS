import actionTypes from '../actions/actionTypes';

const initialState = {
    isaloadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    danhmucs: [],
    topDanhMuc: [],
    allnhanvien: [],
    loaisk: [],
    topLoaiSK: [],
    allsukien: [],
    allmon: [],
    allsize: [],
    allkhu: [],
    allban: [],
    times: [],
    allprice: [],
    allpttt: [],
    allgia: [],
    cartbyid: [],
    allstatus: [],
    nhanvien: [],
    phieuchi: [],
    ttban: [],
    allghe: [],
    allstatusve: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        ///gioitinh
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isaloadingGender = true;
            // console.log('B1809299 fire fetch gender start:', action)
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isaloadingGender = false;
            // console.log('B1809299 fire fetch gender success:', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            // console.log('B1809299 fire fetch gender faided:', action)
            state.isaloadingGender = false;
            state.genders = [];
            return {
                ...state,

            }
        ///time
        case actionTypes.FETCH_TIME_SUCCESS:
            state.times = action.times;
            return {
                ...state,
            }
        case actionTypes.FETCH_TIME_FAILDED:
            state.times = [];
            return {
                ...state,

            }
        ///price
        case actionTypes.FETCH_ALL_GIA_SK_SUCCESS:
            state.allprice = action.allprice;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_GIA_SK_FAILDED:
            state.allprice = [];
            return {
                ...state,

            }

        ///al pttt
        case actionTypes.FETCH_ALL_PTTTT_SUCCESS:
            state.allpttt = action.allpttt;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_PTTTT_FAILDED:
            state.allpttt = [];
            return {
                ...state,
            }

        ///khuvuc
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILDED:
            state.positions = [];
            return {
                ...state,

            }
        //loaitaikhoan
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_FAIDED:
            state.users = [];
            return {
                ...state,

            }
        //allnhan vien
        case actionTypes.FETCH_ALL_NV_SUCCESS:
            state.allnhanvien = action.allnhanvien;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_NV_FAILDED:
            state.allnhanvien = [];
            return {
                ...state,

            }
        ///all danh muc
        case actionTypes.FETCH_ALL_DANHMUC_SUCCESS:
            state.danhmucs = action.danhmucs;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DANHMUC_FAILDED:
            state.danhmucs = [];
            return {
                ...state,

            }
        // topdanhmuc
        case actionTypes.FETCH_TOP_DANHMUC_SUCCESS:
            state.topDanhMuc = action.dataTopDanhMuc;
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DANHMUC_FAILDED:
            state.topDanhMuc = [];
            return {
                ...state,

            }
        ///all danh muc
        case actionTypes.FETCH_ALL_LOAISK_SUCCESS:
            state.loaisk = action.loaisk;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_LOAISK_FAILDED:
            state.loaisk = [];
            return {
                ...state,

            }
        // toploask
        case actionTypes.FETCH_TOP_LOAISK_SUCCESS:
            state.topLoaiSK = action.dataTopLoaiSK;
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_LOAISK_FAILDED:
            state.topLoaiSK = [];
            return {
                ...state,

            }
        // all su kien
        case actionTypes.FETCH_ALL_SUKIEN_SUCCESS:
            state.allsukien = action.dataSukien;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_SUKIEN_FAILDED:
            state.allsukien = [];
            return {
                ...state,

            }
        // all mon
        case actionTypes.FETCH_ALL_MON_SUCCESS:
            state.allmon = action.allmon;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_MON_FAILDED:
            state.allmon = [];
            return {
                ...state,

            }
        // all size
        case actionTypes.FETCH_ALL_SIZE_SUCCESS:
            state.allsize = action.allsize;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_SIZE_FAILDED:
            state.allsize = [];
            return {
                ...state,

            }
        ///all gia
        case actionTypes.FETCH_ALL_GIA_MON_SUCCESS:
            state.allgia = action.allgia;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_GIA_MON_FAILDED:
            state.allgia = [];
            return {
                ...state,

            }
        ////////////////////////////////////////////////////////////////////////////////////
        ////all khu
        // all mon
        case actionTypes.FETCH_ALL_KHU_SUCCESS:
            state.allkhu = action.allkhu;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_KHU_FAILDED:
            state.allkhu = [];
            return {
                ...state,

            }
        ////////////////////////////////////////////////////////////////////////////////////
        ////all ban
        case actionTypes.FETCH_ALL_BAN_SUCCESS:
            state.allban = action.allban;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_BAN_FAILDED:
            state.allban = [];
            return {
                ...state,

            }

        ///////////////////////////get cart by id
        case actionTypes.FETCH_ALL_CART_BYID_SUCCESS:
            state.cartbyid = action.cartbyid;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_CART_BYID_FAILDED:
            state.cartbyid = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_STATUS_SUCCESS:
            state.allstatus = action.allstatus;
            return {
                ...state,

            }
        case actionTypes.FETCH_STATUS_FAILDED:
            state.allstatus = [];
            return {
                ...state,

            }
        ////all nhanvien
        case actionTypes.FETCH_NHANVIEN_SUCCESS:
            state.nhanvien = action.nhanvien;
            return {
                ...state,

            }
        case actionTypes.FETCH_NHANVIEN_FAILDED:
            state.nhanvien = [];
            return {
                ...state,

            }
        ////all phieu chi
        case actionTypes.FETCH_PHIEUCHI_SUCCESS:
            state.phieuchi = action.phieuchi;
            return {
                ...state,

            }
        case actionTypes.FETCH_PHIEUCHI_FAILDED:
            state.phieuchi = [];
            return {
                ...state,

            }

        ///tt ban
        case actionTypes.FETCH_STA_SUCCESS:
            state.ttban = action.ttban;
            return {
                ...state,

            }
        case actionTypes.FETCH_STA_FAILDED:
            state.ttban = [];
            return {
                ...state,

            }
        ///all ghe
        ///tt ban
        case actionTypes.FETCH_ALL_GHE_SUCCESS:
            state.allghe = action.allghe;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_GHE_FAILDED:
            state.allghe = [];
            return {
                ...state,

            }
        //status ve
        case actionTypes.FETCH_STATUSVE_SUCCESS:
            state.allstatusve = action.allstatusve;
            return {
                ...state,

            }
        case actionTypes.FETCH_STATUSVE_FAILDED:
            state.allstatusve = [];
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;