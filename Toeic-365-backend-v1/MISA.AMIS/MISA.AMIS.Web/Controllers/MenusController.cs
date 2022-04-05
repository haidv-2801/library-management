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
using TOE.TOEIC.Entities;
using System.Threading;

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Controller bài đăng
    /// </summary>
    [ApiController]
    public class MenusController : BaseEntityController<Menu>
    {
        #region Declare
        IMenuService _menuService;
        #endregion

        #region Constructer
        public MenusController(IMenuService menuService) : base(menuService)
        {
            _menuService = menuService;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy danh sách bài đăng phân trang, tìm kiếm
        /// </summary>
        /// <param name="filterValue">Giá trị tìm kiếm</param>
        /// <param name="pageSize">Số bản ghi trên 1 trang</param>
        /// <param name="pageNumber">Số trang</param>
        /// <returns>Danh sách bài đăng</returns>
        /// CREATED BY: DVHAI (07/07/2021)
        [EnableCors("AllowCROSPolicy")]
        [Route("/api/Menus/MenusFilterPaging")]
        [HttpPost]
        public ActionResult GetMenusFilterPaging([FromQuery]string filterValue, [FromQuery] int pageSize, [FromQuery] int pageNumber)
        {
            return Ok(_menuService.GetMenusFilterPaging(filterValue, pageSize, pageNumber));           
        }
        #endregion
    }
}
