import { ContainerOutlined } from "@ant-design/icons";

const getItem = (label: any, key: any, icon: any = null, children: any = null, type: any = null) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

export const rootSubmenuKeys = ['sales', 'keyword', 'review'];

const menus = [
  getItem('매출 분석', 'sales', <ContainerOutlined />, [
    getItem('매출액', 'sales-qty'),
    getItem('요일별 매출', 'sales-qty-w'),
    getItem('시간별 매출', 'sales-qty-t'),
    getItem('결제단가', 'price'),
    getItem('요일별 결제단가', 'price-w'),
    getItem('시간별 결제단가', 'price-t'),
    getItem('결제건수', 'cnt'),
    getItem('요일별 결제건수', 'cnt-w'),
    getItem('시간별 결제건수', 'cnt-t'),
    getItem('재방문자 매출액', 'rvst'),
    getItem('재방문자 매출 비율', 'rvstr'),
    getItem('요일별 재방문매출 비율', 'rvstr-w'),
    getItem('시간별 재방문매출 비율', 'rvstr-t'),
  ]),
  getItem('키워드-매출', 'keyword', <ContainerOutlined />, [
    getItem('키워드-매출액', 'kw-sales-qty'),
    getItem('키워드-재방문매출', 'kw-rvst'),
    getItem('키워드-재방문매출비율', 'kw-rvstr'),
    getItem('키워드-결제단가', 'kw-price'),
    getItem('키워드-평일 매출액', 'kw-wd-sales'),
    getItem('키워드-평일 매출비율', 'kw-wd-salesr'),
    getItem('키워드-주말 매출액', 'kw-we-sales'),
    getItem('키워드-주말 매출비율', 'kw-we-salesr'),
    getItem('키워드-점심 매출액', 'kw-lc-sales'),
    getItem('키워드-점심 매출비율', 'kw-lc-salesr'),
    getItem('키워드-저녁 매출액', 'kw-dn-sales'),
    getItem('키워드-저녁 매출 비율', 'kw-dn-salesr'),
  ]),
  getItem('리뷰', 'review', <ContainerOutlined />, [
    getItem('네이버 블로그', 'review-blog'),
    getItem('네이버 플레이스', 'review-place')
  ])
];

export default menus;