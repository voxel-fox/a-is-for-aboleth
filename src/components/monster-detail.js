import * as PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'react-emotion'
import { ReactComponent as SVGDefs } from '../assets/symbols.svg'
import { rem } from '../utils/helpers'

import StatChart from './monster-stat-chart'
import StatList from './monster-stat-list'
import StatBarChart from './monster-stat-barchart'

import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { ReactComponent as ArrowLeft } from '../assets/images/arrow-left.svg'
import MonsterTypeBadge from './monster-type-badge'

const Container = styled.div`
  max-width: 80rem;
  padding: 0 1.25rem;
  margin: 1.25rem auto;
`

const ContentBox = styled.div`
  @media (min-width: ${rem(650)}) {
    display: flex;
  }
`

const rail = css`
  @media (min-width: ${rem(650)}) {
    width: 20rem;
    margin-right: 3rem;
  }
`

const primary = css`
  @media (min-width: ${rem(650)}) {
    width: 100%;
    max-width: calc(100% - 23rem);
  }
`

const backLink = css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${rem(4) + ' ' + rem(6)};
  border-radius: ${rem(12)};
  color: black;
  top: ${rem(10)};
  left: ${rem(10)};
  border: ${rem(2)} solid black;
  background-color: white;
  text-decoration: none;
  z-index: 5;

  &:hover span {
    width: ${rem(40)};
  }
`

const backLinkText = css`
  display: block;
  width: 0;
  height: 1.2em;
  transition: width .2s;
  overflow: hidden;
`

const Mast = styled.header`
  position: relative;
  height: 25rem;
  overflow: hidden;
`

const InfoCardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${rem(16)} 0;
`

const InfoCardLabel = styled.b`
  display: inline-block;
  margin-right: ${rem(10)};

  &::after {
    content:': '
  }
`

const ActionCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const ActionCard = styled.figure`
  display: block;
  width: 100%;
  padding: ${rem(8)};
  margin: ${rem(8)};
  min-height: ${rem(160)};
  background-color: white;
  color: black;

  @media (min-width: ${rem(1050)}) {
    width: calc(50% - ${rem(8 * 2)});
  }
`

const mastImgStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

class MonsterDetail extends React.Component {
  static propTypes = {
    monster: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.string,
      type: PropTypes.string,
      alignment: PropTypes.string,
      hp: PropTypes.number,
      str: PropTypes.number,
      dex: PropTypes.number,
      con: PropTypes.number,
      int: PropTypes.number,
      wis: PropTypes.number,
      cha: PropTypes.number,
      actions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired
      }))
    }).isRequired
  }

  render () {
    const { image } = this.props
    const {
      name, size, type, alignment, hp,
      str, dex, con, int, wis, cha
    } = this.props.monster
    const { monster } = this.props
    const stats = [
      { attr: 'Strength', label: 'STR', value: str },
      { attr: 'Dexterity', label: 'DEX', value: dex },
      { attr: 'Constitution', label: 'CON', value: con },
      { attr: 'Intelligence', label: 'INT', value: int },
      { attr: 'Wisdom', label: 'WIS', value: wis },
      { attr: 'Charisma', label: 'CHA', value: cha }
    ]

    const MonsterImage = () => (
      <div className={css`position:absolute;top:0;left:0;right:0;bottom:0;`}>
        {image && (<Img fluid={{ ...image.fluid }} style={mastImgStyle} />)}
      </div>
    )
    const ActionsList = ({ actions, label }) => (
      <section className={css`margin-bottom:${rem(48)};border-top:1px solid white;padding-top:${rem(16)};`}>
        <h2>{label}: {actions.length}</h2>
        <ActionCardList>
          {actions.map((action, i) => (
            <ActionCard key={i}>
              <h3 className={css`color:black;`}>{action.name}</h3>
              <p>{action.desc}</p>
            </ActionCard>
          ))}
        </ActionCardList>
      </section>
    )

    const MonsterDetails = () => (
      <article>
        <Link className={backLink} to='/'>
          <ArrowLeft />
          <span className={backLinkText}>back</span>
        </Link>

        <Mast className={css`object-fit: cover;`}>
          <MonsterImage />
        </Mast>

        <Container>
          <ContentBox>
            <div className={css`${rail};text-align: center;`}>
              <MonsterTypeBadge
                type={type.toLowerCase()}
                svgAttrs={{
                  width: '160',
                  className: css`display: block; margin: 0 auto;`
                }}
                bgAttrs={{ fill: '#fff' }}
                iconAttrs={{ fill: '#000' }}
              />
            </div>
            <div className={primary}>
              <h1>{name}</h1>
              <div className={css`margin:${rem(15)};padding:${rem(15)};background-color:#222;`}>
                <h2 className={css`font-size:${rem(18)};`}><em>{alignment}</em>, <em>{type}</em></h2>
                <p className={css`line-height:1.8;`}>One day hastily scrawled field notes, and tomes filled with tales may be written about this creature.<br />But for now&hellip; here is all we know.</p>
              </div>
            </div>
          </ContentBox>
          <ContentBox>
            <aside className={rail}>
              <InfoCardList>
                <li>
                  <InfoCardLabel>Creature Type</InfoCardLabel>
                  <span>{type}</span>
                </li>
                <li>
                  <InfoCardLabel>Health</InfoCardLabel>
                  <span>{hp}</span>
                </li>
                <li>
                  <InfoCardLabel>Size Category</InfoCardLabel>
                  <span>{size}</span>
                </li>
              </InfoCardList>
              <section>
                <h2 className={css`text-align: center;`}>Ability Scores</h2>
                <div>
                  <StatChart data={stats} />
                  <StatList data={stats} />
                  <StatBarChart data={stats} />
                </div>
              </section>
            </aside>
            <div className={primary}>
              {monster.actions && (
                <ActionsList actions={monster.actions} label={'Actions'} />
              )}
              {monster.legendary_actions && (
                <ActionsList actions={monster.legendary_actions} label={'Legendary Actions'} />
              )}
              {monster.special_abilities && (
                <ActionsList actions={monster.special_abilities} label={'Special Abilities'} />
              )}
            </div>
          </ContentBox>
        </Container>
        <SVGDefs className={css`display:none;`} />
      </article>
    )

    return (
      <MonsterDetails />
    )
  }
}

export default MonsterDetail

export const MonsterDetailFragment = graphql`
  fragment MonsterMast_img on ImageSharp {
    fluid: fluid(
      maxWidth: 1600
      maxHeight: 400
      quality: 80
    ) {
      ...GatsbyImageSharpFluid_withWebp
    }
  }
  fragment MonsterFields on MonstersSrd5EJson {
    name
    size
    type
    subtype
    alignment
    hit_dice
    speed
    special_abilities {
      name
      desc
    }
    actions {
      name
      desc
    }
    legendary_actions {
      name
      desc
    }
    ac: armor_class
    hp: hit_points
    cr: challenge_rating
    int: intelligence
    str: strength
    cha: charisma
    con: constitution
    wis: wisdom
    dex: dexterity
  }
`
