export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },

            {
                name: 'menu.admin.manage-nv', link: '/system/user-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //      { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'

            // },
            { //Quản lý bán hàng
                name: 'menu.nhanvien.nhanvien-banhang', link: '/nhanvien/ban-hang'
            },

        ]
    },
    { //Quản Lý sản phẩm
        name: 'menu.admin.manage-product',
        menus: [
            {
                name: 'menu.admin.manage-doanhmuc', link: '/system/danh-muc'
            },
            {
                name: 'menu.admin.manage-sp', link: '/system/san-pham'
            },
            {
                name: 'menu.admin.manage-giasp', link: '/system/gia-sp'
            },
            {
                name: 'menu.admin.manage-km', link: '/system/km'
            },
        ]
    },
    { //Quản lý sự kiện
        name: 'menu.admin.manage-event',
        menus: [
            {
                name: 'menu.admin.manage-dmsk', link: '/system/loai-sk'
            },
            {
                name: 'menu.admin.manage-ctsk', link: '/system/manage-ctsk'

            },
            {
                name: 'menu.admin.manage-ghe', link: '/system/manage-ghe'
            },
            {
                name: 'menu.admin.manage-ttghe', link: '/system/manage-ttghe'
            },
        ]
    },
    { //Quản lý đơn hàng
        name: 'menu.admin.manage-dh',
        menus: [


            // {
            //     name: 'menu.admin.manage-db', link: '/system/user-db'
            // },
            // {
            //     name: 'menu.admin.manage-dsp', link: '/system/user-dsp'

            // },
            { //Quản lý đơn hàng

                name: 'menu.nhanvien.manage-donhang', link: '/nhanvien/qldon'
            },
            { //Quản lý đơn vé

                name: 'menu.nhanvien.manage-donve', link: '/nhanvien/user-vesk'


            },


        ]
    },
    { //Quản lý doanh thu
        name: 'menu.admin.manage-dt',
        menus: [

            { //Quản lý chi

                name: 'menu.nhanvien.manage-tc', link: '/nhanvien/chi'


            },
            {
                name: 'menu.admin.manage-thongke', link: '/system/thongke'

            },
            { //Quản lý danh thu

                name: 'menu.nhanvien.manage-danhthu', link: '/nhanvien/danhthu'


            },
        ]
    },
    { //Quản lý khu vuc
        name: 'menu.admin.manage-kv',
        menus: [

            {
                name: 'menu.admin.manage-Khu', link: '/system/khu'

            },

            {
                name: 'menu.admin.manage-ban', link: '/system/ban'

            },
            { //Quản lý đơn đặt bàn

                name: 'menu.nhanvien.manage-datban', link: '/nhanvien/datban'


            },
            { //Quản lý đơn đặt bàn

                name: 'menu.nhanvien.manage-khachdatban', link: '/nhanvien/khachdatban'


            },
        ]
    },

];
export const nhanvienMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //Quản lý bán hàng
                name: 'menu.nhanvien.nhanvien-banhang', link: '/nhanvien/ban-hang'
            },
        ]
    },
    {
        name: 'menu.admin.manage-dh',
        menus: [
            { //Quản lý đơn hàng

                name: 'menu.nhanvien.manage-donhang', link: '/nhanvien/qldon'
            },
            { //Quản lý đơn vé

                name: 'menu.nhanvien.manage-donve', link: '/nhanvien/user-vesk'

            },


        ]
    },
    {
        name: 'menu.admin.manage-dt',
        menus: [
            { //Quản lý danh thu

                name: 'menu.nhanvien.manage-danhthu', link: '/nhanvien/danhthu'


            },
            { //Quản lý chi

                name: 'menu.nhanvien.manage-tc', link: '/nhanvien/chi'


            },
        ]
    },
    {
        name: 'menu.admin.manage-kv',
        menus: [
            { //Quản lý đơn đặt bàn

                name: 'menu.nhanvien.manage-datban', link: '/nhanvien/datban'


            },
            { //Quản lý đơn đặt bàn

                name: 'menu.nhanvien.manage-khachdatban', link: '/nhanvien/khachdatban'


            },
        ]
    }



];
