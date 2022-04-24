export class HearderModel {
  public get create(): Array<any> {
    return [
      {
        path: '/marketplace',
        title: 'Marketplace',
      },
      {
        path: '/marketplace/detail/',
        title: 'Chi tiết module',
        back: true,
        backUrl: '/marketplace'
      },
      {
        path: '/module',
        title: 'Module',
      },
      {
        path: '/module/detail/',
        title: 'Chi tiết module',
        back: true,
        backUrl: '/marketplace'
      },
      {
        path: '/payment',
        title: 'Payment',
      },
      {
        path: '/setting',
        title: 'Cài đặt',
      },
      {
        path: '/user',
        title: 'Thành viên',
      },
      {
        path: '/user/create',
        title: 'Thêm thành viên',
        back: true,
        backUrl: '/user'
      },
      {
        path: '/user/detail/',
        title: 'Thông tin thành viên',
        back: true,
        backUrl: '/user'
      },
      {
        path: '/cart',
        title: 'Giỏ hàng',
      },
      {
        path: '/cart/payment',
        title: 'Thanh toán',
        backIcon: true,
      },
    ];
  }
}
