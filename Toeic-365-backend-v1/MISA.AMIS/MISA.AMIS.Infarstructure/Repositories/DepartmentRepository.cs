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
using TOE.TOEIC.ApplicationCore.Interfaces.IRepositories;

namespace TOE.TOEIC.Infrastructure
{
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        #region Constructer
        public DepartmentRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion

        #region Methods
      
        #endregion
    }
}
