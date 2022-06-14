import Keyword from "@pages/Keyword";
import KeywordCompare from "@pages/KeywordCompare";
import KeywordSalesCorr from "@pages/KeywordSalesCorr";
import KeywordScore from "@pages/KeywordScore";
import KeywordSummary from "@pages/KeywordSummary";
import Review from "@pages/Review";
import Sales from "@pages/Sales";
import SalesCompare from "@pages/SalesCompare";
import SalesRadar from "@pages/SalesRadar";
import ViewPlaceRank from "@pages/ViewPlaceRank";
import { kwMenu, kwSalesMenu, kwScoreMenu, reviewMenu, salesMenu, saMenu, vpRankMenu } from "@routes/menuconfig";
import { useParams } from "react-router-dom";

const Container = () => {
  const { dataId } = useParams();
  type menuType = typeof salesMenu[number] | typeof kwSalesMenu[number] | typeof reviewMenu[number] | typeof kwMenu[number] | typeof vpRankMenu | typeof kwScoreMenu | typeof saMenu[number];
  const getComponent: Record<string, JSX.Element> = Object.assign(
    salesMenu.map((key: menuType) => ({ [key]: <Sales /> })).reduce((p, n) => ({...p, ...n}), {}),
    kwMenu.map((key: menuType) => ({ [key]: <Keyword /> })).reduce((p, n) => ({...p, ...n}), {}),
    kwSalesMenu.map((key: menuType) => ({ [key]: <KeywordSalesCorr /> })).reduce((p, n) => ({...p, ...n}), {}),
    {
      'review-blog': <Review type="blog" />,
      'review-place': <Review type="place" />,
      'kw-summary': <KeywordSummary />,
      'kw-compare': <KeywordCompare />,
      'vp-rank': <ViewPlaceRank />,
      'kw-score': <KeywordScore />,
      'sa-radar': <SalesRadar />,
      'sa-compare': <SalesCompare />
    },
  );

  return getComponent[dataId || 'sales-qty'];
};

export default Container;