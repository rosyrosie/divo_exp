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
    getItem('매출액', 'sales_qty'),
    getItem('요일별 매출', 'sales_qty_w'),
    getItem('시간별 매출', 'sales_qty_t'),
    getItem('결제단가', 'price'),
    getItem('요일별 결제단가', 'price_w'),
    getItem('시간별 결제단가', 'price_t'),
    getItem('결제건수', 'cnt'),
    getItem('요일별 결제건수', 'cnt_w'),
    getItem('시간별 결제건수', 'cnt_t'),
    getItem('재방문자 매출액', 'rvst'),
    getItem('재방문자 매출 비율', 'rvstr'),
    getItem('요일별 재방문매출 비율', 'rvstr_w'),
    getItem('시간별 재방문매출 비율', 'rvstr_t'),
  ]),
  getItem('키워드-매출', 'keyword', <ContainerOutlined />, [
    getItem('키워드-매출액', 'kw_sales_qty'),
    getItem('키워드-재방문매출', 'kw_rvst'),
    getItem('키워드-재방문매출비율', 'kw_rvstr'),
    getItem('키워드-결제단가', 'kw_price'),
    getItem('키워드-평일 매출액', 'kw_wd_sales'),
    getItem('키워드-평일 매출비율', 'kw_wd_salesr'),
    getItem('키워드-주말 매출액', 'kw_we_sales'),
    getItem('키워드-주말 매출비율', 'kw_we_salesr'),
    getItem('키워드-점심 매출액', 'kw_lc_sales'),
    getItem('키워드-점심 매출비율', 'kw_lc_salesr'),
    getItem('키워드-저녁 매출액', 'kw_dn_sales'),
    getItem('키워드-저녁 매출 비율', 'kw_dn_salesr'),
  ]),
  getItem('리뷰', 'review', <ContainerOutlined />, [
    getItem('네이버 블로그', 'review_blog'),
    getItem('네이버 플레이스', 'review_place')
  ])
];

export default menus;