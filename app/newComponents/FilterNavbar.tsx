"use client"

import React from 'react';
import Link from "next/link";
import {useSearchParams} from "next/navigation";

const FilterNavbar = () => {

    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos')


    console.log("nav " + todosFilter)
    return <nav className={"flex justify-between m-6"}>
        <Link href={"/"} className={todosFilter === null ? "active" : ""}>
            All
        </Link>
        <Link href={"/?todos=progress"} className={todosFilter === "progress" ? "active" : ""}>
            Progress
        </Link>
        <Link href={"/?todos=completed"} className={todosFilter === "completed" ? "active" : ""}>
            Completed
        </Link>
    </nav>
};

export default FilterNavbar;