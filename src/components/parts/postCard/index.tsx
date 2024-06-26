import style from "./style.module.scss"

type Post = {
    _id:string,
    category:string,
    content:string,
    created_at:string | Date,
    updated_at:string | Date,
    like:string
}

export const PostCard =(props:Post)=>{
    const {
        _id,
        category,
        content,
        created_at,
        like
    } = props


    return (
        <div key={_id}>
            <small>{JSON.stringify(created_at)}</small>
            <div className={style["main-content"]}>
                <p>{content}</p>
                <small>`#${category}`</small>
            </div>
            <div className={style["card-bottom"]}>
                <p>${like}like</p>
            </div>
        </div>
    )
}