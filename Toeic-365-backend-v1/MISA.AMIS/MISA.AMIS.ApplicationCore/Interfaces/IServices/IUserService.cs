using TOE.TOEIC.ApplicationCoore.Entities;
using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public interface IUserService : IBaseService<User>
    {
        /// <summary>
        /// Lấy danh sách user phân trang
        /// </summary>
        /// <param name="filterValue"></param>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        ServiceResult GetUsersFilterPaging(string filterValue, int limit, int offset);

        /// <summary>
        /// Đăng nhập
        /// </summary>
        /// <param name="userRequest"></param>
        /// <returns></returns>
        object Login(User userRequest);
    }
}
