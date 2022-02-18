using TOE.TOEIC.ApplicationCore.Interfaces;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using System.Linq;
using Microsoft.Extensions.Configuration;
using TOE.TOEIC.ApplicationCoore.Entities;
using TOE.TOEIC.ApplicationCore.Entities;

namespace TOE.TOEIC.Infrastructure
{
    /// <summary>
    /// Repository danh mục người dùng
    /// </summary>
    /// CREATED BY: DVHAI (07/07/2021)
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        #region Constructer
        public UserRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion

        #region Methods
        public IEnumerable<User> GetUsersFilterPaging(string filterValue, int? pageSize = null, int? pageNum = null)
        {
            //1. Ánh xạ giá trị
            var param = new DynamicParameters();
            param.Add($"@FilterValue", filterValue);
            param.Add($"@PageSize", pageSize);
            param.Add($"@PageNum", pageNum);

            //2. Tạo kết nối và truy vấn                        
            var users = _dbConnection.Query<User>($"Proc_Get{_tableName}sFilterPaging", param: param, commandType: CommandType.StoredProcedure);

            //3. Trả về dữ liệu
            return users;
        }

        public int GetTotalUserFilter(string filterValue)
        {
            //1. Ánh xạ giá trị
            var param = new DynamicParameters();
            param.Add($"@filterValue", filterValue);

            //2. Tạo kết nối và truy vấn                        
            int totalRecord = _dbConnection.Query<int>($"Proc_GetTotal{_tableName}sFilter", param: param, commandType: CommandType.StoredProcedure).SingleOrDefault();

            return totalRecord;
        }
        #endregion
    }
}
