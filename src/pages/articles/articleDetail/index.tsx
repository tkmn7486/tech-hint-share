import parse from 'html-react-parser';
import { Loading } from "@/pages/misc/loading"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {client} from "@/lib/client"
import { Badge } from "@/components/ui/badge"

import style from "./style.module.scss"
import { Button } from '@/components/ui/button';

type Article = {
    id:string,
    title:string,
    category:[string],
    tags:[string],
    content:string,
    createdAt:string,
    updatedAt:string,
    eyecatch?:{url:string, width:number, height:number} | undefined,
    url_type?: string | undefined,
    url?: string | undefined
}

export const ArticleDetail=()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState<Article>(
        {
            id:"",
            title:"",
            category:[""],
            tags:[""],
            content:"",
            createdAt:"",
            updatedAt:"",
            eyecatch:undefined,
            url_type:undefined,
            url:undefined
        }
    )

    const params = useParams()

    const articleID:string = params.id?.toString() || ""

    useEffect(()=>{
            const getData=async()=>{
                setIsLoading(true)
                await client.get({
                    endpoint: 'blogs',
                    queries: {
                        limit: 1,
                        ids: articleID
                    }
                })
                .then((res) => {
                    console.log(res.contents[0])
                    setArticle(res.contents[0])
                    setIsLoading(false)
                });
            }
            getData()
    },[])

    return (
        <div>
            {isLoading ?
                <Loading /> :
            <>
                <div>
                    <div className={style["badge-box"]}>
                        <Badge className={style.badge}>{article.category}</Badge>
                        {article.tags === undefined ? "" :
                            article.tags.map((tag, index)=>
                                <Badge key={index} className={style.badge} variant={"outline"}>{tag}</Badge>
                            )
                        }
                    </div>
                </div>
                <h1 className={style.title}>{article.title===undefined ? "名称未設定" : article.title}</h1>
                <div className={style["eyecatch-box"]}>
                    {article.eyecatch === undefined ? <img src="" className={style.eyecatch}/> :
                        <img src={article.eyecatch.url} className={style.eyecatch} />
                    }
                </div>
                <div className={style.content}>{parse(article.content)}</div>
                {article.url === undefined || article.url_type === undefined ? "" :
                    <>
                        <div className={style["link-box"]}>
                            <h2>{article.url_type}</h2>
                            <a href={article.url}>
                                <Button>
                                    {article.url_type}
                                </Button>
                            </a>
                        </div>
                    </>
                }
            </>
            }
        </div>
    )
}