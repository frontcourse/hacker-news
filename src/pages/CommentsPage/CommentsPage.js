import {Link, useParams} from 'react-router-dom'
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {get} from "../../api/api";
import {useCallback, useEffect, useState} from "react";
import {CommentsWrapper} from "../../components/Comments/CommentsWrapper";
import styles from './CommentsPage.module.css'

export function CommentsPage() {
    const {id} = useParams()
    const [news, setNews] = useState()
    const [comments, setComments] = useState([])

    const getNewsComment = useCallback(async (commentIds) => {
        return await Promise
            .all(commentIds.map(async commentId => {
                const comment = await get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
                if (comment?.kids) {
                    comment.kids = await getNewsComment(comment.kids)
                }

                return comment
            }))
    }, [])

    const getNewsData = useCallback(async () => {
        const newsData = await get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        setNews(newsData)
        if (newsData?.kids) {
            const commentsData = await getNewsComment(newsData.kids)

            setComments(commentsData)
        }
    }, [id, getNewsComment])



    useEffect(() => {
        getNewsData()
    }, [getNewsData])

    return (
        <div>
            <Link className={styles.link} to='/'>Назад</Link>

            {news && (
                <NewsItem
                    className={styles.news}
                    title={news.title}
                    username={news.by}
                    date={news.time}
                    url={news.url}
                />
            )}

            {comments && (
                <CommentsWrapper comments={comments}/>
            )}
        </div>
    )
}