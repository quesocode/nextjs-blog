import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import Card from '../components/card/card'
import Instagram from "instagram-web-api"
import InstagramFeed from "../components/instagramFeed/instagramFeed"

import { getSortedPostsData } from '../lib/posts'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  const client = new Instagram({
    username: process.env.IG_USERNAME,
    password: process.env.IG_PASSWORD,
  })

  console.log(process.env.IG_USERNAME)

  let posts = []
  try {
    // attempt to log in to Instagram
    await client.login()

    const profile = await client.getProfile()

    const instagram = await client.getPhotosByUsername({
      username: process.env.IG_USERNAME,
    })


    if (instagram["user"]["edge_owner_to_timeline_media"]["count"] > 0) {
      // if we receive timeline data back
      //  update the posts to be equal
      // to the edges that were returned from the instagram API response
      posts = instagram["user"]["edge_owner_to_timeline_media"]["edges"]
    }


  } catch (err) {
    // throw an error if login to Instagram fails
    console.log("Something went wrong while logging into Instagram", err)
  }

  const rprops = {}
  rprops.allPostsData = allPostsData
  rprops.instagramPosts = posts

  return {
    props: rprops
  }
}


export default function Home({ allPostsData, instagramPosts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Card className={utilStyles.headingMd}>
      
        <p>As far as life goes, I'm just a normal guy living in Perth, Western Australia with my 3 beautiful girls, who I made with my super hot partner in crime. We done good, trust me. ;)</p><p>Other than that, I'm a music nut, art-a-holic and during the summer, I'm a total kook on the surf, but I'm determined to learn... </p><p>As far as work goes, I'm a dev by day and a designer by night.</p><p>That's pretty much me.</p> <br /><br />
        <p>
          <h2 className={utilStyles.headingLg}>If you want to learn more...</h2>
          <ul className={utilStyles.list}>
            <li className={utilStyles.listItem}><a href="https://wundermanthompson.com" target="_blank">Wunderman Thompson</a> - My full-time design gig I freakin' love ♥️</li>
            <li className={utilStyles.listItem}><a href="https://travis.work" target="_blank">Travis.work</a> - A little site for me to sell my art prints I publish on Friyays</li>
            <li className={utilStyles.listItem}><a href="https://queso.com.au" target="_blank">Queso</a> - My startup side hustle I run with with my mate Ben</li>
            <li className={utilStyles.listItem}><a href="https://linkedin.com/in/travisweerts/" target="_blank">LinkedIn</a> - Where I hang out professionally</li>
            <li className={utilStyles.listItem}><a href="https://instagram.com/travvvw/" target="_blank">Instagram</a> - My personal instagram</li>
            <li className={utilStyles.listItem}><a href="https://www.behance.net/travis-weerts" target="_blank">Behance</a> - Pretty much the same as my insta, but with less baby photos</li>
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


      <Card>
        <h2 className={utilStyles.headingLg}>Instagram <a href="https://instagram.com/travvvw/" target="_blank">@travvw</a></h2>
        <br /><br />
        <InstagramFeed instagramPosts={instagramPosts} />


      </Card>

      <Card>
          <h2 className={utilStyles.headingLg}>Listen Up</h2>
          <p>Corny... I know. But for old times sake, I thought I'd just chuck a music player on my site. Why not?</p><p>Enjoy.</p><br /><br />
          <div>
            <iframe src="https://open.spotify.com/embed/playlist/7LnR8wFIn0viq1lkgSnFtp?theme=0" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>

      </Card>

    </Layout>
  )
}