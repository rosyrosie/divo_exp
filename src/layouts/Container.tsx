import KeywordCompare from "@pages/KeywordCompare";
import KeywordSalesCorr from "@pages/KeywordSalesCorr";
import KeywordSummary from "@pages/KeywordSummary";
import Review from "@pages/Review";
import SalesQty from "@pages/SalesQty";
import { kwSalesMenu, reviewMenu, salesMenu } from "@routes/menuconfig";
import { useParams } from "react-router-dom";

const Container = () => {
  const { dataId } = useParams();
  type menuType = typeof salesMenu[number] | typeof kwSalesMenu[number] | typeof reviewMenu[number];
  const getComponent: Record<string, JSX.Element> = Object.assign(
    salesMenu.map((key: menuType) => ({ [key]: <SalesQty /> })).reduce((p, n) => ({...p, ...n}), {}),
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