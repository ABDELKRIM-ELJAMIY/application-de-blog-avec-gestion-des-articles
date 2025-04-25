import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Article = ({ onArticleAdded }) => {
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

            if (onArticleAdded) {
                onArticleAdded(response.data);
            }

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
        <div className="w-full">
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                    category: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors, setFieldValue, values, isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Title</label>
                            <Field
                                type="text"
                                name="title"
                                className={`bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-2 w-full rounded border ${touched.title && errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'}`}
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={values.category}
                                onChange={(e) => setFieldValue('category', e.target.value)}
                                className={`bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-2 w-full rounded border ${touched.category && errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'}`}
                            />
                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Content</label>
                            <Field
                                as="textarea"
                                name="content"
                                rows="4"
                                className={`bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-2 w-full rounded border ${touched.content && errors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'}`}
                            />
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="text-gray-900 dark:text-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800"
                                onChange={handleImageUpload}
                            />
                            {image && (
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="mt-4 w-32 h-32 object-cover rounded border border-gray-300 dark:border-gray-600"
                                />
                            )}
                        </div>

                        <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                            <button
                                type="button"
                                data-modal-hide="article-modal"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Article;