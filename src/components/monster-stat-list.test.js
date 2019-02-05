import { StatRow, MonsterStatList } from "./monster-stat-list";

describe("<StatRow />", () => {
  const stat = {
    attr: "Strength",
    label: "STR",
    value: 11
  };

  it("renders correctly", () => {
    const wrapper = shallow(<StatRow stat={stat} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<MonsterStatList />", () => {
  const data = [
    {
      attr: "Strength",
      label: "STR",
      value: 11
    },
    {
      attr: "Dexterity",
      label: "DEX",
      value: 13
    },
    {
      attr: "Wisdom",
      label: "WIS",
      value: 8
    }
  ];

  it("renders correctly", () => {
    const wrapper = shallow(<MonsterStatList data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
