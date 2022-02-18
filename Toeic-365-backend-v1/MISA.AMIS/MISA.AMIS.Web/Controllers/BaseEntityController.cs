using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.Entities;
using TOE.TOEIC.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace TOE.TOEIC.Web.Controllers
{
    /// <summary>
    /// Controller base
    /// </summary>
    [Route("/api/[controller]")]
    [ApiController]
    public class BaseEntityController<TEntity> : ControllerBase
    {
        #region Declare
        IBaseService<TEntity> _baseService;
        #endregion

        public BaseEntityController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }

        /// <summary>
        /// Lấy danh sách thực thể
        /// </summary>
        /// <returns>Danh sách thực thể</returns>
        /// CreatedBy: DVHAI 07/07/2021
        [EnableCors("AllowCROSPolicy")]
        [HttpGet]
        public IActionResult Get()
        {
            var entities = _baseService.GetEntities();

            return Ok(entities);
        }

        /// <summary>
        /// Lấy thực thể theo id
        /// </summary>
        /// <param name="id">id của thực thể</param>
        /// <returns>Một thực thể tìm được theo id</returns>
        /// CreatedBy: DVHAI 07/07/2021
        [EnableCors("AllowCROSPolicy")]
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var entity = _baseService.GetEntityById(Guid.Parse(id));

            if (entity == null)
                return NotFound();

            return Ok(entity);
        }

        /// <summary>
        /// Thêm một thực thể mới
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Sô bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: DVHAI 07/07/2021
        [EnableCors("AllowCROSPolicy")]
        [HttpPost]
        public IActionResult Post([FromBody] TEntity entity)
        {
            var serviceResult = _baseService.Insert(entity);

            if (serviceResult.TOECode == TOECode.InValid)
                return BadRequest(serviceResult);
            else if (serviceResult.TOECode == TOECode.Exception)
                return StatusCode(500, serviceResult);

            return StatusCode(201, serviceResult);
        }

        /// <summary>
        /// Sửa một thực thể
        /// </summary>
        /// <param name="id">id của bản ghi</param>
        /// <param name="entity">thông tin của bản ghi</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: DVHAI 07/07/2021
        [EnableCors("AllowCROSPolicy")]
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] string id, [FromBody] TEntity entity)
        {
            //Sử lí kiểu id động ở đây
            var serviceResult = _baseService.Update(Guid.Parse(id), entity);

            if (serviceResult.TOECode == TOECode.InValid)
                return BadRequest(serviceResult);
            else if (serviceResult.TOECode == TOECode.Exception)
                return StatusCode(500, serviceResult);

            return Ok(serviceResult);
        }

        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="id">id của bản ghi</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: DVHAI 07/07/2021
        [EnableCors("AllowCROSPolicy")]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var serviceResult = _baseService.Delete(Guid.Parse(id));
            if (serviceResult.TOECode == TOECode.Success)
                return Ok(serviceResult);
            else
                return NoContent();
        }
    }
}
