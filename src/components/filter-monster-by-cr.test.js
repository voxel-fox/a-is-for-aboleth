import {
  getCRValue,
  FilterMonsterByCR,
  toolTipFormat
} from "./filter-monster-by-cr";
import { act } from "react-dom/test-utils";

import { Range } from "rc-slider";

describe("getCRValue", () => {
  it("calculates CRs correctly", () => {
    expect(getCRValue(0)).toEqual(0);
    expect(getCRValue(1)).toEqual(0.125);
    expect(getCRValue(2)).toEqual(0.25);
    expect(getCRValue(3)).toEqual(0.5);
    expect(getCRValue(4)).toEqual(1);
    expect(getCRValue(33)).toEqual(30);
  });
});

describe("toolTipFormat", () => {
  it("formats tooltip values correctly", () => {
    expect(toolTipFormat(0)).toEqual("0");
    expect(toolTipFormat(1)).toEqual("1/8");
    expect(toolTipFormat(2)).toEqual("1/4");
    expect(toolTipFormat(3)).toEqual("1/2");
    expect(toolTipFormat(4)).toEqual("1");
    expect(toolTipFormat(33)).toEqual("30");
  });
});

describe("<FilterMonsterByCR />", () => {
  it("renders correctly", () => {
    const wrapper = mount(<FilterMonsterByCR />);
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onValueChange", () => {
    const onValueChange = sinon.spy();
    const wrapper = mount(<FilterMonsterByCR onValueChange={onValueChange} />);
    const onChange = wrapper.find(Range).prop("onChange");
    act(() => {
      onChange([1, 33]);
    });
    expect(
      onValueChange.calledOnceWith({
        min: 0.125,
        max: 30
      })
    ).toBe(true);
  });
});
