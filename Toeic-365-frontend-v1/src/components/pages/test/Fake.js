export const FAKE_MENU_ITEM = [
  {
    label: 'File',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Bookmark',
            icon: 'pi pi-fw pi-bookmark',
          },
          {
            label: 'Video',
            icon: 'pi pi-fw pi-video',
          },
        ],
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
      },
      {
        separator: true,
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-external-link',
        url: '/abc',
      },
    ],
  },
  {
    label: 'Edit',
    icon: 'pi pi-fw pi-pencil',
    items: [
      {
        label: 'Left',
        icon: 'pi pi-fw pi-align-left',
      },
      {
        label: 'Right',
        icon: 'pi pi-fw pi-align-right',
      },
      {
        label: 'Center',
        icon: 'pi pi-fw pi-align-center',
      },
      {
        label: 'Justify',
        icon: 'pi pi-fw pi-align-justify',
      },
    ],
  },
  {
    label: 'Users',
    icon: 'pi pi-fw pi-user',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-user-plus',
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-user-minus',
      },
      {
        label: 'Search',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Filter',
            icon: 'pi pi-fw pi-filter',
            items: [
              {
                label: 'Print',
                icon: 'pi pi-fw pi-print',
              },
            ],
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'List',
          },
        ],
      },
    ],
  },
  {
    label: 'Events',
    icon: 'pi pi-fw pi-calendar',
    items: [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Save',
            icon: 'pi pi-fw pi-calendar-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-calendar-minus',
          },
        ],
      },
      {
        label: 'Archieve',
        icon: 'pi pi-fw pi-calendar-times',
        items: [
          {
            label: 'Remove',
            icon: 'pi pi-fw pi-calendar-minus',
          },
        ],
      },
    ],
  },
  {
    label: 'Quit',
    icon: 'pi pi-fw pi-power-off',
  },
];

export const FAKE_DATA_MENU = [
  {
    menuID: '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2',
    title: 'Dịch vụ - tiện ích',
    slug: 'dich-vu-tien-ich',
    parentID: '00000000-0000-0000-0000-000000000000',
    isShowHome: true,
    link: null,
    displayOrder: 0,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:51:24',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:51:24',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '1e329a21-6c8d-42a8-8470-a28a3404bd38',
    title: 'Tài liệu in',
    slug: 'tai-lieu-in',
    parentID: '6e541382-8dd7-4027-8e23-31f1c91b348b',
    isShowHome: true,
    link: null,
    displayOrder: 0,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:50:45',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:50:45',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '28969464-eacf-4db1-b46c-9126237ccb00',
    title: 'Tra cứu',
    slug: 'tra-cuu',
    parentID: '00000000-0000-0000-0000-000000000000',
    isShowHome: true,
    link: null,
    displayOrder: 4,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-06T00:03:50',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-06T00:03:50',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '2aa7838c-8ee6-474b-9ec4-36cd99527d2b',
    title: 'Hướng dẫn sử dụng',
    slug: 'huong-dan-su-dung',
    parentID: 'd9346658-6b37-471f-8772-31a4ec523f17',
    isShowHome: true,
    link: null,
    displayOrder: 2,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:46:37',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:46:37',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '34426e66-99cc-409f-ab2f-da49e23002b7',
    title: 'Học liệu mở',
    slug: 'hoc-lieu-mo',
    parentID: '6e541382-8dd7-4027-8e23-31f1c91b348b',
    isShowHome: true,
    link: null,
    displayOrder: 2,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:51:06',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:51:06',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '34aed81d-0aa0-48df-b6b8-8829c7430a7d',
    title: 'Tổng quan về thư viện',
    slug: 'tong-quan-ve-thu-vien',
    parentID: 'd9346658-6b37-471f-8772-31a4ec523f17',
    isShowHome: true,
    link: null,
    displayOrder: 0,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:43:52',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:43:52',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '56feeccd-db4e-449e-94a4-75359904ccca',
    title: 'Các dịch vụ khác',
    slug: 'cac-dich-vu-khac',
    parentID: '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2',
    isShowHome: true,
    link: null,
    displayOrder: 3,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-06T00:01:27',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-06T00:01:27',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '6e541382-8dd7-4027-8e23-31f1c91b348b',
    title: 'Tài nguyên - bộ sưu tập',
    slug: 'tai-nguyen-bo-suu-tap',
    parentID: '00000000-0000-0000-0000-000000000000',
    isShowHome: true,
    link: null,
    displayOrder: 0,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:47:45',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:47:45',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '88961a2d-7d75-49fe-8713-ababd8097f2e',
    title: 'Tài liệu số',
    slug: 'tai-lieu-so',
    parentID: '6e541382-8dd7-4027-8e23-31f1c91b348b',
    isShowHome: true,
    link: null,
    displayOrder: 1,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:50:56',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:50:56',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '913cadf0-020f-4f7e-a5f1-0b4d526c048c',
    title: 'Hỗ trợ học tập, giảng dạy và nghiên cứu',
    slug: 'ho-tro-hoc-tap-giang-day-va-nghien-cuu',
    parentID: '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2',
    isShowHome: true,
    link: null,
    displayOrder: 2,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:57:12',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:57:12',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '9d33e2a0-139f-484b-9407-3a0ad6d58eab',
    title: 'Nội quy thư viện',
    slug: 'noi-quy-thu-vien',
    parentID: 'd9346658-6b37-471f-8772-31a4ec523f17',
    isShowHome: true,
    link: null,
    displayOrder: 1,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:45:19',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:45:19',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: '9f313d22-a85f-4307-bb05-b70d25669b02',
    title: 'Trang chủ',
    slug: '/trang-chu',
    parentID: '00000000-0000-0000-0000-000000000000',
    isShowHome: true,
    link: null,
    displayOrder: 0,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:37:09',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:37:09',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: 'd18fd493-c8f4-478a-8531-11e674a148f2',
    title: 'Cung cấp không gian tiện ích',
    slug: 'cung-cap-khong-gian-tien-ich',
    parentID: '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2',
    isShowHome: true,
    link: null,
    displayOrder: 1,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:53:09',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:53:09',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: 'd9346658-6b37-471f-8772-31a4ec523f17',
    title: 'Gới thiệu',
    slug: 'goi-thieu',
    parentID: '00000000-0000-0000-0000-000000000000',
    isShowHome: true,
    link: null,
    displayOrder: 1,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:37:32',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:37:32',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: 'df867bd4-8f77-4418-afa3-5b49bd4270a5',
    title: 'Giới thiệu sách mới',
    slug: 'gioi-thieu-sach-moi',
    parentID: 'd9346658-6b37-471f-8772-31a4ec523f17',
    isShowHome: true,
    link: null,
    displayOrder: 3,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:46:54',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:46:54',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
  {
    menuID: 'ecda97dd-6da9-4eb4-bf32-937d85a351b4',
    title: 'Mượn trả tài liệu',
    slug: 'muon-tra-tai-lieu',
    parentID: '0c45f4f6-c85f-419f-a7b7-32c84d34cfc2',
    isShowHome: true,
    link: null,
    displayOrder: 0,
    type: 0,
    entityState: 0,
    createdDate: '2022-04-05T23:52:56',
    createdBy: 'DOVANHAI',
    modifiedDate: '2022-04-05T23:52:56',
    modifiedBy: 'DOVANHAI',
    status: true,
    isDeleted: false,
  },
];
