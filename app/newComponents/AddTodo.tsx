"use client"
import React from 'react';
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
    return <form className={"flex justify-between gap-4"}
                 onSubmit={formik.handleSubmit}
    >
        <div className={"flex-1"}>
            <input
                className={"w-full border border-blue-300 outline-blue-500 py-2 px-4 rounded-md drop-shadow"}
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
            className={"flex-2 bg-blue-400 py-2 px-4 rounded-md drop-shadow"}
            type={"submit"}>
            Add Task
        </button>
    </form>
}

export default AddTodo;