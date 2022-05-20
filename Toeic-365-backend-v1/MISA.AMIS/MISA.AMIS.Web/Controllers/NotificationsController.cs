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
    public class NotificationsController : BaseEntityController<Notification>
    {
        #region Declare
        IBaseService<Notification> _notificationService;
        #endregion

        #region Constructer
        public NotificationsController(IBaseService<Notification> notificationService, ILogger<Notification> logger) : base(notificationService, logger)
        {
            _notificationService = notificationService;
        }
        #endregion

        #region Methods
        #endregion
    }
}
