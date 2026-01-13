import Navbar from "../components/Navbar.jsx";
import NavCus from "../components/NavCus.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../utils/UseAuth.jsx";
import {getSettings, updateSettings} from "../utils/SettingsActions.js";


function SettingsPage() {
    const settingsForm = useRef(null)
    const [theSettings, setSettings] = useState()
    const [isLoading,setIsLoading] = useState(true)

    const {user} = useAuth()

    useEffect(() => {
        async function fetchSettings() {
            const data = await getSettings(user.$id);
            setSettings(data);
            console.log(data)
            setIsLoading(false);
        }
        fetchSettings();
    }, [user]);

    const handleSave = async () => {
        const daily_limit = parseFloat(settingsForm.current.daily_limit.value) || null
        const weekly_limit = parseFloat(settingsForm.current.weekly_limit.value) || null
        const monthly_limit = parseFloat(settingsForm.current.monthly_limit.value) || null
        const purchase_limit = parseFloat(settingsForm.current.purchase_limit.value) || null
        const block_online_purchases = settingsForm.current.block_online_purchases.checked || null
        const home_state = settingsForm.current.home_state.value || null
        const home_city = settingsForm.current.home_city.value || null
        const block_international_purchases = settingsForm.current.international_purchases.checked || null
        const adult_entertainment = settingsForm.current.adult_entertainment.checked || null
        const gambling = settingsForm.current.gambling.checked || null
        const liquor_stores = settingsForm.current.liquor_stores.checked || null
        const start_time = settingsForm.current.start_time.value || null
        const end_time = settingsForm.current.end_time.value || null

        const settingsInfo = {daily_limit, weekly_limit, monthly_limit, purchase_limit, block_online_purchases, block_international_purchases, home_state, home_city, gambling, adult_entertainment, liquor_stores, start_time, end_time}

        await updateSettings(user.$id, settingsInfo)
    }
    return (
        <>
        {isLoading ? <p>Loading...</p> :<>
            <Navbar className="navbar" />
            <NavCus selected="settings"/>
            <div className='page'>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <h3 >Purchase Control Settings</h3>
                    <button style={{ textAlign: 'center', margin: '10px'}} onClick={handleSave}>Save</button>
                </div>
                <form ref={settingsForm} className='settings-form'>
                    <div className='section-settings'>
                        <div className='settings-header'>
                            <span >Spending Limits</span>
                        </div>

                            <div className='settings-set'>
                                <div className='setting'>
                                    <label>Daily: </label>
                                    <input
                                        type="number"
                                        name="daily_limit"
                                        step="0.01"
                                        defaultValue={theSettings.daily_limit}
                                    />
                                </div>
                                <div className='setting'>
                                    <label>Weekly: </label>
                                    <input
                                        type="number"
                                        name="weekly_limit"
                                        step="0.01"
                                        defaultValue={theSettings.weekly_limit}
                                    />
                                </div>
                                <div className='setting'>
                                    <label>Monthly: </label>
                                    <input
                                        type="number"
                                        name="monthly_limit"
                                        step="0.01"
                                        defaultValue={theSettings.monthly_limit}
                                    />
                                </div>
                                <div className='setting'>
                                    <label>Per Purchase: </label>
                                    <input
                                        type="number"
                                        name="purchase_limit"
                                        step="0.01"
                                        defaultValue={theSettings.purchase_limit}
                                    />
                                </div>
                            </div>

                    </div>
                    <div className='section-settings'>
                        <div className='settings-header'>
                            <span >Location Restrictions</span>
                        </div>

                            <div className='settings-set'>
                                <div className='setting'>
                                    <label>Block Online Purchases: </label>
                                    <input
                                        type="checkbox"
                                        name="block_online_purchases"
                                        defaultChecked={theSettings.block_online_purchases}
                                    />
                                </div>
                                <div className='setting'>
                                    <label>Block International Purchases: </label>
                                    <input
                                        type="checkbox"
                                        name="international_purchases"
                                        defaultChecked={theSettings.block_international_purchases}
                                    />
                                </div>

                                    <div className='setting'>
                                        <label>Block Interstate Purchases: </label>

                                            <div className='sub-setting'>
                                                <label>Home State: </label>
                                                <input
                                                    type="text"
                                                    name="home_state"
                                                    defaultValue={theSettings.home_state}
                                                />
                                            </div>

                                    </div>


                                    <div className='setting'>
                                        <label>Block Intercity Purchases: </label>

                                            <div className='sub-setting'>
                                                <label>Home City: </label>
                                                <input
                                                    type="text"
                                                    name="home_city"
                                                    defaultValue={theSettings.home_city}
                                                />
                                            </div>

                                    </div>

                            </div>

                    </div>
                    <div className='section-settings'>
                        <div className='settings-header'>
                            <span >Category Restrictions</span>
                        </div>

                            <div className='settings-set'>
                                <div className='setting'>
                                    <input
                                        type="checkbox"
                                        name="gambling"
                                        defaultChecked={theSettings.gambling}
                                    />
                                    <label> Gambling</label>
                                </div>
                                <div className='setting'>
                                    <input
                                        type="checkbox"
                                        name="adult_entertainment"
                                        defaultChecked={theSettings.adult_entertainment}
                                    />
                                    <label> Adult Entertainment</label>
                                </div>
                                <div className='setting'>
                                    <input
                                        type="checkbox"
                                        name="liquor_stores"
                                        defaultChecked={theSettings.liquor_stores}
                                    />
                                    <label> Liquor Stores</label>
                                </div>
                            </div>
                    </div>
                    <div className='section-settings'>
                        <div className='settings-header'>
                            <span >Time Restrictions</span>
                        </div>

                            <div className='settings-set'>
                                <div className='setting'>
                                    <label>Start Time: </label>
                                    <input
                                        type='time'
                                        name='start_time'
                                        defaultValue={theSettings.start_time}
                                    />
                                </div>
                                <div className='setting'>
                                    <label>End Time: </label>
                                    <input
                                        type='time'
                                        name='end_time'
                                        defaultValue={theSettings.end_time}
                                    />
                                </div>
                            </div>

                    </div>
                </form>
            </div>
        </>}</>
    )
}

export default SettingsPage;