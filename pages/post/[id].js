import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { API_ROUTES } from "@/utils/apiConfig";
import axios from "axios";
import { useFilteredData } from "@/store/FilteredDataContext";
import useSWR from 'swr';
import Post from './../../components/post/Post';




const index = ({ isFeedbackVisible, handleToggleFeedback, conVersion, postId, rtl, context, params, id }) => {
    const { single } = useFilteredData();
    const [data2, setData] = useState(postId);
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR('../api/staticdata', fetcher);

    // Handle the error state
    if (error) return <div>Failed to load</div>;
    // Handle the loading state
    if (!data) return <div>Loading...</div>;


    let filteredPost = [];
    for (let i= 0; i<data.length; i++) {
        if (data[i].id == postId ) {
            filteredPost = [...filteredPost, data[i]];
        }
    }
    console.log(filteredPost);


    return (
        <div
            onClick={() => {
                isFeedbackVisible ? handleToggleFeedback() : null;
            }}
            style={{
                filter: isFeedbackVisible ? "brightness(0.5)" : " ",
                transition: "all 0.6s ease-in-out",
                height: isFeedbackVisible ? "Calc(100vh - 111px)" : "",
                overflow: isFeedbackVisible ? "hidden" : "",
            }}
        >
            <Post post={filteredPost} rtl={rtl} />
        </div>
    );
};

export async function getServerSideProps(context) {

    const { params, query } = context;
    console.log(query.id);
    try {
        const response = await axios.get(``);
        if (!response.data.returnData) {
            return {
                props: {
                    postId: query.id,
                },
            };
        }
        return {
            props: {
                postId: query.id,
            },
        };
    } catch (error) {
        return {
            props: {
                postId: query.id,
            },
        };
    }
}

// This is needed for dynamic routes in Next.js
export default index;

