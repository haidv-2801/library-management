using TOE.TOEIC.ApplicationCoore.Entities;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.ApplicationCore.Interfaces.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public class DepartmentService : BaseService<Department>, IDepartmentService
    {
        #region Declare
        IDepartmentRepository _departmentRepository;
        #endregion

        #region Constructer
        public DepartmentService(IDepartmentRepository departmentRepository):base(departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }
        #endregion

        #region Methods
        #endregion
    }
}
