"use client"
import React, {FormEvent, useState} from 'react';
import {useTodos} from "../store/todos";
import {useFormik} from "formik";
import * as Yup from "yup";


const AddTodo = () => {

    const {handleAddTodo} = useTodos();

    const formik = useFormik({
        initialValues: {
            todo: "",
        },
        validationSchema: Yup.object({
            todo: Yup.string().required("Please add the Task"),

        }),
        onSubmit: (values) => {
            handleAddTodo(values.todo)
            formik.resetForm();
        },
    });
    return <form className={"flex items-start gap-6 mb-2"}
                 onSubmit={formik.handleSubmit}
    >
        <div className={"flex-1"}>
            <input
                className={"w-full border border-[#252525] border-1 outline-1 p-2 " +
                "rounded mb-4 text-[14px] text-slate-700"}
                type={"text"}
                placeholder={"Write Your Task"}
                name={"todo"}
                value={formik.values.todo}
                onChange={formik.handleChange}
            />

            {formik.touched.todo && formik.errors.todo && (
                <div className="text-sm text-red-600">{formik.errors.todo}</div>
            )}
        </div>

        <button
            className={"bg-red-400 text-white rounded p-2 outline-none px-4 text-sm"}
            type={"submit"}>
            Add Task
        </button>
    </form>
}

export default AddTodo;