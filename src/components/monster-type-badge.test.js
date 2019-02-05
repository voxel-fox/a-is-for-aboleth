import MonsterTypeBadge from "./monster-type-badge";

describe("<MonsterTypeBadge />", () => {
  const svgAttrs = { svgAttr: "svgProp", svgAttr2: "svgProp2" };
  const bgAttrs = { bgAttrs: "bgProp", bgAttrs2: "bgProp2" };
  const iconAttrs = { iconAttrs: "iconProp", iconAttrs2: "iconProp2" };
  const type = "monster-type";
  const mockProps = { svgAttrs, bgAttrs, iconAttrs, type };

  it("renders correctly", () => {
    const wrapper = shallow(<MonsterTypeBadge {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
