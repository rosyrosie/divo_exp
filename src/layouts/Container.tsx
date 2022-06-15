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
  type menuRoute = {
    [x in menuType]?: JSX.Element;
  };
  const getComponent: Record<menuType, JSX.Element> = Object.assign(
    salesMenu.reduce((obj, key) => ({...obj, [key]: <Sales />}), {}) as Record<typeof salesMenu[number], JSX.Element>,
    kwMenu.reduce((obj, key) => ({...obj, [key]: <Keyword />}), {}) as Record<typeof kwMenu[number], JSX.Element>,
    kwSalesMenu.reduce((obj, key) => ({...obj, [key]: <KeywordSalesCorr />}), {}) as Record<typeof kwSalesMenu[number], JSX.Element>,
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

  return getComponent[dataId as menuType];
};

export default Container;