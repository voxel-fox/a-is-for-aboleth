import StatChart from "./monster-stat-list";

describe("<StatChart />", () => {
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
    }
  ];

  it("renders correctly", () => {
    const wrapper = shallow(<StatChart data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
