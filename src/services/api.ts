const BASE_URL = "https://test.divo.kr/";

export const LOGIN_URL = BASE_URL + 'auth/login/';

export const BM_CORPLIST_URL = BASE_URL + 'auth/user/corporation/bookmark';
export const CORPLIST_URL = BASE_URL + 'auth/user/corporation';
export const CORPINFO_URL = BASE_URL + 'corporation/?corp_id=';
export const BM_TOGGLE_URL = BASE_URL + 'auth/user/bookmark/toggle?corpId=';

export const CHECK_USER_URL = BASE_URL + 'model/userSetting/check';

export const REVIEW_URL = (corpId: string, page: number, type: string) => BASE_URL + `corpreview/reviewList?corpId=${corpId}&src=${type}&display=6&page=${page}`;

export const KWLIST_URL = BASE_URL + 'corpsales/salesKeywordList';
export const KWSALES_CHART_URL = BASE_URL + 'corpsales/salesKeywordGraph';

export const KW_ANLY_SUMM_URL = (corpId: string, startDate: string | undefined, endDate: string | undefined) => BASE_URL + `corpkeywordcomp/keySummary?corpId=${corpId}&startDate=${startDate}&endDate=${endDate}`;
export const KW_SELECT_URL = BASE_URL + 'corpkeywordcomp/keywordList?corpId=';
export const KW_CHECKLIST_URL = BASE_URL + 'corpkeywordcomp/keyCompList';
export const KW_CMP_CHART_URL = BASE_URL + 'corpkeywordcomp/keyCompGraph';

export const SALES_URL = BASE_URL + 'corpsales/salesTrend';
export const SALES_BAR_URL = BASE_URL + 'corpsales/salesTrendBar';
export const SALES_TABLE_URL = BASE_URL + 'corpsales/salesTrendTable';

export const KW_TREND_URL = BASE_URL + 'corpkeywordtrend/trend';
export const KW_TREND_BAR_URL = BASE_URL + 'corpkeywordtrend/trendBar';
export const KW_QTY_SALES_URL = BASE_URL + 'corpkeywordtrend/keySalesCorr';
export const KW_TABLE_URL = BASE_URL + 'corpkeywordtrend/trendTable';

export const VP_RANK_URL = BASE_URL + 'rank/rank?id=';
export const VP_CHART_URL = BASE_URL + 'rank/graph';

export const KW_SCORE_URL = (corpId: string) => BASE_URL + 'placekeyword/list?id=' + corpId + '&amount=true';

export const SA_RADAR_URL = (corpId: string) => BASE_URL + `corporation/sales/${corpId}/summary`;
export const SA_DRADAR_URL = (corpId: string, nowStartDate: string | undefined, nowEndDate: string | undefined, prevStartDate: string | undefined, prevEndDate: string | undefined) => BASE_URL + `corporation/sales/${corpId}/summary/detail?nowStartDate=${nowStartDate}&nowEndDate=${nowEndDate}&prevStartDate=${prevStartDate}&prevEndDate=${prevEndDate}`;
export const SA_COMPARE_URL = (corpId: string, scale: string) => BASE_URL + `corporation/sales/${corpId}/analysis?scale=${scale}`;

export const GET_REG_URL = BASE_URL + 'map/bound/region/subset/rename?id=';

export const HT_URL = (scale: string, type: string, start: number, display: number, regionCode: string) => BASE_URL + `map/bound/system/trend?scale=${scale}&type=${type}&start=${start}&display=${display}&regionCode=${regionCode}`;

export const ID_URL = BASE_URL + 'map/bound/region?area=0';
export const ID_QUERY_URL = (query: string) => BASE_URL + `map/bound/search?query=${query}&rf=0`;
export const ID_MODAL_URL = BASE_URL + 'map/bound/system/section/rank/region?area=';
export const ID_MODAL_QTY_URL = BASE_URL + 'map/bound/system/amount?area=';

export const AD_TREE_URL = BASE_URL + 'corpkeywordcomp/keyToKeys/list';
export const AD_CHART_URL = BASE_URL + 'corpkeywordcomp/keyToKeys/graph';
export const AD_DB_URL = BASE_URL + 'keyword/radar?keyword=';

export const CK_URL = BASE_URL + 'corpkeywordcomp/every/keyword';