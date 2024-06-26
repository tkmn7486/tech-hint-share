import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card";
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

type Page = {
    type?: "Game" | "Movie" | "Tech" | "Book" | undefined
}

type Post = {
    _id:string,
    title:string,
    category:string,
    // tags:string[],
    content:string,
    created_at:string | Date,
    like:string,
}

export const ArticleList=(props:Page)=>{
    // const location = useLocation();
    // const params = location.pathname;
    // const navigate = useNavigate();

    // if(params == "/" || params == "/articles"){
    //     navigate("/articles/all")
    // }

    const { type } = props;
    const effectiveType = type === undefined ? "ALL" : type

    const [isLoading, setIsLoading] = useState(true)
    const [Posts, setPosts] = useState([])

    useEffect(()=>{
        setIsLoading(true)
        const getPosts=async()=>{
            const data = await axios.get('https://cms-api.nilto.com/v1/contents?model=posts', { headers: { 'X-NILTO-API-KEY': import.meta.env.VITE_API_KEY}})
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
                <Label className={style["page-label"]}>{effectiveType.toUpperCase()}</Label>
                {Posts.length === 0 ? <p className={style["no-article-text"]}>記事がありません</p> : (
                    <div className={style["card-box"]}>
                        {Posts.map((post:Post) =>(
                            <Link to={`/articles/${effectiveType.toLowerCase()}/${post._id}`} key={post._id}>
                                <Card className={style.card}>
                                    <div className={style["badge-list"]}>
                                        <Badge className={style.badge}>{post.category}</Badge>
                                        {/* {post.tags.map((tag:any, index:number)=>
                                            <Badge key={index} className={style.badge}>{tag}</Badge>
                                        )} */}
                                    </div>
                                    <Label className={style.title}><p className={style["title-text"]}>{post.title}</p></Label>
                                    <br />
                                    <div className={style["created-at"]}>
                                        <Label>{dayjs.utc(post.created_at).tz('Asia/Tokyo').format('YYYY-MM-DD')}</Label>
                                    </div>
                                </Card>
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