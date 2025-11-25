/** @format */

import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

import SvgMountain from '@site/static/img/undraw_docusaurus_mountain.svg'
import SvgTree from '@site/static/img/undraw_docusaurus_tree.svg'
import SvgReact from '@site/static/img/undraw_docusaurus_react.svg'

const FeatureList = [
  {
    title: 'Interactive Setup',
    Svg: SvgMountain,
    description: (
      <>
        Our CLI wizard guides you through an interactive setup process, making project
        initialization a breeze.
      </>
    ),
  },
  {
    title: 'Template Variety',
    Svg: SvgTree,
    description: (
      <>
        Choose from a wide variety of templates for different types of projects, including React,
        Vue, Node.js, and more.
      </>
    ),
  },
  {
    title: 'Customizable',
    Svg: SvgReact,
    description: (
      <>
        Easily customize your project with additional dependencies and optional features like Git
        repository initialization.
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
