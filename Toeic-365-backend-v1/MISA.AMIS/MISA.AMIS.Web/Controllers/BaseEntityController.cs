﻿using Microsoft.AspNetCore.Cors;
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
using Microsoft.AspNetCore.Authorization;
using System.Net.NetworkInformation;
using TOE.TOEIC.ApplicationCore.Helpers;
using TOE.TOEIC.ApplicationCore.MiddleWare;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

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
        private readonly ILogger<TEntity> _logger;
        #endregion

        public BaseEntityController(IBaseService<TEntity> baseService, ILogger<TEntity> logger)
        {
            _baseService = baseService;
            _logger = logger;
        }

        /// <summary>
        /// Lấy danh sách thực thể
        /// </summary>
        /// <returns>Danh sách thực thể</returns>
        /// CreatedBy: DVHAI 07/07/2021
        [EnableCors("AllowCROSPolicy")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var entities = await _baseService.GetEntities();

            return Ok(entities);
        }

        [HttpPost]
        [Route("Filter")]
        [EnableCors("AllowCROSPolicy")]
        public virtual async Task<IActionResult> GetFilter(PagingRequest pagingRequest)
        {
            var serviceResult = new ServiceResult();
            try
            {
                _logger.LogInformation($"Filter {typeof(TEntity).Name} info : " + JsonConvert.SerializeObject(pagingRequest));
                var entity = await _baseService.GetEntitiesFilter(pagingRequest);

                if (entity == null)
                    return NotFound();

                return Ok(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError("Lỗi GetFilter: " + ex.Message);
                serviceResult.Data = null;
                serviceResult.Messasge = ex.Message;
                serviceResult.TOECode = TOECode.Fail;
            }

            if (serviceResult.TOECode == TOECode.Fail) { return BadRequest(serviceResult); }

            return Ok(serviceResult);
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
        public async Task<IActionResult> Post([FromBody] TEntity entity)
        {
            var serviceResult = new ServiceResult();
            try
            {
                _logger.LogInformation($"Thêm bản ghi {typeof(TEntity).Name}: " + JsonConvert.SerializeObject(entity));
                serviceResult = await _baseService.Insert(entity);
                if (serviceResult.TOECode == TOECode.InValid)
                    return BadRequest(serviceResult);
                else if (serviceResult.TOECode == TOECode.Exception || serviceResult.TOECode == TOECode.Fail)
                    return StatusCode(500, serviceResult);

                return StatusCode(201, serviceResult);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Lỗi Insert {typeof(TEntity).Name}: " + ex.Message);
                return StatusCode(500, ex.Message);
            }

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
            try
            {
                _logger.LogInformation($"Body put {typeof(TEntity).Name}:" + JsonConvert.SerializeObject(entity));
                //Sử lí kiểu id động ở đây
                var serviceResult = _baseService.Update(Guid.Parse(id), entity);
                _logger.LogInformation($"ServiceResult Body put {typeof(TEntity).Name}:" + JsonConvert.SerializeObject(serviceResult));

                if (serviceResult.TOECode == TOECode.InValid)
                    return BadRequest(serviceResult);
                else if (serviceResult.TOECode == TOECode.Exception)
                    return StatusCode(500, serviceResult);

                return Ok(serviceResult);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error put {typeof(TEntity).Name}:" + ex.Message);
                return BadRequest(ex.Message);
            }

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
