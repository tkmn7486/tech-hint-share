import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card";
import { useEffect, useState  } from "react";
import {client} from "@/lib/client"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "@/pages/misc/loading";
import style from "./style.module.scss"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

type Page = {
    type?: "Game" | "Movie" | "Tech" | "Book" | undefined
}

export const ArticleList=(props:Page)=>{
    const location = useLocation();
    const params = location.pathname;
    const navigate = useNavigate();

    if(params == "/" || params == "/articles"){
        navigate("/articles/all")
    }

    const { type } = props;
    const effectiveType = type === undefined ? "ALL" : type

    const [isLoading, setIsLoading] = useState(true)
    const [articles, setArticles] = useState([])

    useEffect(()=>{
        if(effectiveType === "ALL"){
            const getData=async()=>{
                setIsLoading(true)
                await client.get({
                    endpoint: 'blogs',
                    queries: {
                        limit: 20
                    }
                })
                .then((res) => {
                    console.log(res.contents)
                    setArticles(res.contents)
                    setIsLoading(false)
                });
            }
            getData()
        }else{
            const getCategoryFilteredData=async()=>{
                setIsLoading(true)
                await client.get({
                    endpoint: 'blogs',
                    queries: {
                        filters:`category[contains]${effectiveType}`,
                        limit: 20
                    }
                })
                .then((res) => {
                    console.log(res.contents)
                    setArticles(res.contents)
                    setIsLoading(false)
                });
            }
            getCategoryFilteredData()
        }
    },[type])
    return (
        <div>
            {isLoading ?
                <Loading /> :
            <>
                <Label className={style["page-label"]}>{effectiveType.toUpperCase()}</Label>
                {articles.length === 0 ? <p className={style["no-article-text"]}>記事がありません</p> : (
                    <div className={style["card-box"]}>
                        {articles.map((article:any)=>
                            <Link to={`/articles/${effectiveType.toLowerCase()}/${article.id}`} key={article.id}>
                                <Card className={style.card}>
                                    <div className={style["badge-list"]}>
                                        <Badge className={style.badge}>{article.category}</Badge>
                                        {article.tags.map((tag:any, index:number)=>
                                            <Badge key={index} className={style.badge}>{tag}</Badge>
                                        )}
                                    </div>
                                    <Label className={style.title}><p className={style["title-text"]}>{article.title}</p></Label>
                                    <br />
                                    <div className={style["created-at"]}>
                                        <Label>{dayjs.utc(article.createdAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</Label>
                                    </div>
                                </Card>
                            </Link>   
                        )}
                    </div>
                )}
            </>
            }
        </div>
    )
}