import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import Card from '../components/card/card'

import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Card className={utilStyles.headingMd}>
      
        <p>I'm a full time dad of 3 beautiful girls. I've got a super hot partner. I'm a music nut and I'm a total kook when it comes to surfing, but I'm still trying... so there's that. </p><p>As far as making money goes, I'm a dev by day and a designer by night.</p>
        <p>
          <h3>Here are my links</h3>
          <ul className={utilStyles.list}>
            <li className={utilStyles.listItem}><a href="https://wundermanthompson.com" target="_blank">Wunderman Thompson</a> - My full-time design gig I freakin' love ♥️</li>
            <li className={utilStyles.listItem}><a href="https://travis.work" target="_blank">Travis.work</a> - A little site for me to sell my art prints I publish on Friyays</li>
            <li className={utilStyles.listItem}><a href="https://queso.com.au" target="_blank">Queso</a> - My startup side hustle I run with with my mate Ben</li>
            <li className={utilStyles.listItem}><a href="https://linkedin.com/in/travisweerts/" target="_blank">LinkedIn</a> - Where I hang out professionally</li>
            <li className={utilStyles.listItem}><a href="https://instagram.com/travvvw/" target="_blank">Instagram</a> - My personal instagram</li>
          </ul>
        </p>
        </Card>

      <Card className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>And here's some other words I wrote...</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </Card>


    </Layout>
  )
}