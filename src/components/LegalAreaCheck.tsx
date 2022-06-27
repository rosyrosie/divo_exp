import { GET_REG_URL } from "@api";
import useAxios from "@useAxios";
import { Checkbox, Col, Divider, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type codeListType = {
  ctp: string[],
  sig: string[],
  emd: string[]
};

type areaType = {
  label: string,
  value: string
};

const LegalAreaCheck = ({ codeList, setCodeList }: { codeList: codeListType, setCodeList: Dispatch<SetStateAction<codeListType>>}) => {
  const defaultOptions = {
    label: '전국',
    value: '0',
  };

  const [ sigCode, setSigCode ] = useState<string | null>(null);
  const [ ctpCode, setCtpCode ] = useState<string | null>(null);

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
    if(codeList.ctp.length === 1){
      setCtpCode(codeList.ctp[0]);
      setSigCode(null);
    }
    else{
      if(ctpCode) setCtpCode(null);
      if(sigCode) setSigCode(null);
    }
    if(codeList.sig.length === 1) setSigCode(codeList.sig[0]);
    else if(sigCode) setSigCode(null);
  }, [codeList]);

  useEffect(() => {
    if(!ctpCode){
      setCodeList(c => ({...c, sig: [], emd: []}));
    }
    if(!sigCode){
      setCodeList(c => ({...c, emd: []}));
    }
  }, [ctpCode, sigCode]);

  const onCheckAllChange = (e: CheckboxChangeEvent, type: 'ctp' | 'sig' | 'emd') => {
    const areaList = type === 'ctp' ? ctpList?.subset : type === 'sig' ? sigList?.subset : emdList?.subset;
    setCodeList(c => ({...c, [type]: e.target.checked ? areaList.map((area: areaType) => area.value) : []}));
  };

  return (
    <div className="legal_area">
      <Row>
        <Col span={6}>
          <Divider orientation="left">전국</Divider>
          <Checkbox.Group 
            options={[defaultOptions]} value={codeList.ctp.length ? [] : ['0']}
            onChange={checkedValues => checkedValues.length > 0 && setCodeList(c => ({...c, ctp: []}))} 
          />
        </Col>
        <Col span={6}>
          <Divider orientation="left">시·도</Divider>
          <Checkbox
            onChange={e => onCheckAllChange(e, 'ctp')}
            checked={codeList.ctp.length === ctpList?.subset?.length}
            indeterminate={!!codeList.ctp.length && codeList.ctp.length < ctpList?.subset?.length}
          >
            전체 선택
          </Checkbox>
          <Divider />
          <Checkbox.Group 
            style={{ height: 250 }} 
            options={ctpList?.subset}
            value={codeList.ctp} 
            onChange={checkedValues => setCodeList(c => ({...c, ctp: checkedValues as string[]}))}
          />
        </Col>
        <Col span={6}>
          <Divider orientation="left">시·군·구</Divider>
          {ctpCode && 
            <>
              <Checkbox
                onChange={e => onCheckAllChange(e, 'sig')}
                checked={codeList.sig.length === sigList?.subset?.length}
                indeterminate={!!codeList.sig.length && codeList.sig.length < sigList.subset.length}
              >
                전체 선택
              </Checkbox>
              <Divider />
              <Checkbox.Group
                style={{ height: 250, overflow: 'auto' }}
                options={sigList?.subset}
                value={codeList.sig}
                onChange={checkedValues => setCodeList(c => ({...c, sig: checkedValues as string[]}))}
              />
            </>
          }
        </Col>
        <Col span={6}>
          <Divider orientation="left">읍·면·동</Divider>
          {sigCode && 
            <>
              <Checkbox
                onChange={e => onCheckAllChange(e, 'emd')}
                checked={codeList.emd.length === emdList?.subset?.length}
                indeterminate={!!codeList.emd.length && codeList.emd.length < emdList?.subset?.length}
              >
                전체 선택
              </Checkbox>
              <Divider />
              <Checkbox.Group
                style={{ height: 250, overflow: 'auto' }}
                options={emdList?.subset}
                value={codeList.emd}
                onChange={checkedValues => setCodeList(c => ({...c, emd: checkedValues as string[]}))}
              />
            </>
          }
        </Col>
      </Row>
    </div>
  );
}

export default LegalAreaCheck;