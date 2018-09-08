import * as PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'react-emotion'
import { rem } from '../utils/helpers'

import texture from '../assets/images/dark-card-bg.jpg'
import StatChart from './monster-stat-chart'
import StatList from './monster-stat-list'
import StatBarChart from './monster-stat-barchart'

import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Container = styled.div`
  max-width: 80rem;
  padding: 0 1.25rem;
  margin: 1.25rem auto;
`

const Mast = styled.div`
  position: relative;
  height: 25rem;
  background: url(${texture});
  overflow: hidden;
`

const InfoCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
`

const InfoCardLabel = styled.b`
  display: inline-block;
  margin-right: ${rem(10)};

  &::after {
    content:': '
  }
`

const ActionCard = styled.figure`
  display: block;
  border: 1px solid transparent;
  break-inside: avoid;
  padding: ${rem(8)};
  margin:0 0 ${rem(16)};
  background-color: white;
  color: black;
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
      name, size, type, alignment, hp, actions,
      legendary_actions, special_abilities,
      str, dex, con, int, wis, cha
    } = this.props.monster
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

    const InfoCard = () => (
      <InfoCardList>
        <li>
          <InfoCardLabel>Size</InfoCardLabel>
          <span>{size}</span>
        </li>
        <li>
          <InfoCardLabel>Type</InfoCardLabel>
          <span>{type}</span>
        </li>
        <li>
          <InfoCardLabel>Alignment</InfoCardLabel>
          <span>{alignment}</span>
        </li>
        <li>
          <InfoCardLabel>HP</InfoCardLabel>
          <span>{hp}</span>
        </li>
      </InfoCardList>
    )

    const MonsterDetails = () => (
      <div>
        <Link className={css`color: white;`} to='/'>&larr; back to compendium</Link>

        <Mast className={css`object-fit: cover;`}>
          <MonsterImage />
        </Mast>

        <Container>
          <h1 className={css`margin-left:23rem;`}>{name}</h1>
          <div className={css`display:flex;`}>
            <section className={css`width:20rem;margin-right:3rem;`}>
              <h2 className={css`text-align: center;`}>Ability Scores</h2>
              <div>
                <StatChart data={stats} />
                <StatList data={stats} />
                <StatBarChart data={stats} />
              </div>
            </section>
            <div>
              <InfoCard />
              <section className={css`margin-top:${rem(48)};border-top:1px solid white;padding-top:${rem(16)};`}>
                <h2>Actions</h2>
                <div className={css`column-count:3;column-gap:${rem(16)};`}>
                  {actions.map((action) => (
                    <ActionCard>
                      <h3 className={css`color:black;`}>{action.name}</h3>
                      <p>{action.desc}</p>
                    </ActionCard>
                  ))}
                </div>
              </section>
              <section className={css`margin-top:${rem(48)};border-top:1px solid white;padding-top:${rem(16)};`}>
                <h2>Legendary Actions</h2>
                <div className={css`column-count:3;column-gap:${rem(16)};`}>
                  {legendary_actions.map((action) => (
                    <ActionCard>
                      <h3 className={css`color:black;`}>{action.name}</h3>
                      <p>{action.desc}</p>
                    </ActionCard>
                  ))}
                </div>
              </section>
              <section className={css`margin-top:${rem(48)};border-top:1px solid white;padding-top:${rem(16)};`}>
                <h2>Special Abilities</h2>
                <div className={css`column-count:3;column-gap:${rem(16)};`}>
                  {special_abilities.map((action) => (
                    <ActionCard>
                      <h3 className={css`color:black;`}>{action.name}</h3>
                      <p>{action.desc}</p>
                    </ActionCard>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </div>
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
