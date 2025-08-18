"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState("")

    const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                seturl("")
                setshorturl("")
                setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                console.log(result)
                alert(result.message)
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
            <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
            <div className='flex flex-col gap-4'>
                <input type="text"
                    placeholder='Enter your URL'
                    onChange={e => { seturl(e.target.value) }}
                    value={url}
                    className='px-4 py-2 focus:outline-purple-600 bg-white rounded-md' />
                <input type="text"
                    placeholder='Enter your preferred short URL text'
                    onChange={e => { setshorturl(e.target.value) }}
                    value={shorturl}
                    className='px-4 py-2 focus:outline-purple-600 bg-white rounded-md' />
                <button onClick={generate} className='bg-purple-500 text-white rounded-lg shadow-lg p-3 py-1 font-bold my-2'>Generate</button>
            </div>

            {generated && <>
                <span className='font-bold text-lg'>Your Link </span> 
                <code><Link target="_blank" href={generated}>{generated}</Link>
                </code></>}
        </div>
    )
}

export default Shorten
