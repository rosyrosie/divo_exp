import { REVIEW_URL } from "@api";
import useAxios from "@useAxios";
import { reviewType } from "@utils/reviewUtil";
import { Card, Empty, message, Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if(error) message.warning('error', 1.5);
  }, [error]);

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
            key={review.id}
          >
            {review.content}
          </Card>
        ))}
        {blogReviews?.data?.length === 0 && 
          <div className="spin">
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="리뷰가 없습니다" 
            />
          </div>
        }
      </div>
      <Pagination current={page} pageSize={6} total={blogReviews ? 6*blogReviews.maxPage : 30} onChange={(page) => setPage(page)} showSizeChanger={false} />
    </div>
  );
}

export default Review;
