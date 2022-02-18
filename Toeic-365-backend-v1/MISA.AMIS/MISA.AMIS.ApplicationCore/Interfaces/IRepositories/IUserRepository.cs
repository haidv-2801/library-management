using TOE.TOEIC.ApplicationCoore.Entities;
using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface danh mục nhân viên
    /// </summary>
    /// CREATED BY: DVHAI (07/07/2021)
    public interface IUserRepository : IBaseRepository<User>
    {
        /// <summary>
        /// Lấy danh sách nhân viên phân trang, tìm kiếm
        /// </summary>
        /// <param name="filterValue">Giá trị tìm kiếm</param>
        /// <param name="limit">Số bản ghi trên 1 trang</param>
        /// <param name="offset">Số trang</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        IEnumerable<User> GetUsersFilterPaging(string filterValue, int? pageSize = null, int? pageNum = null);

        /// <summary>
        /// Lấy tổng số bản ghi sau khi lọc
        /// </summary>
        /// <param name="filterValue">Giá trị tìm kiếm</param>
        /// <returns>Tổng bản ghi</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        int GetTotalUserFilter(string filterValue);
    }
}
