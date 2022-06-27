import { ID_QUERY_URL } from "@api";
import useAxios from "@useAxios";
import { Input, List, Tag } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

const KeywordTags = ({ tagList, setTagList }: { tagList: string[], setTagList: Dispatch<SetStateAction<string[]>>}) => {
  const { Search } = Input;
  const [ query, setQuery ] = useState('');

  const [ queryResult, qLoading, qError ] = useAxios(
    ID_QUERY_URL(query),
    null,
    'GET',
    [query],
    query !== ''
  );

  return (
    <div className="keyword_tags">
      <Search
        placeholder="상권키워드 입력"
        style={{
          width: 480
        }}
        onSearch={value => setQuery(value)}
      />
      <List 
        style={{
          width: 480,
          height: 300,
          overflow: 'auto'
        }}
        size="small"
        bordered
        dataSource={queryResult?.keyword?.result}
        renderItem={(item: any) => (
          <List.Item
            style={{
              fontSize: 13,
              cursor: 'pointer'
            }}
            onClick={() => !tagList.includes(item.name) && setTagList(t => [...t, item.name])}
          >
            {item.name}
          </List.Item>
        )}
      />
      <div className="tags">
        {tagList?.map(tag => 
          <Tag 
            closable 
            key={tag}
            onClose={() => setTagList(t => t.filter(item => item !== tag))}
            style={{
              fontSize: 14,
              padding: '4px 8px'
            }}
          >
            {tag}
          </Tag>
        )}
      </div>
    </div>
  );
}

export default KeywordTags;