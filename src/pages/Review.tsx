import { REVIEW_URL } from "@api";
import useAxios from "@useAxios";
import useStore from "@useStore";
import { Card, Pagination, Spin } from "antd";
import { useState } from "react";

const Review = ({ type }: { type: string }) => {
  const { corpId } = useStore();
  const [ page, setPage ] = useState(1);
  const [ blogReviews, loading, error ] = useAxios(
    REVIEW_URL(corpId, page, type),
    null,
    'GET',
    [page, type]
  );

  console.log(type);

  return (
    <div className="content">
      <div className="header">
      </div>
      <div className="reviews">
        {loading ? <div className="spin"><Spin /></div> : blogReviews.data.map((review: any) => (
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
