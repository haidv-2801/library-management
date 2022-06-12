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
    /// Repository danh mục menu
    /// </summary>
    /// CREATED BY: DVHAI (07/07/2021)
    public class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        #region Constructer
        public RoleRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion

        #region Methods
        #endregion
    }
}
