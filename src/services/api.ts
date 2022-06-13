import { Key } from "react";

const BASE_URL = "https://test.divo.kr/";

export const LOGIN_URL = BASE_URL + 'auth/login/';

export const CORPLIST_URL = BASE_URL + 'auth/user/corporation';
export const CORPINFO_URL = BASE_URL + 'corporation/?corp_id=';

export const REVIEW_URL = (corpId: string, page: number, type: string) => BASE_URL + `corpreview/reviewList?corpId=${corpId}&src=${type}&display=6&page=${page}`;

export const KWLIST_URL = BASE_URL + 'corpsales/salesKeywordList';
export const KWSALES_CHART_URL = BASE_URL + 'corpsales/salesKeywordGraph';

export const KW_ANLY_SUMM_URL = (corpId: string, opt: string, date: string) => BASE_URL + `corpkeywordcomp/keySummary?corpId=${corpId}&opt=${opt}&date=${date}`;
export const KW_SELECT_URL = BASE_URL + 'corpkeywordcomp/keywordList?corpId=';
export const KW_CHECKLIST_URL = BASE_URL + 'corpkeywordcomp/keyCompList';
export const KW_CMP_CHART_URL = BASE_URL + 'corpkeywordcomp/keyCompGraph';

export const SALES_URL = BASE_URL + 'corpsales/salesTrend';
export const SALES_BAR_URL = BASE_URL + 'corpsales/salesTrendBar';

export const KW_TREND_URL = BASE_URL + 'corpkeywordtrend/trend';
export const KW_TREND_BAR_URL = BASE_URL + 'corpkeywordtrend/trendBar';
export const KW_QTY_SALES_URL = BASE_URL + 'corpkeywordtrend/keySalesCorr';

export const VP_RANK_URL = BASE_URL + 'rank/rank?id=';
export const VP_CHART_URL = (id: string, keyword: string) => BASE_URL + `rank/graph?id=${id}&keyword=${keyword}&cat=view`;