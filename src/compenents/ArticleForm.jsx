import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Article = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const articleData = {
                ...values,
                image,
            };

            const response = await axios.post('http://localhost:3000/articles', articleData);
            console.log('Article posted:', response.data);
            alert('Article created successfully!');
            resetForm();
            setImage(null);
        } catch (error) {
            console.error('Error posting article:', error);
            alert('Failed to post article.');
        }
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(100, "Title must be at most 100"),
        category: Yup.string()
            .required('Category is required')
            .min(2, 'Category must be at least 2 characters'),
        content: Yup.string()
            .required('Content is required')
            .min(10, 'Content must be at least 10 characters'),
    });

    return (
        <div className="min-h-screen bg-[#0D1B2A] text-[#E0E1DD] flex items-center justify-center p-6">
            <div className="bg-[#1B263B] p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Create New Article</h1>

                <Formik
                    initialValues={{
                        title: '',
                        content: '',
                        category: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, setFieldValue, values }) => (
                        <Form>
                            {/* Title */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <Field
                                    type="text"
                                    name="title"
                                    className={`bg-[#415A77] text-[#E0E1DD] p-2 w-full rounded border ${touched.title && errors.title ? 'border-red-500' : 'border-[#778DA9]'}`}
                                />
                                <ErrorMessage name="title" component="div" className="text-red-400 text-sm mt-1" />
                            </div>

                            {/* Category */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={values.category}
                                    onChange={(e) => setFieldValue('category', e.target.value)}
                                    className={`bg-[#415A77] text-[#E0E1DD] p-2 w-full rounded border ${touched.category && errors.category ? 'border-red-500' : 'border-[#778DA9]'}`}
                                />
                                <ErrorMessage name="category" component="div" className="text-red-400 text-sm mt-1" />
                            </div>

                            {/* Content */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Content</label>
                                <Field
                                    as="textarea"
                                    name="content"
                                    rows="4"
                                    className={`bg-[#415A77] text-[#E0E1DD] p-2 w-full rounded border ${touched.content && errors.content ? 'border-red-500' : 'border-[#778DA9]'}`}
                                />
                                <ErrorMessage name="content" component="div" className="text-red-400 text-sm mt-1" />
                            </div>

                            {/* Image Upload */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="text-[#E0E1DD] file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#778DA9] file:text-white hover:file:bg-[#415A77]"
                                    onChange={handleImageUpload}
                                />
                                {image && (
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="mt-4 w-32 h-32 object-cover rounded border border-[#778DA9]"
                                    />
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-[#778DA9] hover:bg-[#415A77] text-white font-semibold py-2 rounded transition duration-300"
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Article;
