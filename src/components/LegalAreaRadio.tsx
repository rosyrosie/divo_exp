import { GET_REG_URL } from "@api";
import useAxios from "@useAxios";
import { Col, Divider, Radio, Row } from "antd";
import { SetStateAction, useEffect } from "react";

interface LegalAreaRadioProps{
  ctpCode: string | null;
  setCtpCode: React.Dispatch<SetStateAction<string | null>>;
  sigCode: string | null;
  setSigCode: React.Dispatch<SetStateAction<string | null>>;
  emdCode: string | null;
  setEmdCode: React.Dispatch<SetStateAction<string | null>>;
  disabled: boolean;
}

const LegalAreaRadio = ({ ctpCode, setCtpCode, sigCode, setSigCode, emdCode, setEmdCode, disabled }: LegalAreaRadioProps) => {
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

  return (
    <div className="legal_area">
      <Row>
        <Col span={6} style={{ paddingRight: 15 }}>
          <Divider orientation="left">전국</Divider>
          <Radio.Group
            style={{ height: 250 }} 
            options={[defaultOptions]} value={!!ctpCode ? null: '0'}
            onChange={value => value !== null && setCtpCode(null)}
            disabled={disabled} 
          />
        </Col>
        <Col span={6} style={{ paddingRight: 15 }}>
          <Divider orientation="left">시·도</Divider>
          <Radio.Group  
            style={{ height: 250 }} 
            options={ctpList?.subset}
            value={ctpCode} 
            onChange={e => setCtpCode(e.target.value)}
            disabled={disabled}
          />
        </Col>
        <Col span={6} style={{ paddingRight: 15 }}>
          <Divider orientation="left">시·군·구</Divider>
          {ctpCode && 
            <Radio.Group
              style={{ height: 250, overflow: 'auto' }}
              options={sigList?.subset}
              value={sigCode}
              onChange={e => setSigCode(e.target.value)}
              disabled={disabled}
            />
          }
        </Col>
        <Col span={6} style={{ paddingRight: 15 }}>
          <Divider orientation="left">읍·면·동</Divider>
          {sigCode && 
            <Radio.Group
              style={{ height: 250, overflow: 'auto' }}
              options={emdList?.subset}
              value={emdCode}
              onChange={e => setEmdCode(e.target.value)}
              disabled={disabled}
            />
          }
        </Col>
      </Row>
    </div>
  );
}

export default LegalAreaRadio;