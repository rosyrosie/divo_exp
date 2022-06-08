import { REVIEW_URL } from "@api";
import useAxios from "@useAxios";
import { reviewType } from "@utils/reviewUtil";
import { Card, Pagination, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Review = ({ type }: { type: string }) => {
  const { corpId } = useParams();
  const [ page, setPage ] = useState(1);
  const [ blogReviews, loading, error ] = useAxios(
    REVIEW_URL(corpId || '0', page, type),
    null,
    'GET',
    [page, type]
  );

  return (
    <div className="content">
      <div className="header">
      </div>
      <div className="reviews">
        {loading ? <div className="spin"><Spin /></div> : blogReviews.data.map((review: reviewType) => (
          <Card
            title={<a href={review.url} target="_blank">{review.title}</a>}
            extra={review.date}
            style={{
              width: '60%',
              margin: '10px auto'
            }}
          >
            {review.content}
          </Card>
        ))}
      </div>
      <Pagination current={page} pageSize={6} total={blogReviews ? 6*blogReviews.maxPage : 30} onChange={(page) => setPage(page)} showSizeChanger={false} />
    </div>
  );
}

export default Review;
