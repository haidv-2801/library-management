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
using Newtonsoft.Json;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller book order
    /// </summary>
    [ApiController]
    public class BookOrderController : BaseEntityController<BookOrder>
    {
        #region Declare
        IBookOrderService _bookOrderService;
        ILogger<BookOrder> _logger;
        #endregion

        #region Constructer
        public BookOrderController(IBookOrderService bookOrderService, ILogger<BookOrder> logger) : base(bookOrderService, logger)
        {
            _bookOrderService = bookOrderService;
            _logger = logger;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Thêm một thực thể mới
        /// </summary>
        /// <param name="bookOrder"></param>
        /// <returns>Sô bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: DVHAI 07/07/2021
        [EnableCors("AllowCROSPolicy")]
        [HttpPost("Insert")]
        public async Task<IActionResult> Post([FromBody] BookOrder bookOrder)
        {
            var serviceResult = new ServiceResult();
            try
            {
                _logger.LogInformation($"Thêm bản ghi {typeof(BookOrder).Name}: " + JsonConvert.SerializeObject(bookOrder));
                serviceResult = await _bookOrderService.InsertBookOrder(bookOrder);
                if (serviceResult.TOECode == TOECode.InValid || serviceResult.TOECode == TOECode.InValid)
                    return BadRequest(serviceResult);
                else if (serviceResult.TOECode == TOECode.Exception || serviceResult.TOECode == TOECode.Fail)
                    return StatusCode(500, serviceResult);

                return StatusCode(201, serviceResult);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Lỗi Insert {typeof(BookOrder).Name}: " + ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        #endregion
    }
}
