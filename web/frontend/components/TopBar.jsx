import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthenticatedFetch } from '../hooks'

export function TopBar() {
    let [storeName, setStoreName] = useState("")
    let fetch = useAuthenticatedFetch()

    useEffect(() => {
        const fetchStoreInfo = async () => {
            try {
                let response = await fetch("/api/store/info", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })
                let data = await response.json()
                // console.log(data)
                setStoreName(data.data[0].name)
            } catch (error) {
                console.log(error)
            }
        }

        fetchStoreInfo()
    }, [fetch])  // Including fetch as a dependency to avoid missing dependency warning

    return (
        <div className='topbar-section'>
            <div className="logo-block">
                <img className='logo' src="../assets/favicon.ico" alt="logo" />
                <h1>{storeName}</h1>
                <NavLink to={"/"}>Sales</NavLink>
                <NavLink to={"/products"}>About</NavLink>
            </div>
        </div>
    )
}
