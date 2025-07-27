import React from "react";
import Blog from "./Blog.jsx";
import BlogFooter from "./BlogFooter";
import { Navbar } from "../navbar/resizable-navbar.jsx";

function BlogApp() {
    return (
        <div>
            <Navbar />
            <Blog />
            <BlogFooter />
        </div>
    )
}
export default BlogApp;