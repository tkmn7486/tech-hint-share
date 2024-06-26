import parse from 'html-react-parser';
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card";
import { MdAddLink } from "react-icons/md";
import { useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { Loading } from "@/pages/misc/loading";
import style from "./style.module.scss"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import axios from 'axios';

dayjs.extend(utc);
dayjs.extend(timezone);

type Post = {
    _id:string,
    category:string,
    content:string,
    created_at:string | Date,
    updated_at:string | Date,
    like:string,
    url_list:[]
}

export const PostsList=()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [Posts, setPosts] = useState([])

    useEffect(()=>{
        setIsLoading(true)
        const getPosts=async()=>{
            const data = await axios.get('https://cms-api.nilto.com/v1/contents?model=post', { headers: { 'X-NILTO-API-KEY': import.meta.env.VITE_API_KEY}})
            console.log("data:",data.data.data)
            setPosts(data.data.data)
            setIsLoading(false)
        }

        getPosts()
    },[])

    return (
        <div>
            {isLoading ?
                <Loading /> :
            <>
                {Posts.length === 0 ? <p className={style["no-article-text"]}>記事がありません</p> : (
                    <div className={style["card-box"]}>
                        {Posts.map((post:Post) =>(
                            <Link to={`/posts/${post._id}`} key={post._id}>
                                <div className={style["post-card"]}>
                                    <div className={style["created-at"]}>
                                        <Label>{dayjs.utc(post.created_at).tz('Asia/Tokyo').format('YYYY-MM-DD')}</Label>
                                    </div>
                                    <div className={style["main-content"]}>
                                        {parse(post.content)}
                                    </div>
                                    <div className={style["bottom-list"]}>
                                        <div className={style["link-amount"]}>
                                            <MdAddLink className={style["link-icon"]}/>
                                            <label>{post.url_list.length}</label>
                                        </div>
                                        <div className={style["category-hash"]}>
                                            <p className={style.category}>{`#${post.category}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>   
                            )
                        )}
                    </div>
                )}
            </>
            }
        </div>
    )
}