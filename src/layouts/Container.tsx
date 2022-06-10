import Keyword from "@pages/Keyword";
import KeywordCompare from "@pages/KeywordCompare";
import KeywordSalesCorr from "@pages/KeywordSalesCorr";
import KeywordSummary from "@pages/KeywordSummary";
import Review from "@pages/Review";
import Sales from "@pages/Sales";
import { kwMenu, kwSalesMenu, reviewMenu, salesMenu } from "@routes/menuconfig";
import { useParams } from "react-router-dom";

const Container = () => {
  const { dataId } = useParams();
  type menuType = typeof salesMenu[number] | typeof kwSalesMenu[number] | typeof reviewMenu[number] | typeof kwMenu[number];
  const getComponent: Record<string, JSX.Element> = Object.assign(
    salesMenu.map((key: menuType) => ({ [key]: <Sales /> })).reduce((p, n) => ({...p, ...n}), {}),
    kwMenu.map((key: menuType) => ({ [key]: <Keyword /> })).reduce((p, n) => ({...p, ...n}), {}),
    kwSalesMenu.map((key: menuType) => ({ [key]: <KeywordSalesCorr /> })).reduce((p, n) => ({...p, ...n}), {}),
    {
      'review-blog': <Review type="blog" />,
      'review-place': <Review type="place" />,
      'kw-summary': <KeywordSummary />,
      'kw-compare': <KeywordCompare />
    },
  );

  return getComponent[dataId || 'sales-qty'];
};

export default Container;