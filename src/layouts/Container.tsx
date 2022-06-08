import KeywordSalesCorr from "@pages/KeywordSalesCorr";
import Review from "@pages/Review";
import SalesQty from "@pages/SalesQty";
import { kwSalesMenu } from "@routes/menuconfig";
import { contains } from "@utils/typeUtil";
import { useParams } from "react-router-dom";

const Container = () => {
  const { dataId } = useParams();
  const getComponent: Record<string, JSX.Element> = {
    'review-blog': <Review type="blog" />,
    'review-place': <Review type="place" />,
    'sales-qty': <SalesQty />,
  };

  if(contains(kwSalesMenu, dataId)){
    kwSalesMenu.forEach(menu => {
      getComponent[menu] = <KeywordSalesCorr opt={dataId} />
    });
  }

  return getComponent[dataId || 'sales-qty'];
};

export default Container;