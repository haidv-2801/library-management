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
using Microsoft.AspNetCore.Cors;
using TOE.TOEIC.Entities;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Logging;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller bài đăng
    /// </summary>
    [ApiController]
    public class RolesController : BaseEntityController<Role>
    {
        #region Declare
        IRoleService _roleService;
        ILogger<Role> _logger;
        #endregion

        #region Constructer
        public RolesController(IRoleService roleService, ILogger<Role> logger) : base(roleService, logger)
        {
            _roleService = roleService;
            _logger = logger;
        }
        #endregion

        #region Methods
        #endregion
    }
}
