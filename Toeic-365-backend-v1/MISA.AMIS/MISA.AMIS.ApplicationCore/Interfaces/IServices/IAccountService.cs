using TOE.TOEIC.ApplicationCoore.Entities;
using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public interface IAccountService : IBaseService<Account>
    {
        /// <summary>
        /// Lấy danh sách nhân viên phân trang, tìm kiếm
        /// </summary>
        /// <param name="filterValue">Giá trị tìm kiếm</param>
        /// <param name="limit">Số bản ghi trên 1 trang</param>
        /// <param name="offset">Số trang</param>
        /// <returns>Danh sách bài đăng</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        ServiceResult GetAccountsFilterPaging(string filterValue, int limit, int offset);

        /// <summary>
        /// Đăng nhập
        /// </summary>
        /// <param name="userRequest"></param>
        /// <returns></returns>
        object Login(Account userRequest);

        /// <summary>
        /// Change password
        /// </summary>
        /// <param name="userRequest"></param>
        /// <returns></returns>
        ServiceResult ChangePassword(Guid entityId, AccountPasswordChangeDTO entity);
    }
}
