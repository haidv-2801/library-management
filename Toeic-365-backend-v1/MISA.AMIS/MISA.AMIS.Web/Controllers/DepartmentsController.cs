using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using TOE.TOEIC.ApplicationCore;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.Web.Controllers;
using TOE.TOEIC.ApplicationCoore.Entities;
using Microsoft.AspNetCore.Cors;

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Controller phòng ban
    /// </summary>
    [ApiController]
    public class DepartmentsController : BaseEntityController<Department>
    {
        #region Declare
        IDepartmentService _departmentService;
        #endregion

        #region Constructer
        public DepartmentsController(IDepartmentService departmentService) : base(departmentService)
        {
            _departmentService = departmentService;
        }
        #endregion
    }
}
