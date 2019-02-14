import {
  BarLabel,
  StatGrade,
  getModifers,
  default as StatBarChart
} from "./monster-stat-barchart";

describe("getModifers", () => {
  const stats = [
    {
      name: "Str",
      value: 10
    },
    {
      name: "Dex",
      value: 15
    },
    {
      name: "Int",
      value: 7
    }
  ];
  const expected = [
    {
      name: "Str",
      value: 10,
      mod: 0
    },
    {
      name: "Dex",
      value: 15,
      mod: 2.5
    },
    {
      name: "Int",
      value: 7,
      mod: -1.5
    }
  ];

  it("calculates modifiers correctly", () => {
    const modList = getModifers(stats);
    expect(modList).toEqual(expected);
  });
});

describe("<BarLabel />", () => {
  const mockProps = {
    x: 1,
    y: 1,
    width: 10
  };

  it("renders correctly when 0 or more", () => {
    const wrapper = shallow(<BarLabel value={8} {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when negative", () => {
    const wrapper = shallow(<BarLabel value={-8} {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<StatGrade />", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<StatGrade label="epic" viewBox={{ y: 20 }} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("<StatBarChart />", () => {
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
    const wrapper = shallow(<StatBarChart data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
