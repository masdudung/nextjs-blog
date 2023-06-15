import Layout from '../../components/layout';
import { getPostExternalData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getServerSideProps(context) {
    // Add the "await" keyword like this:
    const { params } = context;
    const postData = await getPostExternalData(params.id);
    console.log('getServerSideProps', postData?.title)

    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    if (!postData) {
        return true;
    }
    
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date ?? postData.created_at} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml ?? postData.content_html }} />
            </article>
        </Layout>
    );
}