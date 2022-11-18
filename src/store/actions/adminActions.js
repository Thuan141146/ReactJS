import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserSevice, getAllUsers, deleteUserSevice, editUserSevice, getAllNVService, } from '../../services/userService';
import {
    getAllDanhMuc, createNewDanhMucSevice,
    getTopDanhMucService, getAllLoaiSK,
    createNewLoaiSKSevice, getTopLoaiSKService,
    getAllsukien, createInfoSK, deleteSuKienService, editSKSevice, deleteDanhMucService,
    editDanhMucSevice, getAllPTTTService, getAllNhanVien,
    createNewPhieuChiSevice, getAllPhieuChi, deletePhieuChiService, editphieuchiSevice
}
    from '../../services/danhmucService';
import {
    getAllMon, getAllSize, createNewMon,
    deleteMonService, editMonSevice,
    getAllMonHome, createNewGiaSize, getAllGiaMon, deleteGiaMonService, editGiaMonSevice
} from '../../services/monService';

import {
    getAllKhu, getAllBan, createNewKhu, editKhuSevice, deleteKhuService, createNewBan,
    getcartbyid,

    deleteBanService, editBanSevice, editTTDonSevice, editYCHDService, getAllghe, createNewghe, deletegheService, editgheSevice, editTTveSevice
} from '../../services/khubanService'
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
///gioitinh


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                //console.log('b1809299 check getstate', getState)
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailded());
            }
        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('fetchGenderStart', e);

        }

    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailded = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})

///khuvuc

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailded());
            }
        } catch (e) {
            dispatch(fetchPositionFailded());
            console.log('fetchPositionFailded error', e);

        }

    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailded = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})
///loai tai khoan
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailded = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})
//
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailded());
            }
        } catch (e) {
            dispatch(fetchRoleFailded());
            console.log('fetchRoleFailded error', e);
        }
    }
}
//them nguoi dung moi
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserSevice(data);

            if (res && res.errCode === 0) {
                toast.success("Thêm người dùng mới thành công");
                dispatch(saveUserSucces())
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailded());
            }
        } catch (e) {
            dispatch(saveUserFailded());
            console.log('saveUserFailded error', e)
        }
    }
}
//luu user
export const saveUserSucces = () => ({
    type: actionTypes.CREATE_USER_SUCCSESS
})
export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

///alluser
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                toast.error("Lấy danh sách người dùng không thành công");
                dispatch(fetchAllUserFailded());
            }
        } catch (e) {
            toast.error("Lấy danh sách người dùng không thành công");
            dispatch(fetchAllUserFailded());
            console.log('fetchAllUserFailded error', e);
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUserFailded = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_FAIDED
})
///xoa
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserSevice(userId);
            if (res && res.errCode === 0) {
                toast.success("Xóa người dùng thành công");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Xóa người dùng không thành công");
                dispatch(saveUserFailded());
            }
        } catch (e) {
            toast.error("Xóa người dùng không thành công");
            dispatch(deleteUserFailded());
            console.log('deleteUserFailded error', e)
        }
    }
}
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USERS_SUCCESS

})
export const deleteUserFailded = (data) => ({
    type: actionTypes.DELETE_USERS_FAILDED
})
///sua
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật người dùng thành công");
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Cập nhật người dùng không thành công");
                dispatch(editUserFailded());
            }
        } catch (e) {
            toast.error("Cập nhật người dùng không thành công");
            dispatch(editUserFailded());
            console.log('EditUserFailded error', e)
        }
    }
}
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USERS_SUCCESS

})
export const editUserFailded = (data) => ({
    type: actionTypes.EDIT_USERS_FAILDED
})
export const fetchAllNV = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllNVService('');
            // console.log('check res: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_NV_SUCCESS,
                    allnhanvien: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_NV_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_NV_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_NV_FAILDED,
            })

        }
    }

}
//////////////////////////////////////////////////////////////////////////////////////
///////////danh muc///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//alldanhmuc
export const fetchAllDanhMucStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDanhMuc("ALL");

            if (res && res.errCode === 0) {
                dispatch(fetchAllDanhMucSuccess(res.danhmuc.reverse()))
            } else {
                toast.error("Lấy danh sách người dùng không thành công");
                dispatch(fetchAllDanhMucFailded());
            }
        } catch (e) {
            toast.error("Lấy danh sách người dùng không thành công");
            dispatch(fetchAllDanhMucFailded());
            console.log('fetchAllDanhMucFailde derror', e);
        }
    }
}
export const fetchAllDanhMucSuccess = (data) => ({
    type: 'FETCH_ALL_DANHMUC_SUCCESS',
    danhmucs: data
})
export const fetchAllDanhMucFailded = () => ({
    type: ' FETCH_ALL_DANHMUC_FAILDED'
})

///savedanhmuc
export const createNewDanhMuc = (data1) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewDanhMucSevice(data1);
            // console.log('saveDanhMucss', res)
            if (res && res.errCode === 0) {
                toast.success("Thêm danh mục mới thành công");
                dispatch(saveDanhMucSucces())
                dispatch(fetchAllDanhMucStart());

            } else {
                dispatch(saveDanhMucFailded());
            }
        } catch (e) {
            dispatch(saveDanhMucFailded());
            console.log('saveDanhMucFailded error', e)
        }
    }
}
export const saveDanhMucSucces = () => ({
    type: 'CREATE_DANHMUC_SUCCSESS'
})
export const saveDanhMucFailded = () => ({
    type: 'REATE_DANHMUC_FAIDED'
})
///delete danh muc
export const deleteDanhMuc = (danhmucId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteDanhMucService(danhmucId);
            if (res && res.errCode === 0) {
                toast.success("Xóa danh mục thành công");
                dispatch(deleteDanhMucSuccess())
                dispatch(fetchAllDanhMucStart());
            } else {
                toast.error("Xóa danh mục không thành công");
                dispatch(deleteDanhMucFailded());
            }
        } catch (e) {
            toast.error("Xóa danh mục không thành công");
            dispatch(deleteDanhMucFailded());
            console.log('deleteSuKienFailded error', e)
        }
    }
}
export const deleteDanhMucSuccess = (data) => ({
    type: actionTypes.DELETE_DANHMUC_SUCCESS

})
export const deleteDanhMucFailded = () => ({
    type: actionTypes.DELETE_DANHMUC_FAILDED
})
// edit danh muc
export const editdanhmuc = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editDanhMucSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật danh mục thành công");
                dispatch(editDanhMucSuccess())
                dispatch(fetchAllDanhMucStart());
            } else {
                toast.error("Cập nhật danh mục không thành công");
                dispatch(editDanhMucFailded());
            }
        } catch (e) {
            toast.error("Cập nhật danh mục không thành công");
            dispatch(editDanhMucFailded());
            console.log('EditDanhMucFailded error', e)
        }
    }
}
export const editDanhMucSuccess = (data) => ({
    type: actionTypes.EDIT_DANHMUC_SUCCESS

})
export const editDanhMucFailded = (data) => ({
    type: actionTypes.EDIT_DANHMUC_FAILDED
})
// let res1 = await getTopDanhMucService('');
// console.log('b1809299 check top danh', res1)
export const fetchTopDanhMuc = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDanhMucService('');
            // console.log('check res: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DANHMUC_SUCCESS,
                    dataTopDanhMuc: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DANHMUC_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DANHMUC_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DANHMUC_FAILDED,
            })

        }
    }

}
//////////////////////////////////////////////////////////////////////////////////////
///////////loai su kien///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
////al loai su kien
export const fetchAllLoaiSKStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllLoaiSK("ALL");

            if (res && res.errCode === 0) {
                dispatch(fetchAllLoaiSKSuccess(res.loaisk.reverse()))
            } else {
                toast.error("Lấy danh sách loại sự kiện thành công");
                dispatch(fetchAllLoaiSKFailded());
            }
        } catch (e) {
            toast.error("Lấy danh sách loại sự kiện thành công không thành công");
            dispatch(fetchAllLoaiSKFailded());
            console.log('fetchAllLoaiSKFailde derror', e);
        }
    }
}
export const fetchAllLoaiSKSuccess = (data) => ({
    type: 'FETCH_ALL_LOAISK_SUCCESS',
    loaisk: data
})
export const fetchAllLoaiSKFailded = () => ({
    type: ' FETCH_ALL_LOAISK_FAILDED'
})
///save loai sk
export const createNewLoaiSK = (data1) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewLoaiSKSevice(data1);
            // console.log('saveDanhMucss', res)
            if (res && res.errCode === 0) {
                toast.success("Thêm loại sự kiện mới thành công");
                dispatch(saveLoaiSKSucces())
                dispatch(fetchAllLoaiSKStart());

            } else {
                dispatch(saveLoaiSKFailded());
            }
        } catch (e) {
            dispatch(saveLoaiSKFailded());
            console.log('saveLoaiSKFailded error', e)
        }
    }
}
export const saveLoaiSKSucces = () => ({
    type: actionTypes.CREATE_LOAISK_SUCCSESS
})
export const saveLoaiSKFailded = () => ({
    type: actionTypes.REATE_LOAISK_FAIDED
})
/// xoa su kien
export const deleteSuKien = (sukienId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSuKienService(sukienId);
            if (res && res.errCode === 0) {
                toast.success("Xóa sự kiện thành công");
                dispatch(deleteSuKienSuccess())
                dispatch(fetchAllLoaiSKStart());
            } else {
                toast.error("Xóa sự kiện không thành công");
                dispatch(deleteSuKienFailded());
            }
        } catch (e) {
            toast.error("Xóa sự kiện không thành công");
            dispatch(deleteSuKienFailded());
            console.log('deleteSuKienFailded error', e)
        }
    }
}
export const deleteSuKienSuccess = (data) => ({
    type: actionTypes.DELETE_SK_SUCCESS

})
export const deleteSuKienFailded = () => ({
    type: actionTypes.DELETE_SK_FAILDED
})
///edit su kien
export const editsukien = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editSKSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật sự kiện thành công");
                dispatch(editSuKienSuccess())
                dispatch(fetchAllLoaiSKStart());
            } else {
                toast.error("Cập nhật sự kiện không thành công");
                dispatch(editSuKienFailded());
            }
        } catch (e) {
            toast.error("Cập nhật sự kiện không thành công");
            dispatch(editSuKienFailded());
            console.log('EditSuKienFailded error', e)
        }
    }
}
export const editSuKienSuccess = (data) => ({
    type: actionTypes.EDIT_SK_SUCCESS

})
export const editSuKienFailded = (data) => ({
    type: actionTypes.EDIT_SK_FAILDED
})
////top loai sk
export const fetchTopLoaiSK = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopLoaiSKService('');
            // console.log('check res: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_LOAISK_SUCCESS,
                    dataTopLoaiSK: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_LOAISK_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_LOAISK_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_LOAISK_FAILDED,
            })

        }
    }

}
///all su kien
export const fetchAllsukien = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllsukien();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SUKIEN_SUCCESS,
                    dataSukien: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SUKIEN_FAILDED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_SUKIEN_FAILDED', e);
            dispatch({
                type: actionTypes.FETCH_ALL_SUKIEN_FAILDED
            });

        }
    }
}
//create info event
export const CreateInfoSuKien = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createInfoSK(data);
            if (res && res.errCode === 0) {
                toast.success("Thêm thông tin sự kiện thành công");
                dispatch({
                    type: actionTypes.FETCH_INFO_SUKIEN_SUCCESS,
                })
            } else {
                toast.error("Thêm thông tin sự kiện không thành công");
                dispatch({
                    type: actionTypes.FETCH_INFO_SUKIEN_FAILDED
                })
            }
        } catch (e) {
            toast.error("Thêm thông tin sự kiện không thành công");
            console.log('FETCH_INFO_SUKIEN_FAIDED', e)
            dispatch({
                type: actionTypes.FETCH_INFO_SUKIEN_FAILDED
            })

        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////
///////////size///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//allsize
export const fetchAllSizeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSize("ALL");

            if (res && res.errCode === 0) {
                dispatch(fetchAllSizeSuccess(res.size.reverse()))
            } else {
                toast.error("Lấy size không thành công");
                dispatch(fetchAllSizeFailded());
            }
        } catch (e) {
            toast.error("Lấy size không thành công");
            dispatch(fetchAllSizeFailded());
            console.log('fetchAllSizeFailde derror', e);
        }
    }
}
export const fetchAllSizeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SIZE_SUCCESS,
    allsize: data
})
export const fetchAllSizeFailded = () => ({
    type: actionTypes.FETCH_ALL_SIZE_FAILDED
})

///////////////////////////////////////////////////////////////////////////////////////////////
///////////mon/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///creat mon
//luu mon
export const fetchcreateNewMon = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewMon(data);

            // console.log('savemon   bbbbbb', res)
            if (res && res.errCode === 0) {
                toast.success("Thêm món mới thành công");
                dispatch(saveMonSuccess())
                dispatch(fetchAllMonStart());

            } else {
                dispatch(saveMonFailded());
            }
        } catch (e) {
            dispatch(saveMonFailded());
            console.log('saveMonFailded error', e)
        }
    }
}
export const saveMonSuccess = () => ({
    type: actionTypes.CREATE_MON_SUCCESS
})
export const saveMonFailded = () => ({
    type: actionTypes.CREATE_MON_FAILDED
})
//all mon
export const fetchAllMonStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllMon("ALL");
            // console.log('all mon:', res);
            // let re1 = await getAllMonHome(100);
            // console.log('all mon:', re1);
            if (res && res.errCode === 0) {
                // toast.success("Lấy món thành công");
                dispatch(fetchAllMonSuccess(res.mons.reverse()))
            } else {
                toast.error("Lấy món không thành công");
                dispatch(fetchAllMonFailded());
            }
        } catch (e) {
            toast.error("Lấy món không thành công");
            dispatch(fetchAllMonFailded());
            console.log('fetchAllMonFailde derror', e);
        }
    }
}
export const fetchAllMonSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_MON_SUCCESS,
    allmon: data
})
export const fetchAllMonFailded = () => ({
    type: actionTypes.FETCH_ALL_MON_FAILDED
})
///xoa mon
export const deleteMon = (monId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteMonService(monId);
            if (res && res.errCode === 0) {
                toast.success("Xóa món thành công");
                dispatch(deleteMonSuccess())
                dispatch(fetchAllMonStart());
            } else {
                toast.error("Xóa món không thành công");
                dispatch(deleteMonFailded());
            }
        } catch (e) {
            toast.error("Xóa món không thành công");
            dispatch(deleteMonFailded());
            console.log('deleteMonFailded error', e)
        }
    }
}
export const deleteMonSuccess = (data) => ({
    type: actionTypes.DELETE_MON_SUCCESS

})
export const deleteMonFailded = (data) => ({
    type: actionTypes.DELETE_MON_FAILDED
})
/////edit mon
export const editMon = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editMonSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật món thành công");
                dispatch(editMonSuccess())
                dispatch(fetchAllMonStart());
            } else {
                toast.error("Cập nhật món không thành công");
                dispatch(editMonFailded());
            }
        } catch (e) {
            toast.error("Cập nhật món không thành công");
            dispatch(editMonFailded());
            console.log('EditMonFailded error', e)
        }
    }
}
export const editMonSuccess = (data) => ({
    type: actionTypes.EDIT_MON_SUCCESS

})
export const editMonFailded = (data) => ({
    type: actionTypes.EDIT_MON_FAILDED
})
////creat gia size
export const fetchcreateNewGiaSize = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewGiaSize(data);

            // console.log('savemon   bbbbbb', res)
            if (res && res.errCode === 0) {
                toast.success("Thêm giá món mới thành công");
                dispatch(saveGiaMonSuccess())
                dispatch(fetchAllGiaMonStart());

            } else {
                dispatch(saveGiaMonFailded());
            }
        } catch (e) {
            dispatch(saveGiaMonFailded());
            console.log('saveGiaMonFailded error', e)
        }
    }
}
export const saveGiaMonSuccess = () => ({
    type: actionTypes.CREATE_GIA_MON_SUCCESS
})
export const saveGiaMonFailded = () => ({
    type: actionTypes.CREATE_GIA_MON_FAILDED
})
/////all gia mon
export const fetchAllGiaMonStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllGiaMon("ALL");
            console.log('all mon:', res);
            // let re1 = await getAllMonHome(100);
            // console.log('all mon:', re1);
            if (res && res.errCode === 0) {
                // toast.success("Lấy món thành công");
                dispatch(fetchAllGiaMonSuccess(res.giasize.reverse()))
            } else {
                toast.error("Lấy giá món không thành công");
                dispatch(fetchAllGiaMonFailded());
            }
        } catch (e) {
            toast.error("Lấy giá món không thành công");
            dispatch(fetchAllGiaMonFailded());
            console.log('fetchAllGiaMonFailde derror', e);
        }
    }
}
export const fetchAllGiaMonSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_GIA_MON_SUCCESS,
    allgia: data
})
export const fetchAllGiaMonFailded = () => ({
    type: actionTypes.FETCH_ALL_GIA_MON_FAILDED
})
///xoa gia mon
export const deleteGiaMon = (giamonId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteGiaMonService(giamonId);
            if (res && res.errCode === 0) {
                toast.success("Xóa giá món thành công");
                dispatch(deleteGiaMonSuccess())
                dispatch(fetchAllGiaMonStart());
            } else {
                toast.error("Xóa giá món không thành công");
                dispatch(deleteGiaMonFailded());
            }
        } catch (e) {
            toast.error("Xóa giá món không thành công");
            dispatch(deleteGiaMonFailded());
            console.log('deleteGiaMonFailded error', e)
        }
    }
}
export const deleteGiaMonSuccess = (data) => ({
    type: actionTypes.DELETE_GIA_MON_SUCCESS

})
export const deleteGiaMonFailded = (data) => ({
    type: actionTypes.DELETE_GIA_MON_FAILDED
})
///edit gia mon
export const editGiaMon = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editGiaMonSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật giá món thành công");
                dispatch(editGiaMonSuccess())
                dispatch(fetchAllGiaMonStart());
            } else {
                toast.error("Cập nhật giá món không thành công");
                dispatch(editGiaMonFailded());
            }
        } catch (e) {
            toast.error("Cập nhật giá món không thành công");
            dispatch(editGiaMonFailded());
            console.log('EditGiaMonFailded error', e)
        }
    }
}
export const editGiaMonSuccess = (data) => ({
    type: actionTypes.EDIT_GIA_MON_SUCCESS

})
export const editGiaMonFailded = (data) => ({
    type: actionTypes.EDIT_GIA_MON_FAILDED
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////khu ban/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////all khu
export const fetchAllKhuStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllKhu("ALL");
            // console.log('all khu:', res);
            if (res && res.errCode === 0) {
                // toast.success("Lấy món thành công");
                dispatch(fetchAllKhuSuccess(res.khus))
            } else {
                toast.error("Lấy món không thành công");
                dispatch(fetchAllKhuFailded());
            }
        } catch (e) {
            toast.error("Lấy món không thành công");
            dispatch(fetchAllKhuFailded());
            console.log('fetchAllKhuFailde derror', e);
        }
    }
}
export const fetchAllKhuSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_KHU_SUCCESS,
    allkhu: data
})
export const fetchAllKhuFailded = () => ({
    type: actionTypes.FETCH_ALL_KHU_FAILDED
})
//create khu
export const fetchcreateNewKhu = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewKhu(data);

            // console.log('savemon   bbbbbb', res)
            if (res && res.errCode === 0) {
                toast.success("Thêm Khu mới thành công");
                dispatch(saveKhuSuccess())
                dispatch(fetchAllKhuStart());

            } else {
                dispatch(saveKhuFailded());
            }
        } catch (e) {
            dispatch(saveKhuFailded());
            console.log('saveKhuFailded error', e)
        }
    }
}
export const saveKhuSuccess = () => ({
    type: actionTypes.CREATE_KHU_SUCCESS
})
export const saveKhuFailded = () => ({
    type: actionTypes.CREATE_KHU_FAILDED
})
/// edit khu
export const editKhu = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editKhuSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật khu thành công");
                dispatch(editKhuSuccess())
                dispatch(fetchAllKhuStart());
            } else {
                toast.error("Cập nhật khu không thành công");
                dispatch(editKhuFailded());
            }
        } catch (e) {
            toast.error("Cập nhật khu không thành công");
            dispatch(editKhuFailded());
            console.log('EditKhuFailded error', e)
        }
    }
}
export const editKhuSuccess = (data) => ({
    type: actionTypes.EDIT_KHU_SUCCESS

})
export const editKhuFailded = (data) => ({
    type: actionTypes.EDIT_KHU_FAILDED
})
///xoa khu
export const deleteKhu = (khuId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteKhuService(khuId);
            if (res && res.errCode === 0) {
                toast.success("Xóa khu thành công");
                dispatch(deleteKhuSuccess())
                dispatch(fetchAllKhuStart());
            } else {
                toast.error("Xóa khu không thành công");
                dispatch(deleteKhuFailded());
            }
        } catch (e) {
            toast.error("Xóa khu không thành công");
            dispatch(deleteKhuFailded());
            console.log('deleteKhuFailded error', e)
        }
    }
}
export const deleteKhuSuccess = (data) => ({
    type: actionTypes.DELETE_KHU_SUCCESS

})
export const deleteKhuFailded = (data) => ({
    type: actionTypes.DELETE_KHU_FAILDED
})
/////all ban
export const fetchAllBanStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBan("ALL");
            // console.log('all Ban:', res);
            if (res && res.errCode === 0) {
                // toast.success("Lấy danh sách bàn thành công");
                dispatch(fetchAllbanSuccess(res.ban))
            } else {
                toast.error("Lấy danh sách bàn không thành công");
                dispatch(fetchAllbanFailded());
            }
        } catch (e) {
            toast.error("Lấy danh sách bàn không thành công");
            dispatch(fetchAllbanFailded());
            console.log('fetchAllbanFailde derror', e);
        }
    }
}
export const fetchAllbanSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BAN_SUCCESS,
    allban: data
})
export const fetchAllbanFailded = () => ({
    type: actionTypes.FETCH_ALL_BAN_FAILDED
})
/// create ban
export const fetchcreateNewBan = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBan(data);

            // console.log('savemon   bbbbbb', res)
            if (res && res.errCode === 0) {
                toast.success("Thêm bàn mới thành công");
                dispatch(saveBanSuccess())
                dispatch(fetchAllBanStart());

            } else {
                dispatch(saveBanFailded());
            }
        } catch (e) {
            dispatch(saveBanFailded());
            console.log('saveBanFailded error', e)
        }
    }
}
export const saveBanSuccess = () => ({
    type: actionTypes.CREATE_BAN_SUCCESS
})
export const saveBanFailded = () => ({
    type: actionTypes.CREATE_BAN_FAILDED
})
///xoa ban
export const deleteBan = (banId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBanService(banId);
            if (res && res.errCode === 0) {
                toast.success("Xóa bàn thành công");
                dispatch(deleteBanSuccess())
                dispatch(fetchAllBanStart());
            } else {
                toast.error("Xóa bàn không thành công");
                dispatch(deleteBanFailded());
            }
        } catch (e) {
            toast.error("Xóa bàn không thành công");
            dispatch(deleteBanFailded());
            console.log('deleteBanFailded error', e)
        }
    }
}
export const deleteBanSuccess = (data) => ({
    type: actionTypes.DELETE_BAN_SUCCESS

})
export const deleteBanFailded = (data) => ({
    type: actionTypes.DELETE_BAN_FAILDED
})
/// edit ban
export const editBan = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editBanSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật bàn thành công");
                dispatch(editBanSuccess())
                dispatch(fetchAllBanStart());
            } else {
                toast.error("Cập nhật bàn không thành công");
                dispatch(editBanFailded());
            }
        } catch (e) {
            toast.error("Cập nhật bàn không thành công");
            dispatch(editBanFailded());
            console.log('EditBanFailded error', e)
        }
    }
}
export const editBanSuccess = (data) => ({
    type: actionTypes.EDIT_BAN_SUCCESS

})
export const editBanFailded = (data) => ({
    type: actionTypes.EDIT_BAN_FAILDED
})
//all time dien
export const fetchTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchTimeSuccess(res.data))
            } else {
                dispatch(fetchTimeFailded());
            }
        } catch (e) {
            dispatch(fetchTimeFailded());
            console.log('fetchTimeFailded error', e);

        }

    }
}
export const fetchTimeSuccess = (timeData) => ({
    type: actionTypes.FETCH_TIME_SUCCESS,
    times: timeData
})

export const fetchTimeFailded = () => ({
    type: actionTypes.FETCH_TIME_FAILDED
})
///all gia su kien
export const fetchPriceStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PRICE");
            if (res && res.errCode === 0) {
                dispatch(fetchPriceSuccess(res.data))
            } else {
                dispatch(fetchPriceFailded());
            }
        } catch (e) {
            dispatch(fetchPriceFailded());
            console.log('fetchPriceFailded error', e);

        }

    }
}
export const fetchPriceSuccess = (priceData) => ({
    type: actionTypes.FETCH_ALL_GIA_SK_SUCCESS,
    allprice: priceData
})
export const fetchPriceFailded = () => ({
    type: actionTypes.FETCH_ALL_GIA_SK_FAILDED
})
///all phuong thuc thanh toan
export const fetchPTTTStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPTTTService("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchPTTTSuccess(res.thanhtoans))
            } else {
                dispatch(fetchPTTTFailded());
            }
        } catch (e) {
            dispatch(fetchPTTTFailded());
            console.log('fetchPTTTFailded error', e);

        }

    }
}
export const fetchPTTTSuccess = (ptttData) => ({
    type: actionTypes.FETCH_ALL_PTTTT_SUCCESS,
    allpttt: ptttData
})
export const fetchPTTTFailded = () => ({
    type: actionTypes.FETCH_ALL_PTTTT_FAILDED
})
//get cart by id
export const fetchCartByIDStart = (ID_TK) => {
    return async (dispatch, getState) => {
        try {
            let res = await getcartbyid(ID_TK);
            console.log('get cart by id:', res)
            if (res && res.errCode === 0) {
                dispatch(fetchCartByIDSuccess(res.size.reverse()))
            } else {
                toast.error(" Lấy sản phẩm trong giỏ hàng không thành công");
                dispatch(fetchCartByIDFailded());
            }
        } catch (e) {
            toast.error(" Lấy sản phẩm trong giỏ hàng không thành công");
            dispatch(fetchCartByIDFailded());
            console.log('fetchCartByIDFailde derror', e);
        }
    }
}
export const fetchCartByIDSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CART_BYID_SUCCESS,
    allsize: data
})
export const fetchCartByIDFailded = () => ({
    type: actionTypes.FETCH_ALL_CART_BYID_FAILDED
})
//all status
export const fetchAllStatusStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("STATUSS");
            //console.log('status: ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllStatusSuccess(res.data))
            } else {
                dispatch(fetchAllStatusFailded());
            }
        } catch (e) {
            dispatch(fetchAllStatusFailded());
            console.log('fetchAllStatusFailded error', e);

        }

    }
}
export const fetchAllStatusSuccess = (timeData) => ({
    type: actionTypes.FETCH_STATUS_SUCCESS,
    allstatus: timeData
})
export const fetchAllStatusFailded = () => ({
    type: actionTypes.FETCH_STATUS_FAILDED
})
/// edit ban
export const editID_TT = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editTTDonSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật Trạng thái đơn thành công");
                dispatch(editidttSuccess())
                // dispatch(fetchAllBanStart());
            } else {
                toast.error("Cập nhật Trạng thái đơn không thành công");
                dispatch(editidttFailded());
            }
        } catch (e) {
            toast.error("Cập nhật Trạng thái đơn không thành công");
            dispatch(editidttFailded());
            console.log('editidttFailded error', e)
        }
    }
}
export const editidttSuccess = (data) => ({
    type: actionTypes.EDIT_STATUSS_SUCCESS

})
export const editidttFailded = (data) => ({
    type: actionTypes.EDIT_STATUSS_FAILDED
})
/// edit ban
export const YCHD = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editYCHDService(data);
            if (res && res.errCode === 0) {
                toast.success("Yêu cầu hủy đơn thành công");
                dispatch(yeucauhuydonSuccess())
                // dispatch(fetchAllBanStart());
            } else {
                toast.error("Yêu cầu hủy đơn không thành công");
                dispatch(yeucauhuydonFailded());
            }
        } catch (e) {
            toast.error("Yêu cầu hủy đơn không thành công");
            dispatch(yeucauhuydonFailded());
            console.log('yeucauhuydonFailded error', e)
        }
    }
}
export const yeucauhuydonSuccess = (data) => ({
    type: actionTypes.EDIT_YCHD_SUCCESS

})
export const yeucauhuydonFailded = (data) => ({
    type: actionTypes.EDIT_YCHD_FAILDED
})
//all status
export const fetchAllNhanVienStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllNhanVien("ALL");
            //console.log('status: ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllNhanVienSuccess(res.users))
            } else {
                dispatch(fetchAllNhanVienFailded());
            }
        } catch (e) {
            dispatch(fetchAllNhanVienFailded());
            console.log('fetchAllNhanVienFailded error', e);

        }

    }
}
export const fetchAllNhanVienSuccess = (data) => ({
    type: actionTypes.FETCH_NHANVIEN_SUCCESS,
    nhanvien: data
})
export const fetchAllNhanVienFailded = () => ({
    type: actionTypes.FETCH_NHANVIEN_FAILDED
})
/// create phieu chi
export const fetchcreateNewPhieuChi = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewPhieuChiSevice(data);

            // console.log('savemon   bbbbbb', res)
            if (res && res.errCode === 0) {
                toast.success("Lập phiếu chi thành công");
                dispatch(savePhieuChiSuccess())
                dispatch(fetchAllPhieuChiStart());

            } else {
                dispatch(savePhieuChiFailded());
                toast.error("Lập phiếu chi không thành công");
            }
        } catch (e) {
            dispatch(savePhieuChiFailded());
            console.log('saveBanFailded error', e)
        }
    }
}
export const savePhieuChiSuccess = () => ({
    type: actionTypes.CREATE_PHIEUCHI_SUCCESS
})
export const savePhieuChiFailded = () => ({
    type: actionTypes.CREATE_PHIEUCHI_FAILDED
})
//all phieu chi
export const fetchAllPhieuChiStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPhieuChi("ALL");
            //console.log('status: ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllPhieuChiSuccess(res.phieu.reverse()))
            } else {
                dispatch(fetchAllPhieuChiFailded());
            }
        } catch (e) {
            dispatch(fetchAllPhieuChiFailded());
            console.log('fetchAllPhieuChiFailded error', e);

        }

    }
}
export const fetchAllPhieuChiSuccess = (data) => ({
    type: actionTypes.FETCH_PHIEUCHI_SUCCESS,
    phieuchi: data
})
export const fetchAllPhieuChiFailded = () => ({
    type: actionTypes.FETCH_PHIEUCHI_FAILDED
})
///xoa Phieu Chi
export const deletePhieuChi = (phieuId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deletePhieuChiService(phieuId);
            if (res && res.errCode === 0) {
                toast.success("Xóa Phiếu chi thành công");
                dispatch(deletePhieuChiSuccess())
                dispatch(fetchAllPhieuChiStart());
            } else {
                toast.error("Xóa Phiếu chi không thành công");
                dispatch(deletePhieuChiFailded());
            }
        } catch (e) {
            toast.error("Xóa Phiếu chi không thành công");
            dispatch(deletePhieuChiFailded());
            console.log('deletePhieuChiFailded error', e)
        }
    }
}
export const deletePhieuChiSuccess = (data) => ({
    type: actionTypes.DELETE_PHIEUCHI_SUCCESS

})
export const deletePhieuChiFailded = (data) => ({
    type: actionTypes.DELETE_PHIEUCHI_FAILDED
})
/// edit phieu chi
export const editphieuchi = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editphieuchiSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật phiếu chi thành công");
                dispatch(editphieuchiSuccess())
                dispatch(fetchAllPhieuChiStart());
            } else {
                toast.error("Cập nhật phiếu chi không thành công");
                dispatch(editphieuchiFailded());
            }
        } catch (e) {
            toast.error("Cập nhật phiếu chi không thành công");
            dispatch(editphieuchiFailded());
            console.log('editphieuchiFailded error', e)
        }
    }
}
export const editphieuchiSuccess = (data) => ({
    type: actionTypes.EDIT_PHIEUCHI_SUCCESS

})
export const editphieuchiFailded = (data) => ({
    type: actionTypes.EDIT_PHIEUCHI_FAILDED
})
///all status ban dat
export const fetchstatusbanStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("STATUS");
            if (res && res.errCode === 0) {
                dispatch(fetchstatusSuccess(res.data))
            } else {
                dispatch(fetchstatusFailded());
            }
        } catch (e) {
            dispatch(fetchstatusFailded());
            console.log('fetchstattusFailded error', e);

        }

    }
}
export const fetchstatusSuccess = (statusData) => ({
    type: actionTypes.FETCH_STA_SUCCESS,
    ttban: statusData
})

export const fetchstatusFailded = () => ({
    type: actionTypes.FETCH_STA_FAILDED
})
// /////all ghe
export const fetchAllgheStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllghe("ALL");
            // console.log('all Ban:', res);
            if (res && res.errCode === 0) {
                // toast.success("Lấy danh sách bàn thành công");
                dispatch(fetchAllgheSuccess(res.ghe))
            } else {
                toast.error("Lấy danh sách ghế không thành công");
                dispatch(fetchAllgheFailded());
            }
        } catch (e) {
            toast.error("Lấy danh sách ghế không thành công");
            dispatch(fetchAllgheFailded());
            console.log('fetchAllbanFailde derror', e);
        }
    }
}
export const fetchAllgheSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_GHE_SUCCESS,
    allghe: data
})
export const fetchAllgheFailded = () => ({
    type: actionTypes.FETCH_ALL_GHE_FAILDED
})
/// create ghe
export const fetchcreateNewghe = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewghe(data);

            // console.log('savemon   bbbbbb', res)
            if (res && res.errCode === 0) {
                toast.success("Thêm ghế mới thành công");
                dispatch(savegheSuccess())
                dispatch(fetchAllgheStart());

            } else {
                toast.error("Thêm ghế mới không thành công");
                dispatch(savegheFailded());
            }
        } catch (e) {
            dispatch(savegheFailded());
            console.log('savegheFailded error', e)
        }
    }
}
export const savegheSuccess = () => ({
    type: actionTypes.CREATE_GHE_SUCCESS
})
export const savegheFailded = () => ({
    type: actionTypes.CREATE_GHE_FAILDED
})
///xoa ghe
export const deleteghe = (gheId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deletegheService(gheId);
            if (res && res.errCode === 0) {
                toast.success("Xóa ghế thành công");
                dispatch(deletegheSuccess())
                dispatch(fetchAllgheStart());
            } else {
                toast.error("Xóa ghế không thành công");
                dispatch(deletegheFailded());
            }
        } catch (e) {
            toast.error("Xóa ghế không thành công");
            dispatch(deletegheFailded());
            console.log('deleteBanFailded error', e)
        }
    }
}
export const deletegheSuccess = (data) => ({
    type: actionTypes.DELETE_GHE_SUCCESS

})
export const deletegheFailded = (data) => ({
    type: actionTypes.DELETE_GHE_FAILDED
})
// edit ghe
export const editghe = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editgheSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật ghế thành công");
                dispatch(editgheSuccess())
                dispatch(fetchAllgheStart());
            } else {
                toast.error("Cập nhật ghế  không thành công");
                dispatch(editgheFailded());
            }
        } catch (e) {
            toast.error("Cập nhật ghế  không thành công");
            dispatch(editgheFailded());
            console.log('EditgheFailded error', e)
        }
    }
}
export const editgheSuccess = (data) => ({
    type: actionTypes.EDIT_GHE_SUCCESS

})
export const editgheFailded = (data) => ({
    type: actionTypes.EDIT_GHE_FAILDED
})
//all status ve
export const fetchAllStatusveStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("STATUSSVE");
            //console.log('status: ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllStatusveSuccess(res.data))
            } else {
                dispatch(fetchAllStatusFailded());
            }
        } catch (e) {
            dispatch(fetchAllStatusFailded());
            console.log('fetchAllStatusFailded error', e);

        }

    }
}
export const fetchAllStatusveSuccess = (timeData) => ({
    type: actionTypes.FETCH_STATUSVE_SUCCESS,
    allstatusve: timeData
})
export const fetchAllStatusveFailded = () => ({
    type: actionTypes.FETCH_STATUSVE_FAILDED
})
/// update tt ve
export const editID_TT_VE = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editTTveSevice(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật Trạng thái vé thành công");
                dispatch(editidttSuccess())
                // dispatch(fetchAllBanStart());
            } else {
                toast.error("Cập nhật Trạng thái vé không thành công");
                dispatch(editidttFailded());
            }
        } catch (e) {
            toast.error("Cập nhật Trạng thái đơn không thành công");
            dispatch(editidttFailded());
            console.log('editidttFailded error', e)
        }
    }
}
export const editidttveSuccess = (data) => ({
    type: actionTypes.EDIT_STATUSSVE_SUCCESS

})
export const editidttveFailded = (data) => ({
    type: actionTypes.EDIT_STATUSSVE_FAILDED
})