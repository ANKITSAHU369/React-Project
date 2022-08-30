import React, { useEffect, useState } from 'react'
import './style.css'

function Main(props){
    const {view} = props
    const [data, setData] = useState([])
    const [backupData, setBackupData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('')
    const urls = {
        "orders":"https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
        "products":"https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
        "users":"https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users"
    }

    useEffect(()=>{
        getData(urls[view])
    },[view])

    useEffect(()=>{
        let filteredData;
        if(filter){
            if(filter === 'Expired'){
                filteredData = backupData?.filter((i) => new Date(i?.expiryDate).getTime() < new Date().getTime())
            }else if(filter === 'Low Stock'){
                filteredData = backupData?.filter((i) => i?.stock < 100)
            }else{
                filteredData = backupData?.filter((i) => i?.orderStatus === filter)
            }
        }else{
            filteredData = backupData
        }
        setData(filteredData)
    },[filter])

    const getData = (url) => {
        setIsLoading(true)
        fetch(url)
        .then((res) => {return res.json()})
        .then((data)=> {setData(data); setBackupData(data)})
        .catch((error) => console.log(error))
        setIsLoading(false)
    }

    if(isLoading){
        return (
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                Loading...
            </div>
        )
    }

    return(
        <div class="orderouterwrapper">
        <h1 class="container-header">Orders</h1>
        <div class="containerInnerWrapper">
            { ((view === 'orders') || (view === 'products')) ?
            <div class="containerFilterWrapper">
                <h3>Filters</h3>
                <div class="containerFilterOption">
                    <p>Count: <span id="count">{data?.length || 0}</span></p>
                    { (view === 'orders') ?
                    <>
                        <label class="containerFilterCheckbox"><input type="checkbox" id="newCheckBox" name="orders-new"
                                checked={filter === 'New'} onChange={(e) => filter === 'New' ? setFilter('') : setFilter('New')}/>New</label>
                        <label class="containerFilterCheckbox"><input type="checkbox" id="packedCheckBox"
                                name="orders-packed"checked={filter === 'Packed'} onChange={(e) => filter === 'Packed' ? setFilter('') : setFilter('Packed')}/>Packed</label>
                        <label class="containerFilterCheckbox"><input type="checkbox" id="inTransitcheckBox"
                                name="orders-transit" checked={filter === 'InTransit'} onChange={(e) => filter === 'InTransit' ? setFilter('') : setFilter('InTransit')}/>InTransit</label>
                        <label class="containerFilterCheckbox"><input type="checkbox" id="deliveredCheckBox"
                                name="orders-delivered" checked={filter === 'Delivered'} onChange={(e) => filter === 'Delivered' ? setFilter('') : setFilter('Delivered')}/>Delivered</label>
                    </>
                    :
                    ( (view === 'products') ?
                    <>
                        <label class="containerFilterCheckbox"><input type="checkbox" name="orders-new"
                                id="expiredCheckbox" checked={filter === 'Expired'} onChange={(e) => filter === 'Expired' ? setFilter('') : setFilter('Expired')}/>Expired</label>
                        <label class="containerFilterCheckbox"><input type="checkbox" name="orders-packed"
                                id="lowStockCheckbox" checked={filter === 'Low Stock'} onChange={(e) => filter === 'Low Stock' ? setFilter('') : setFilter('Low Stock')}/>Low Stock</label>
                    </>
                    :
                    null
                    )
                    }
                </div>
            </div>
            :
            null
            }
            <div style={{width: '100%'}}>
                <table class="orderTable">
                    <tr>
                    {view === 'orders' ?
                        <>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </>
                        :
                        (
                            view === 'products' ?
                                <>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Product Brand</th>
                                    <th>Expiry Date</th>
                                    <th>Unit Price</th>
                                    <th>Stock</th>
                                </>
                            :
                                <>
                                    <th>ID</th>
                                    <th>User Avatar</th>
                                    <th>Full Name</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Current Location</th>
                                </>
                        )
                    }
                    </tr>
                    <tbody id="tableBody">
                        {
                            data?.map((i)=>{
                                return(
                                    <tr class="table-row">
                                        {view === 'orders' ?
                                            <>
                                                <td class="secondary-text">{i.id}</td>
                                                <td class="primary-text">{i.customerName}</td>
                                                <td class="primary-text">{i.orderDate}<br/><span class="secondary-text">{i.orderTime}</span></td>
                                                <td class="secondary-text">${i.amount}</td>
                                                <td class="primary-text">{i.orderStatus}</td>
                                            </>
                                        :
                                            (
                                                view === 'products' ?
                                                <>
                                                    <td class="secondary-text">{i.id}</td>
                                                    <td class="primary-text">{i.medicineName}</td>
                                                    <td class="secondary-text">{i.medicineBrand}</td>
                                                    <td class="primary-text">{i.expiryDate}</td>
                                                    <td class="secondary-text">${i.unitPrice}</td>
                                                    <td class="secondary-text">{i.stock}</td>
                                                </>
                                                :
                                                <>
                                                    <td class="secondary-text">{i.id}</td>
                                                    <td class="secondary-text"><img src={i.profilePic}/></td>
                                                    <td class="secondary-text">{i.fullName}</td>
                                                    <td class="primary-text">{i.dob}</td>
                                                    <td class="secondary-text">{i.gender}</td>
                                                    <td class="secondary-text">{i.currentCity}, {i.currentCountry}</td>
                                                </>
                                            )
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default Main;