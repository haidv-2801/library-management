﻿using TOE.TOEIC.ApplicationCore.Interfaces;
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
    public class BookRepository : BaseRepository<BookItem>, IBookRepository
    {
        #region Constructer
        public BookRepository(IConfiguration configuration) : base(configuration)
        {

        }

        #endregion

        #region Method
        public async Task<string> GetNextBookCode() => await _dbConnection.QueryFirstOrDefaultAsync<string>("Proc_NextBookCode", commandType: CommandType.StoredProcedure);

        public async Task<long> GetTotalBook() => await _dbConnection.QueryFirstOrDefaultAsync<long>("Proc_GetTotalBook", commandType: CommandType.StoredProcedure);
        #endregion
    }
}
