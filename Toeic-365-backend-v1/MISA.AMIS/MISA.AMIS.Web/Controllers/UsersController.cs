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
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller nhân viên
    /// </summary>
    [ApiController]
    [Authorize]
    public class UsersController : BaseEntityController<User>
    {
        #region Declare
        IUserService _userService;
        IConfiguration _config;
        #endregion

        #region Constructer
        public UsersController(IUserService userService, IConfiguration config) : base(userService)
        {
            _userService = userService;
            _config = config;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy danh sách nhân viên phân trang, tìm kiếm
        /// </summary>
        [EnableCors("AllowCROSPolicy")]
        [Route("EmployeesFilterPaging")]
        [HttpGet]
        public IActionResult GetEmployeesFilterPaging([FromQuery] string filterValue, [FromQuery] int limit, [FromQuery] int offset)
        {
            return Ok(_userService.GetUsersFilterPaging(filterValue, limit, offset));
        }


        /// <summary>
        /// Test Authorization
        /// </summary>
        [EnableCors("AllowCROSPolicy")]
        [Route("test")]
        [HttpGet]
        public IActionResult TestAuth()
        {
            return Ok(new string[] { "value1", "value2", "value3", "value4", "value5" });
        }

        /// <summary>
        /// Login
        /// </summary>
        [EnableCors("AllowCROSPolicy")]
        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login([FromBody] User userInfo)
        {
            try
            {
                var isLoggedIn = _userService.Login(userInfo);
                if (isLoggedIn == null) return Unauthorized(); 
                return Ok(isLoggedIn);
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
        }
        #endregion
    }
}
