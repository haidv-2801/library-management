using TOE.TOEIC.ApplicationCore.Interfaces;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using System.Linq;
using Microsoft.Extensions.Configuration;
using TOE.TOEIC.ApplicationCore.Entities;
using System.Threading.Tasks;

namespace TOE.TOEIC.Infrastructure
{
    /// <summary>
    /// Repository danh mục bài viết
    /// </summary>
    /// CREATED BY: DVHAI (07/07/2021)
    public class BookOrderRepository : BaseRepository<BookOrder>, IBookOrderRepository
    {
        #region Constructer
        public BookOrderRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public async Task<long> CountTotalBookUserLoanByOrderStatus(string orderStatus, Guid accountID)
        {
            var parameters = new DynamicParameters();
            parameters.Add(@"OrderStatus", orderStatus);
            parameters.Add(@"AccountID", accountID.ToString());
            var result = await _dbConnection.QueryFirstOrDefaultAsync<long>("Proc_CountTotalBookUserLoanByOrderStatus", param: parameters, commandType: CommandType.StoredProcedure);
            return result;
        }

        public async Task<string> GetNextBookOrderCode() => await _dbConnection.QueryFirstOrDefaultAsync<string>("Proc_NextBookOrderCode", commandType: CommandType.StoredProcedure);
        #endregion

        #region Methods
        #endregion
    }
}
