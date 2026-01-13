import TransactionsPage from "./pages/TransactionsPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import {AuthProvider} from "./utils/AuthContext.jsx";
import FlaggedTransactions from "./pages/FlaggedTransactions.jsx";
import PrivateRoutesManager from "./utils/PrivateRoutesManager.jsx";
import PrivateRoutesCustomer from "./utils/PrivateRoutesCustomer.jsx";
import CreateTransaction from "./pages/CreateTransaction.jsx";
import CreateTransactions from "./pages/CreateTransactions.jsx";
import CreateCustomer from "./pages/CreateCustomer.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import PendingAction from "./pages/PendingAction.jsx";
import PrivateRoutesBank from "./utils/PrivateRoutesBank.jsx";
import MerchantList from "./pages/MerchantList.jsx";
import CreateManager from "./pages/CreateManager.jsx";
import CreateMerchant from "./pages/CreateMerchant.jsx";

function App() {

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="createtransaction" element={<CreateTransaction/>} />
                    <Route path="createtransactions" element={<CreateTransactions/>} />
                    <Route element={<PrivateRoutesCustomer />}>
                        <Route path="/transaction-list" element={<TransactionsPage/> } />
                        <Route path="/settings" element={<SettingsPage/>} />
                        <Route path="/pending-action" element={<PendingAction/>} />
                    </Route>
                    <Route element={<PrivateRoutesManager />}>
                        <Route path="/flagged-transactions" element={<FlaggedTransactions/>} />
                        <Route path="/create-customer" element={<CreateCustomer/>} />
                    </Route>
                    <Route element={<PrivateRoutesBank />}>
                        <Route path="/merchant-list" element={<MerchantList/>} />
                        <Route path="/create-manager" element={<CreateManager/>} />
                        <Route path="/create-merchant" element={<CreateMerchant/>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App
