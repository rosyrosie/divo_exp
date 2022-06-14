import { setPresetRange } from "@utils/dateUtil";
import { Button } from "antd";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { SetStateAction } from "react";

const PresetRange = ({ disableDay, setDateRange }: { disableDay: boolean, setDateRange: React.Dispatch<SetStateAction<RangeValue<Moment>>> }) => {
  return (
    <span className="preset_range">
      <Button disabled={disableDay} onClick={() => setPresetRange(30, 'days', setDateRange)} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>30일</Button>
      <Button onClick={() => setPresetRange(13, 'weeks', setDateRange)} style={{ borderRadius: 0 }}>13주</Button>
      <Button onClick={() => setPresetRange(26, 'weeks', setDateRange)} style={{ borderRadius: 0 }}>26주</Button>
      <Button onClick={() => setPresetRange(52, 'weeks', setDateRange)} style={{ borderRadius: 0 }}>52주</Button>
      <Button onClick={() => setPresetRange(24, 'months', setDateRange)} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>24개월</Button>
    </span>
  );
}

export default PresetRange;