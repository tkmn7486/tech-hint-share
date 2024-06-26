import parse from 'html-react-parser';
import { Loading } from "@/pages/misc/loading"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { RiThumbUpLine } from "react-icons/ri";
import { RiThumbUpFill } from "react-icons/ri";

import style from "./style.module.scss"
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { MdAddLink } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

dayjs.extend(utc);
dayjs.extend(timezone);

type Url = {
    url_title: string,
    url: string
  }

type Post = {
    _id: number,
    _model: string,
    _status: string,
    _title: string,
    _created_at: string | Date,
    _updated_at: string | Date,
    _published_at: string | Date,
    category: string,
    content: string,
    like: number,
    url_list: Url[]
}

export const PostsDetail=()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState<Post>(
        {
            _id: 0,
            _model: "",
            _status: "",
            _title: "",
            _created_at: "",
            _updated_at: "",
            _published_at: "",
            category: "",
            content: "",
            like: 0,
            url_list: []
        }
    )

    const params = useParams()

    console.log("params:", params.id)

    const postID:string | undefined = params.id===undefined ? undefined : params.id
    console.log("postID:", postID)

    useEffect(()=>{
        const getPost=async()=>{
            setIsLoading(true)
            const data = await axios.get(`https://cms-api.nilto.com/v1/contents/${postID}`, { headers: { 'X-NILTO-API-KEY': import.meta.env.VITE_API_KEY}})
            console.log("data:",data.data)
            setPost(data.data)
            setIsLoading(false)
        }

        getPost()
    },[])

    return (
        <div>
            {isLoading ?
                <Loading /> :
            <>
                <div>
                    <div className={style["badge-box"]}>
                        <Badge className={style.badge} variant={"outline"}>{post.category}</Badge>
                    </div>
                </div>
                <div className={style.content}>{parse(post.content)}</div>
                <div className={style["url-list"]}>
                    {post.url_list.length === 0 ? "" :
                        <Card className={style["url-box"]}>
                            <h2>参考リンク</h2>
                                <ul>
                                {post.url_list.map((url, index)=>
                                    <li>
                                        <IoMdCheckboxOutline className={style["list-header"]}/>
                                        <a href={url.url} key={index}>
                                            <label className={style["url-label"]}>{url.url_title}</label><MdAddLink className={style["url-icon"]}/>
                                        </a>
                                    </li>
                                )}
                                </ul>
                        </Card>
                    }
                    <Badge className={style.badge} variant={"outline"}>
                        <RiThumbUpLine className={style["badge-like-icon"]}/>
                        <label>{post.like}</label>
                    </Badge>
                    <div className={style["updated-at"]}>
                        <Label>最終更新日：{dayjs.utc(post._updated_at).tz('Asia/Tokyo').format('YYYY-MM-DD')}</Label>
                    </div>
                </div>
            </>
            }
        </div>
    )
}