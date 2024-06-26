import { Link, To, useLocation } from "react-router-dom"
import style from "./style.module.scss"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostsList } from "@/pages/posts/postsList"



type menu = {
    label:string,
    path: To
}

export const Header = () => {
    const location = useLocation();
    const params = location.pathname;

    console.log("param:", params)

    const siteMenu:menu[] = [
        {label: "Post", path: "/posts?filter=latest"},
        {label: "Note", path: "/notes?filter=latest"},
    ]
    
    return (
        <div className={style.header}>
            <Link to="/">
                <h1 className={style["site-name"]}>Techne.</h1>
            </Link>
            <div className={style["site-menu-container"]}>
            { siteMenu.map( (menu, index) =>
                <div className={params===menu.path ? style["active-site-menu"] : style["site-menu"]} key={index}>
                    <Link to={menu.path}>
                        <Label className={style["menu-link"]}>
                            {menu.label}
                        </Label>
                    </Link>
                    { siteMenu.length-1 !== index &&
                        <div className={style.separator}>|</div>
                    }
                </div>
            )}
            </div>
            <Separator />
        </div>
    )
}