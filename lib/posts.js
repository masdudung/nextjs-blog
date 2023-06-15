import axios from 'axios';

// get data from external
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error.response.status);
    }
}

// get only 5 data
export async function getBlogsFromExternal(url) {
    let blogPosts = await fetchData(url)
    let parsedBlogPost = []

    blogPosts = blogPosts.blogs ?? [];
    if (blogPosts.length > 0) {
        parsedBlogPost = blogPosts.map((post) => {
            return {
                id: post.id,
                title: post.title,
                date: post.created_at
            }
        })

        return parsedBlogPost
    }
}

export async function getAllPostIds() {
    // default tutorial
    const fileNames = fs.readdirSync(postsDirectory);

    // i fetch from post
    let blogPosts = await fetchData('https://api.slingacademy.com/v1/sample-data/blog-posts')
    let parsedBlogPost = []

    blogPosts = blogPosts.blogs ?? [];
    if (blogPosts.length > 0) {
        blogPosts.map((post) => {
            parsedBlogPost.push(
                {params: {id: post.id}}
            )
        })
    }    

    return parsedBlogPost.map((fileName) => {
        return {
            params: {
                // id: fileName.replace(/\.md$/, ''),
                id: fileName.toString(),
            },
        };
    });
}

export async function getPostExternalData(id){
    const result = await fetchData(`https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`)
    return result.blog ?? null;
}

