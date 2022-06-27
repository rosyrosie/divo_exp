import { GET_REG_URL } from "@api";
import useAxios from "@useAxios";
import { Col, Divider, Radio, Row } from "antd";
import { useEffect, useMemo, useState } from "react";

const LegalAreaRadio = () => {
  const [ ctpCode, setCtpCode ] = useState<string | null>(null);
  const [ sigCode, setSigCode ] = useState<string | null>(null);
  const [ emdCode, setEmdCode ] = useState<string | null>(null);

  const defaultOptions = {
    label: '전국',
    value: '0',
  };

  const [ ctpList, ctpLoading, ctpError ] = useAxios(
    GET_REG_URL + '0',
    null,
    'GET'
  );

  const [ sigList, sigLoading, sigError ] = useAxios(
    GET_REG_URL + ctpCode,
    null,
    'GET',
    [ctpCode],
    !!ctpCode
  );

  const [ emdList, emdLoading, emdError ] = useAxios(
    GET_REG_URL + sigCode,
    null,
    'GET',
    [sigCode],
    !!sigCode
  );

  useEffect(() => {
    setSigCode(null);
  }, [ctpCode]);

  useEffect(() => {
    setEmdCode(null);
  }, [sigCode]);

  const regionCode = useMemo(() => {
    if(emdCode) return emdCode;
    if(sigCode) return sigCode;
    if(ctpCode) return ctpCode;
    return '0';
  }, [ctpCode, sigCode, emdCode]);

  return (
    <div className="legal_area">
      <Row>
        <Col span={6} style={{ paddingRight: 15 }}>
          <Divider orientation="left">전국</Divider>
          <Radio.Group 
            options={[defaultOptions]} value={!!ctpCode ? null: '0'}
            onChange={value => value !== null && setCtpCode(null)} 
          />
        </Col>
        <Col span={6} style={{ paddingRight: 15 }}>
          <Divider orientation="left">시·도</Divider>
          <Radio.Group  
            options={ctpList?.subset}
            value={ctpCode} 
            onChange={e => setCtpCode(e.target.value)}
          />
        </Col>
        <Col span={6} style={{ paddingRight: 15 }}>
          <Divider orientation="left">시·군·구</Divider>
          {ctpCode && 
            <Radio.Group
              style={{ maxHeight: 250, overflow: 'auto' }}
              options={sigList?.subset}
              value={sigCode}
              onChange={e => setSigCode(e.target.value)}
            />
          }
        </Col>
        <Col span={6} style={{ paddingRight: 15 }}>
          <Divider orientation="left">읍·면·동</Divider>
          {sigCode && 
            <Radio.Group
              style={{ maxHeight: 250, overflow: 'auto' }}
              options={emdList?.subset}
              value={emdCode}
              onChange={e => setEmdCode(e.target.value)}
            />
          }
        </Col>
      </Row>
    </div>
  );
}

export default LegalAreaRadio;