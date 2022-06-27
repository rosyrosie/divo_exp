  export const scrollProps = {
    y: document.body.clientHeight - 600
  };

  
  const columnTitle = {
    area: '행정구역',
    category: '업종',
    omrank: '점포',
    keyword: '키워드'
  }

  export const hotTrendColumns = (type: 'area' | 'category' | 'omrank' | 'keyword') => [
    {
      title: '순위',
      dataIndex: 'rank',
      key: 'rank'
    },
    {
      title: '급상승',
      children: [
        {
          title: columnTitle[type],
          dataIndex: 'uname',
          key: 'uname'
        },
        {
          title: '과거',
          dataIndex: 'uPrv',
          key: 'uPrv'
        },
        {
          title: '현재',
          dataIndex: 'uNow',
          key: 'uNow'
        },
        {
          title: '상승률',
          dataIndex: 'ugrowth',
          key: 'ugrowth'
        }
      ]
    },
    {
      title: '급하락',
      children: [
        {
          title: columnTitle[type],
          dataIndex: 'dname',
          key: 'dname'
        },
        {
          title: '과거',
          dataIndex: 'dPrv',
          key: 'dPrv'
        },
        {
          title: '현재',
          dataIndex: 'dNow',
          key: 'dNow'
        },
        {
          title: '하락률',
          dataIndex: 'dgrowth',
          key: 'dgrowth'
        }
      ]
    },
  ];

  export const interestDataColumns = [
    {
      title: '순위',
      dataIndex: 'rank',
      key: 'rank',
      width: 50
    },
    {
      title: '구분',
      dataIndex: 'region',
      key: 'region',
      width: 70
    },
    {
      title: '외식소비의도',
      dataIndex: 'searchQty',
      key: 'searchQty',
      width: 90
    },
    {
      title: '성별 현황',
      children: [
        {
          title: '여성',
          dataIndex: 'female',
          key: 'female'
        },
        {
          title: '남성',
          dataIndex: 'male',
          key: 'male'
        }
      ]
    },
    {
      title: '기기별 현황',
      children: [
        {
          title: '모바일',
          dataIndex: 'mobile',
          key: 'mobile'
        },
        {
          title: 'PC',
          dataIndex: 'pc',
          key: 'pc'
        }
      ]
    },
    {
      title: '연령별 현황',
      children: [
        {
          title: '10대',
          dataIndex: 'ten',
          key: 'ten'
        },
        {
          title: '20대',
          dataIndex: 'twenty',
          key: 'twenty'
        },
        {
          title: '30대',
          dataIndex: 'thirty',
          key: 'thirty'
        },
        {
          title: '40대',
          dataIndex: 'forty',
          key: 'forty'
        },
        {
          title: '50대',
          dataIndex: 'fifty',
          key: 'fifty'
        }
      ]
    },
    {
      title: '요일별 현황',
      children: [
        {
          title: '월',
          dataIndex: 'mon',
          key: 'mon'
        },
        {
          title: '화',
          dataIndex: 'tue',
          key: 'tue'
        },
        {
          title: '수',
          dataIndex: 'wed',
          key: 'wed'
        },
        {
          title: '목',
          dataIndex: 'thur',
          key: 'thur'
        },
        {
          title: '금',
          dataIndex: 'fri',
          key: 'fri'
        },
        {
          title: '토',
          dataIndex: 'sat',
          key: 'sat'
        },
        {
          title: '일',
          dataIndex: 'sun',
          key: 'sun'
        }
      ]
    },
    {
      title: '월별 현황',
      children: [
        {
          title: '1월',
          dataIndex: 'jan',
          key: 'jan'
        },
        {
          title: '2월',
          dataIndex: 'feb',
          key: 'feb'
        },
        {
          title: '3월',
          dataIndex: 'mar',
          key: 'mar'
        },
        {
          title: '4월',
          dataIndex: 'apr',
          key: 'apr'
        },
        {
          title: '5월',
          dataIndex: 'may',
          key: 'may'
        },
        {
          title: '6월',
          dataIndex: 'jun',
          key: 'jun'
        },
        {
          title: '7월',
          dataIndex: 'jul',
          key: 'jul'
        },
        {
          title: '8월',
          dataIndex: 'aug',
          key: 'aug'
        },
        {
          title: '9월',
          dataIndex: 'sep',
          key: 'sep'
        },
        {
          title: '10월',
          dataIndex: 'oct',
          key: 'oct'
        },
        {
          title: '11월',
          dataIndex: 'nov',
          key: 'nov'
        },
        {
          title: '12월',
          dataIndex: 'dec',
          key: 'dec'
        },
      ]
    }
  ];