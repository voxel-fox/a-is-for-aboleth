import * as PropTypes from "prop-types";
import React from "react";
import memoize from "memoize-one";

import styled from "@emotion/styled";
import { css, keyframes, jsx } from "@emotion/core";
import { rem } from "../utils/helpers";
import { zoomInUp } from "react-animations";
import InfiniteScroll from "react-infinite-scroller";
import SearchInput, { createFilter } from "react-search-input";

import FilterMonsterByCR from "./filter-monster-by-cr";
import FilterMonsterBySize from "./filter-monster-by-size";
import FilterMonsterByType from "./filter-monster-by-type";
import { CardSVGdefs } from "./monster-card-svg";
import MonsterCard from "./monster-card-template";
import texture from "../assets/images/dark-card-bg.jpg";

const cardAnimation = keyframes`${zoomInUp}`;

const container = css`
  max-width: 100rem;
  margin: 1.25rem auto;
`;

const boxShadow = css`
  box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(2)} rgba(237, 237, 237, 0.5);
`;

const FiltersToggleDynamic = props => css`
  ${!props.open && boxShadow};
  height: ${!props.open ? rem(52) : rem(32)};
  width: ${!props.open ? rem(52) : rem(32)};
`;

const FiltersToggle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  ${FiltersToggleDynamic}
  padding: 0;
  background: black;
  border-radius: 100%;
  border: 0;
  color: white;
  -webkit-appearance: none;
`;

const FiltersBoxDynamic = props => css`
  ${props.open && boxShadow};
  background-color: ${props.open ? "black" : "transparent"};
  height: ${props.open ? "auto" : "52px"};
  width: ${props.open ? "100%" : "52px"};
`;

const FiltersBox = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
  ${FiltersBoxDynamic}
`;

const FiltersList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: ${rem(1300)};
  margin: 0 auto;
  padding: ${rem(20)};

  @media (min-width: ${rem(650)}) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 ${rem(20)};
  }
`;

const Grid = styled.div`
  ${container}
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const GridItem = css`
  margin: ${rem(6)};
  max-width: 14.5rem;

  @media (min-width: ${rem(358)}) {
    margin: ${rem(12)};
  }
`;

const animate = css`
  animation: 0.5s ${cardAnimation};
`;

class CardGrid extends React.Component {
  static propTypes = {
    perPage: PropTypes.number,
    cards: PropTypes.array
  };

  static defaultProps = {
    perPage: 12,
    sizeFilters: [],
    typeFilters: [],
    nameFilter: "",
    crRange: {
      min: 0,
      max: 30
    },
    cards: []
  };

  state = {
    showFilters: true,
    cardLimit: this.props.perPage,
    sizeFilters: this.props.sizeFilters,
    typeFilters: this.props.typeFilters,
    nameFilter: this.props.nameFilter,
    crRange: this.props.crRange
  };

  filterByAttr = memoize((card, filters, attr) => {
    const allowed = filters.map(v => v.toLowerCase());
    return allowed.length < 1 || (card[attr] && allowed.includes(card[attr].toLowerCase()));
  });

  filterByCR = memoize((card, crRange) => {
    return card.fields.crValue >= crRange.min && card.fields.crValue <= crRange.max;
  });

  filterCards = memoize((cards, sizeFilters, typeFilters, crRange, nameFilter) => {
    return cards
      .filter(createFilter(nameFilter, ["name"]))
      .filter(card => this.filterByAttr(card, sizeFilters, "size"))
      .filter(card => this.filterByAttr(card, typeFilters, "type"))
      .filter(card => this.filterByCR(card, crRange));
  });

  toggleFilter(...args) {
    const [{ name, active }, filterType] = args;
    const currentFilters = this.state[filterType] || [];
    let newFilters = currentFilters;

    // Add filter to list
    if (active && currentFilters.indexOf(name) === -1) {
      newFilters = [...currentFilters, name];
    }

    // Remove filter from list
    if (!active && currentFilters.indexOf(name) !== -1) {
      newFilters = currentFilters.filter(a => name !== a);
    }

    if (newFilters !== currentFilters) {
      this.setState({ [filterType]: newFilters });
    }
  }

  render() {
    const { cards, perPage } = this.props;
    const { sizeFilters, typeFilters, crRange, cardLimit, nameFilter, showFilters } = this.state;
    const deck = this.filterCards(cards, sizeFilters, typeFilters, crRange, nameFilter);

    return (
      <div
        css={css`
          overflow: hidden;
          min-height: 100vh;
          background: url(${texture});
        `}
        id={"monster-card-grid"}
        aria-live="polite"
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={page => {
            this.setState({
              cardLimit: this.state.cardLimit + this.props.perPage * page
            });
          }}
          hasMore={deck.length > cardLimit}
          loader={<div key={0}>Loading &hellip;</div>}
        >
          <Grid
            css={css`
              margin-bottom: ${rem(250)};
            `}
          >
            {deck.slice(0, cardLimit).map((card, i) => (
              <MonsterCard key={`monster-${card.fields.slug}`} cssStyles={[GridItem, i > perPage && animate]} monster={card} />
            ))}
          </Grid>
        </InfiniteScroll>

        <FiltersBox open={showFilters}>
          <FiltersToggle
            open={showFilters}
            onClick={() => {
              this.setState({
                showFilters: !showFilters
              });
            }}
          >
            <span
              css={css`
                opacity: 0;
                position: absolute;
              `}
            >
              {!showFilters ? "Open" : "Close"} Filters
            </span>
            {showFilters && (
              <svg width={20} height={20} fill="#fff">
                <use xlinkHref="#close" />
              </svg>
            )}
            {!showFilters && (
              <svg width={25} height={19} fill="#fff">
                <use xlinkHref="#filters" />
              </svg>
            )}
          </FiltersToggle>
          <div
            css={css`
              ${container};
              margin: 0 auto;
            `}
          >
            <FiltersList>
              <label
                htmlFor="filter-by-name"
                css={css`
                  position: absolute;
                  opacity: 0;
                  z-index: -10;
                `}
              >
                Enter a monters name to filter cards
              </label>
              <SearchInput
                css={css`
                  max-width: calc(100vw - 3rem);

                  input {
                    background: transparent;
                    color: white;
                    border: 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
                    border-radius: 0;
                    width: ${rem(340)};
                    max-width: 100%;
                    padding: 0 ${rem(10)};
                    margin-bottom: ${rem(20)};
                    -webkit-appearance: none;
                  }
                `}
                placeholder={"Filter By Name"}
                id={"filter-by-name"}
                aria-controls={"monster-card-grid"}
                onChange={nameFilter => {
                  this.setState({
                    nameFilter: nameFilter
                  });
                }}
              />
              <FilterMonsterByCR
                onValueChange={range => {
                  this.setState({
                    crRange: range
                  });
                }}
              />
              <FilterMonsterBySize active={sizeFilters || []} onHandleToggle={(...args) => this.toggleFilter(...args, "sizeFilters")} />
            </FiltersList>
          </div>
          <FilterMonsterByType active={typeFilters || []} onHandleToggle={(...args) => this.toggleFilter(...args, "typeFilters")} />
        </FiltersBox>
        <CardSVGdefs />
      </div>
    );
  }
}

export default CardGrid;
