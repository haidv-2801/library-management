using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.Web.Controllers;
using Microsoft.AspNetCore.Cors;
using TOE.TOEIC.Entities;
using System.Threading;
using Microsoft.Extensions.Logging;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller bài đăng
    /// </summary>
    [ApiController]
    public class CategorysController : BaseEntityController<Category>
    {
        #region Declare
        IBaseService<Category> _categoryService;
        #endregion

        #region Constructer
        public CategorysController(IBaseService<Category> menuService, ILogger<Category> logger) : base(menuService, logger)
        {
            _categoryService = menuService;
        }
        #endregion

        #region Methods
        #endregion
    }
}
